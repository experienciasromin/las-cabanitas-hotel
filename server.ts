import express from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { IMAGES_CONFIG } from './src/imagesConfig';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const SPREADSHEET_ID = '1mm9B9cNz8H0euWFEC6siJ0WHADgXy4VTMtjs7_QXJnE';

// Fallback Mock Data in case Google Sheets is private or offline
const DEFAULT_ROOMS = [
  {
    id: '1',
    name: 'El rincón de El Escondite (Habitación 1)',
    maxAdults: 2,
    maxKids: 1,
    image: '/src/assets/images/luxurious_suite_1783547989633.jpg',
    description: '🌿 Escápate a la Montaña y Relájate. Disfruta de una acogedora habitación con baño propio, agua caliente, closet de madera y vista a la montaña.',
    price: 60,
    features: ['Cama Matrimonial', 'Baño Privado', 'Agua Caliente', 'Desayuno Incluido']
  },
  {
    id: '2',
    name: 'Mirador al bosque vivo (Habitación 2)',
    maxAdults: 2,
    maxKids: 1,
    image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=1000',
    description: 'Encantadora cabaña de madera entre montañas verdes. Sus amplios ventanales llenan cada rincón de luz natural y paz.',
    price: 60,
    features: ['Cama Queen Size', 'Terraza de Madera', 'Vista al Bosque', 'Cafetera de Campo']
  },
  {
    id: '3',
    name: 'Mirador del Boquerón (Habitación 3)',
    maxAdults: 2,
    maxKids: 1,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    description: 'Descubre un exclusivo refugio rústico rodeado de naturaleza. Desconecta del mundo con caminatas al aire libre y noches estrelladas.',
    price: 60,
    features: ['Cama King Size', 'Paredes de Tronco', 'Clima de Cumbre', 'Área de Fogata']
  },
  {
    id: '4',
    name: 'Suite Nido de Amor (Habitación 4)',
    maxAdults: 2,
    maxKids: 0,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1000',
    description: 'Diseñada exclusivamente para parejas en escapada romántica. Detalles de madera rústica y luz cálida.',
    price: 80,
    features: ['Cama Confortable', 'Baño de Lujo', 'Vistas Panorámicas', 'Detalle de Bienvenida']
  },
  {
    id: '5',
    name: 'Refugio Familiar (Habitación 5)',
    maxAdults: 4,
    maxKids: 2,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000',
    description: 'Nuestra cabaña más espaciosa. Ideal para familias o grupos que buscan confort rústico en la cumbre.',
    price: 120,
    features: ['2 Camas Grandes', 'Espacio Amplio', 'Balcón Privado', 'Desayuno Campestre']
  }
];

const DEFAULT_EMAILS = ['rrodriguezasesorias@gmail.com'];

// Helper to clean up Google Drive URLs into direct images
function convertDriveUrl(url: string): string {
  if (!url) return '';
  url = url.trim().replace(/^["']|["']$/g, '');
  if (!url) return '';

  // If it is already a direct external web URL, return it directly
  if (url.startsWith('http') && !url.includes('drive.google.com') && !url.includes('googleusercontent.com')) {
    return url;
  }

  // If it's a plain Google Drive ID (usually 25-55 chars, alphanumeric with dashes/underscores)
  if (/^[a-zA-Z0-9_-]{25,55}$/.test(url)) {
    return `https://lh3.googleusercontent.com/d/${url}`;
  }

  const matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const matchIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  let fileId = '';

  if (matchD) {
    fileId = matchD[1];
  } else if (matchIdParam) {
    fileId = matchIdParam[1];
  } else if (url.includes('drive.google.com') && url.split('/').pop()) {
    const lastPart = url.split('/').pop() || '';
    fileId = lastPart.split('?')[0] || '';
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return url;
}

// Populate fallback rooms with our centralized image configuration
DEFAULT_ROOMS.forEach(room => {
  const configImg = IMAGES_CONFIG.rooms[room.id] || IMAGES_CONFIG.defaultSuite;
  room.image = convertDriveUrl(configImg);
});

// Normalizes date formats into YYYY-MM-DD
function normalizeDate(dateStr: string): string | null {
  if (!dateStr) return null;
  dateStr = dateStr.replace(/["']/g, '').trim();
  if (!dateStr) return null;

  // Try parsing YYYY-MM-DD
  let match = dateStr.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (match) {
    const y = match[1];
    const m = match[2].padStart(2, '0');
    const d = match[3].padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // Try parsing DD/MM/YYYY or D/M/YYYY
  match = dateStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (match) {
    const d = match[1].padStart(2, '0');
    const m = match[2].padStart(2, '0');
    const y = match[3];
    return `${y}-${m}-${d}`;
  }

  // Try standard Date
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
  } catch (e) {}

  return null;
}

// Simple and highly robust CSV parser
function parseCSV(csvText: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal);
      currentVal = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentVal);
      lines.push(row);
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || row.length > 0) {
    row.push(currentVal);
    lines.push(row);
  }
  // Trim cell contents
  return lines.map(r => r.map(c => c.trim().replace(/^["']|["']$/g, '')));
}

// Google Sheets fetch helper
async function fetchSheetData(sheetName: string): Promise<string[][] | null> {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) {
      return null;
    }
    const text = await res.text();
    // If we received an HTML sign-in page, it means the spreadsheet is private
    if (text.includes('<!DOCTYPE html>') || text.includes('<html')) {
      return null;
    }
    return parseCSV(text);
  } catch (e) {
    console.error(`Error fetching sheet ${sheetName}:`, e);
    return null;
  }
}

// Helper to look up the dynamic pricing from OCC sheet matching dates and room
async function calculatePriceFromOCC(roomId: string, checkIn: string, checkOut: string): Promise<{ totalPrice: number; nights: number; isFallback: boolean }> {
  const normalizedCheckIn = normalizeDate(checkIn);
  const normalizedCheckOut = normalizeDate(checkOut);

  if (!normalizedCheckIn || !normalizedCheckOut) {
    return { totalPrice: 0, nights: 0, isFallback: true };
  }

  // Generate range of dates to check (excluding check-out day)
  const daysToCheck: string[] = [];
  let current = new Date(normalizedCheckIn + 'T00:00:00');
  const end = new Date(normalizedCheckOut + 'T00:00:00');

  while (current < end) {
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');
    const d = String(current.getDate()).padStart(2, '0');
    daysToCheck.push(`${y}-${m}-${d}`);
    current.setDate(current.getDate() + 1);
  }

  const nights = daysToCheck.length;
  if (nights === 0) {
    return { totalPrice: 0, nights: 0, isFallback: true };
  }

  const bdRows = await fetchSheetData('BD');
  const occRows = await fetchSheetData('OCC');

  // Find base price from DEFAULT_ROOMS as primary fallback
  let basePrice = 150;
  const defaultRoom = DEFAULT_ROOMS.find(r => r.id === String(roomId));
  if (defaultRoom) {
    basePrice = defaultRoom.price;
  }

  let roomRowIdx = -1;

  if (bdRows && bdRows.length > 1) {
    for (let i = 1; i < bdRows.length; i++) {
      if (bdRows[i][0] && bdRows[i][0].trim() === String(roomId)) {
        roomRowIdx = i; // This is the row index in BD sheet (e.g., 1 for BD!A2, 2 for BD!A3)
        // Extract base price from BD!E (Column E, index 4) if available
        if (bdRows[i][4]) {
          const cleanPrice = parseFloat(bdRows[i][4].replace(/[$,]/g, ''));
          if (!isNaN(cleanPrice) && cleanPrice > 0) {
            basePrice = cleanPrice;
          }
        }
        break;
      }
    }
  }

  // If OCC sheets or BD sheets are not loaded, or room row index wasn't matched, use basePrice * nights
  if (!occRows || occRows.length < 2 || roomRowIdx === -1) {
    return { totalPrice: basePrice * nights, nights, isFallback: true };
  }

  // Calculate OCC column index: OCC!P is index 15, corresponding to row 1 (BD!A2)
  const occColIdx = 15 + (roomRowIdx - 1);

  let totalPrice = 0;
  let nightsCalculatedFromOCC = 0;

  for (const dateStr of daysToCheck) {
    let priceForNight = -1;

    // Search for row in OCC matching this date
    for (let r = 1; r < occRows.length; r++) {
      const rowDateNorm = normalizeDate(occRows[r][0]);
      if (rowDateNorm === dateStr) {
        // We found the date row! Read the price from cell
        const cellVal = occRows[r][occColIdx];
        if (cellVal) {
          const parsed = parseFloat(cellVal.replace(/[$,]/g, ''));
          if (!isNaN(parsed) && parsed > 0) {
            priceForNight = parsed;
          }
        }
        break;
      }
    }

    if (priceForNight > 0) {
      totalPrice += priceForNight;
      nightsCalculatedFromOCC++;
    } else {
      // Fallback for this specific night
      totalPrice += basePrice;
    }
  }

  return { 
    totalPrice, 
    nights, 
    isFallback: nightsCalculatedFromOCC === 0 
  };
}

// Route to get rooms and settings
app.get('/api/rooms', async (req, res) => {
  const bdRows = await fetchSheetData('BD');
  
  // Generate default imagesMap from centralized configuration
  const defaultImagesMap: Record<string, string> = {
    'Hero': convertDriveUrl(IMAGES_CONFIG.heroBg),
    'Steakhouse': convertDriveUrl(IMAGES_CONFIG.steakhouse),
    'DefaultSuite': convertDriveUrl(IMAGES_CONFIG.defaultSuite),
  };
  Object.keys(IMAGES_CONFIG.rooms).forEach(key => {
    defaultImagesMap[key] = convertDriveUrl(IMAGES_CONFIG.rooms[key]);
  });

  if (!bdRows || bdRows.length < 2) {
    return res.json({
      rooms: DEFAULT_ROOMS,
      imagesMap: defaultImagesMap,
      usingFallback: true,
      message: 'Mostrando datos de respaldo. Para conectar tu planilla real, compártela en Google Drive para "Cualquier persona con el enlace".'
    });
  }

  try {
    const parsedRooms: any[] = [];
    const emails: string[] = [];
    const imagesMap: { [key: string]: string } = { ...defaultImagesMap };

    // First scan row-by-row
    bdRows.forEach((row, idx) => {
      if (idx === 0) return; // Skip header

      // Extract emails from BD!H (Column H, index 7)
      if (row[7] && row[7].includes('@')) {
        const emailsInRow = row[7].split(',').map(e => e.trim()).filter(e => e.includes('@'));
        emailsInRow.forEach(email => {
          if (!emails.includes(email)) emails.push(email);
        });
      }

      // Extract images from BD!K:L (Column K = 10, L = 11)
      if (row[10] && row[11]) {
        const driveUrl = row[10].trim();
        const webLocation = row[11].trim(); // section name or room id e.g. "Hero", "1", "2"
        if (driveUrl && webLocation) {
          imagesMap[webLocation] = convertDriveUrl(driveUrl);
        }
      }

      // Extract Rooms from BD!A:E (A = 0, B = 1, C = 2, D = 3, E = 4)
      if (row[0] && row[1]) {
        const roomId = row[0].trim();
        const roomName = row[1].trim();
        const maxAdults = parseInt(row[2]) || 2;
        const maxKids = parseInt(row[3]) || 0;

        // Skip non-numeric or dummy Room IDs
        if (roomId && !isNaN(parseInt(roomId))) {
          // Find standard default matching features & descriptions
          const defaultRoom = DEFAULT_ROOMS.find(r => r.id === roomId) || DEFAULT_ROOMS[0];
          
          let price = defaultRoom.price;
          if (row[4]) {
            const cleanPrice = parseFloat(row[4].replace(/[$,]/g, ''));
            if (!isNaN(cleanPrice) && cleanPrice > 0) {
              price = cleanPrice;
            }
          }

          parsedRooms.push({
            id: roomId,
            name: roomName,
            maxAdults,
            maxKids,
            image: defaultRoom.image, // fallback image, we will override with sheets image below
            description: defaultRoom.description,
            price,
            features: defaultRoom.features
          });
        }
      }
    });

    // Override images if found in spreadsheet BD!K:L
    parsedRooms.forEach(room => {
      if (imagesMap[room.id]) {
        room.image = imagesMap[room.id];
      }
    });

    // Ensure we have at least some rooms
    const finalRooms = parsedRooms.length > 0 ? parsedRooms : DEFAULT_ROOMS;

    res.json({
      rooms: finalRooms,
      emails: emails.length > 0 ? emails : DEFAULT_EMAILS,
      imagesMap,
      usingFallback: false
    });
  } catch (error) {
    console.error('Error parsing BD sheet:', error);
    res.json({
      rooms: DEFAULT_ROOMS,
      usingFallback: true,
      error: 'Error al procesar planilla. Mostrando datos de respaldo.'
    });
  }
});

// Proxy to fetch Google Drive images server-side
app.get('/api/image-proxy', async (req, res) => {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).send('Falta el ID de imagen');
  }

  try {
    const urlsToTry = [
      `https://lh3.googleusercontent.com/d/${id}`,
      `https://docs.google.com/uc?export=download&id=${id}`,
      `https://drive.google.com/uc?export=view&id=${id}`
    ];

    let response: any = null;
    for (const url of urlsToTry) {
      try {
        const temp = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
          }
        });
        if (temp.ok) {
          const contentType = temp.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            response = temp;
            break;
          }
        }
      } catch (err) {
        console.error(`Error attempting fetch from ${url}:`, err);
      }
    }

    if (response) {
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); // Cache for 7 days
      
      const arrayBuffer = await response.arrayBuffer();
      return res.send(Buffer.from(arrayBuffer));
    }

    // Fallback: Redirect to Google Drive directly if proxying fails
    res.redirect(`https://lh3.googleusercontent.com/d/${id}`);
  } catch (error) {
    console.error('Error in image proxy:', error);
    res.status(500).send('Error al procesar la imagen');
  }
});

// Route to check availability for a date range
app.post('/api/check-availability', async (req, res) => {
  const { checkIn, checkOut, roomId } = req.body || {};
  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: 'Faltan fechas de checkIn y checkOut.' });
  }

  const normalizedCheckIn = normalizeDate(checkIn as string);
  const normalizedCheckOut = normalizeDate(checkOut as string);

  if (!normalizedCheckIn || !normalizedCheckOut) {
    return res.status(400).json({ error: 'Fechas con formato inválido.' });
  }

  // Generate range of dates to check (excluding check-out day)
  const daysToCheck: string[] = [];
  let current = new Date(normalizedCheckIn + 'T00:00:00');
  const end = new Date(normalizedCheckOut + 'T00:00:00');

  while (current < end) {
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');
    const d = String(current.getDate()).padStart(2, '0');
    daysToCheck.push(`${y}-${m}-${d}`);
    current.setDate(current.getDate() + 1);
  }

  const nights = Math.max(1, daysToCheck.length);
  const targetRoomId = String(roomId || '1');

  try {
    const occRows = await fetchSheetData('OCC');
    const bdRows = await fetchSheetData('BD');

    const roomMapping: string[] = [];
    if (bdRows && bdRows.length > 1) {
      for (let i = 1; i <= 5; i++) {
        if (bdRows[i] && bdRows[i][0]) {
          roomMapping.push(bdRows[i][0].trim());
        } else {
          roomMapping.push(String(i));
        }
      }
    } else {
      roomMapping.push('1', '2', '3', '4', '5');
    }

    const occupiedSetByRoom = new Set<string>();

    if (occRows && occRows.length > 1) {
      occRows.forEach((row, idx) => {
        if (idx === 0) return;
        const rowDateNorm = normalizeDate(row[0]);
        if (!rowDateNorm) return;

        if (daysToCheck.includes(rowDateNorm)) {
          for (let colIdx = 1; colIdx <= 5; colIdx++) {
            const cellVal = (row[colIdx] || '').trim().toLowerCase();
            const rId = roomMapping[colIdx - 1];

            if (
              cellVal &&
              cellVal !== '0' &&
              cellVal !== 'disponible' &&
              cellVal !== 'si' &&
              cellVal !== 'yes' &&
              cellVal !== 'free' &&
              cellVal !== 'vacío' &&
              cellVal !== 'vacio'
            ) {
              occupiedSetByRoom.add(rId);
            }
          }
        }
      });
    }

    const availableRoomIds = roomMapping.filter(id => !occupiedSetByRoom.has(id));
    const isAvailable = availableRoomIds.includes(targetRoomId);

    // Calculate dynamic price
    const priceResult = await calculatePriceFromOCC(targetRoomId, checkIn as string, checkOut as string);
    const totalPrice = priceResult.totalPrice;

    // Get room details
    const defaultRef = DEFAULT_ROOMS.find(r => r.id === targetRoomId) || DEFAULT_ROOMS[0];
    let roomObj: any = { ...defaultRef };
    if (bdRows && bdRows.length > 1) {
      for (let i = 1; i < bdRows.length; i++) {
        if (bdRows[i][0] && bdRows[i][0].trim() === targetRoomId) {
          let cleanPrice = defaultRef.price;
          if (bdRows[i][4]) {
            const p = parseFloat(bdRows[i][4].replace(/[$,]/g, ''));
            if (!isNaN(p) && p > 0) cleanPrice = p;
          }
          roomObj = {
            id: targetRoomId,
            name: bdRows[i][1] ? bdRows[i][1].trim() : defaultRef.name,
            maxAdults: parseInt(bdRows[i][2]) || defaultRef.maxAdults,
            maxKids: parseInt(bdRows[i][3]) || defaultRef.maxKids,
            image: defaultRef.image,
            description: defaultRef.description,
            price: cleanPrice,
            features: defaultRef.features
          };
          break;
        }
      }
    }

    return res.json({
      isAvailable,
      nights: priceResult.nights || nights,
      totalPrice,
      room: roomObj,
      availableRoomIds: availableRoomIds.length > 0 ? availableRoomIds : ['1', '2', '3', '4', '5'],
      usingFallback: !occRows || occRows.length < 2,
      message: isAvailable
        ? 'Cabaña disponible'
        : 'La cabaña seleccionada no está disponible en este rango de fechas. Por favor elige otra o modifica tus fechas.'
    });
  } catch (error) {
    console.error('Error in check-availability endpoint:', error);
    const defaultRef = DEFAULT_ROOMS.find(r => r.id === targetRoomId) || DEFAULT_ROOMS[0];
    const totalPrice = defaultRef.price * nights;

    return res.json({
      isAvailable: true,
      nights,
      totalPrice,
      room: defaultRef,
      availableRoomIds: ['1', '2', '3', '4', '5'],
      usingFallback: true,
      message: 'Cabaña disponible'
    });
  }
});

// Route to check availability for a date range (GET alias)
app.get('/api/availability', async (req, res) => {
  const { checkIn, checkOut } = req.query;
  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: 'Faltan fechas de checkIn y checkOut.' });
  }

  const normalizedCheckIn = normalizeDate(checkIn as string);
  const normalizedCheckOut = normalizeDate(checkOut as string);

  if (!normalizedCheckIn || !normalizedCheckOut) {
    return res.status(400).json({ error: 'Fechas con formato inválido.' });
  }

  // Generate range of dates to check (excluding check-out day)
  const daysToCheck: string[] = [];
  let current = new Date(normalizedCheckIn + 'T00:00:00');
  const end = new Date(normalizedCheckOut + 'T00:00:00');

  while (current < end) {
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');
    const d = String(current.getDate()).padStart(2, '0');
    daysToCheck.push(`${y}-${m}-${d}`);
    current.setDate(current.getDate() + 1);
  }

  const occRows = await fetchSheetData('OCC');
  const bdRows = await fetchSheetData('BD');

  // Fallback behavior if sheets are unreachable
  if (!occRows || occRows.length < 2) {
    const fallbackPrices: { [key: string]: number } = {};
    const days = Math.max(1, Math.ceil((new Date(normalizedCheckOut + 'T00:00:00').getTime() - new Date(normalizedCheckIn + 'T00:00:00').getTime()) / (1000 * 3600 * 24)));
    DEFAULT_ROOMS.forEach(r => {
      fallbackPrices[r.id] = r.price * days;
    });

    return res.json({
      availableRooms: ['1', '2', '3', '4', '5'], // All available in fallback
      prices: fallbackPrices,
      usingFallback: true,
      message: 'Planilla offline o privada. Mostrando todas las cabañas disponibles.'
    });
  }

  try {
    // Read room names to map positions in OCC columns
    // OCC!A = FECHA
    // OCC!B = BD!A2 (index 1)
    // OCC!C = BD!A3 (index 2)
    // OCC!D = BD!A4 (index 3)
    // OCC!E = BD!A5 (index 4)
    // OCC!F = BD!A6 (index 5)

    // Let's gather the Room IDs matching rows A2, A3, A4, A5, A6 from BD
    const roomMapping: string[] = [];
    if (bdRows && bdRows.length > 1) {
      // row 1 is BD!A2, row 2 is BD!A3...
      for (let i = 1; i <= 5; i++) {
        if (bdRows[i] && bdRows[i][0]) {
          roomMapping.push(bdRows[i][0].trim());
        } else {
          roomMapping.push(String(i)); // default
        }
      }
    } else {
      roomMapping.push('1', '2', '3', '4', '5');
    }

    // Initialize occupied count map for selected days
    const occupiedSetByRoom = new Set<string>();

    occRows.forEach((row, idx) => {
      if (idx === 0) return; // Skip headers
      const rowDateNorm = normalizeDate(row[0]);
      if (!rowDateNorm) return;

      // If this row date falls in our booking dates
      if (daysToCheck.includes(rowDateNorm)) {
        // Check column B (roomMapping[0]), C (roomMapping[1]), D (roomMapping[2]), E (roomMapping[3]), F (roomMapping[4])
        for (let colIdx = 1; colIdx <= 5; colIdx++) {
          const cellVal = (row[colIdx] || '').trim().toLowerCase();
          const roomId = roomMapping[colIdx - 1];

          // If the cell has an occupancy indicator (not empty, and not standard free indicators)
          if (cellVal && 
              cellVal !== '0' && 
              cellVal !== 'disponible' && 
              cellVal !== 'si' && 
              cellVal !== 'yes' && 
              cellVal !== 'free' && 
              cellVal !== 'vacío' && 
              cellVal !== 'vacio') {
            occupiedSetByRoom.add(roomId);
          }
        }
      }
    });

    const availableRooms = roomMapping.filter(id => !occupiedSetByRoom.has(id));

    // Calculate dynamic prices for all rooms
    const prices: { [key: string]: number } = {};
    for (const id of roomMapping) {
      const priceRes = await calculatePriceFromOCC(id, checkIn as string, checkOut as string);
      prices[id] = priceRes.totalPrice;
    }

    res.json({
      availableRooms,
      prices,
      usingFallback: false
    });
  } catch (error) {
    console.error('Error calculating availability:', error);
    const fallbackPrices: { [key: string]: number } = {};
    const days = Math.max(1, Math.ceil((new Date(normalizedCheckOut + 'T00:00:00').getTime() - new Date(normalizedCheckIn + 'T00:00:00').getTime()) / (1000 * 3600 * 24)));
    DEFAULT_ROOMS.forEach(r => {
      fallbackPrices[r.id] = r.price * days;
    });

    res.json({
      availableRooms: ['1', '2', '3', '4', '5'],
      prices: fallbackPrices,
      usingFallback: true,
      error: 'Error de cálculo. Simulando disponibilidad completa.'
    });
  }
});

// Route to submit reservation and notify via email
app.post('/api/reserve', async (req, res) => {
  const {
    checkIn,
    checkOut,
    roomId,
    adults,
    kids,
    customerName,
    customerEmail,
    customerPhone,
    customerComments
  } = req.body;

  if (!checkIn || !checkOut || !roomId || !customerName || !customerEmail) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para procesar la reserva.' });
  }

  // Look up price dynamically from OCC sheet
  const priceResult = await calculatePriceFromOCC(roomId, checkIn, checkOut);
  const totalPrice = priceResult.totalPrice;

  // Fetch recipients from Sheet or fallback
  const bdRows = await fetchSheetData('BD');
  let emailRecipients = [...DEFAULT_EMAILS];
  let targetRoomName = `Cabaña ${roomId}`;

  if (bdRows && bdRows.length > 1) {
    const fetchedEmails: string[] = [];
    bdRows.forEach((row, idx) => {
      if (idx === 0) return;

      // Grab room name matching RoomId
      if (row[0] && row[0].trim() === String(roomId)) {
        targetRoomName = row[1] ? row[1].trim() : `Cabaña ${roomId}`;
      }

      // Grab emails
      if (row[7] && row[7].includes('@')) {
        const rowEmails = row[7].split(',').map(e => e.trim()).filter(e => e.includes('@'));
        rowEmails.forEach(email => {
          if (!fetchedEmails.includes(email)) fetchedEmails.push(email);
        });
      }
    });
    if (fetchedEmails.length > 0) {
      emailRecipients = fetchedEmails;
    }
  } else {
    const defaultRoom = DEFAULT_ROOMS.find(r => r.id === String(roomId));
    if (defaultRoom) {
      targetRoomName = defaultRoom.name;
    }
  }

  // Create email HTML body
  const emailHtml = `
    <div style="font-family: 'Georgia', serif; color: #121212; background-color: #faf9f5; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #C5A059; border-radius: 4px;">
      <div style="text-align: center; border-bottom: 2px solid #C5A059; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #C5A059; margin: 0; font-weight: normal; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Las Cabañitas de El Escondite</h1>
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #A0A0A0; margin: 5px 0 0 0;">Nueva Solicitud de Reserva Registrada</p>
      </div>

      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Estimado administrador,</p>
      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Se ha registrado una nueva solicitud de reserva en el sitio web con el siguiente detalle:</p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0; width: 40%;">Cabaña</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: bold; color: #121212;">${targetRoomName} (Habitación #${roomId})</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Check In</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: bold; color: #C5A059;">${checkIn}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Check Out</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: bold; color: #C5A059;">${checkOut}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Adultos</td>
          <td style="padding: 10px 0; font-size: 14px;">${adults}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Niños</td>
          <td style="padding: 10px 0; font-size: 14px;">${kids}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Tarifa Calculada</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: bold; color: #2E7D32;">$${totalPrice} USD</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Cliente</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: bold;">${customerName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Correo</td>
          <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${customerEmail}" style="color: #C5A059; text-decoration: none;">${customerEmail}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Teléfono</td>
          <td style="padding: 10px 0; font-size: 14px;">${customerPhone || 'No especificado'}</td>
        </tr>
        ${customerComments ? `
        <tr>
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0; vertical-align: top;">Comentarios</td>
          <td style="padding: 10px 0; font-size: 13px; line-height: 1.5; font-style: italic;">${customerComments}</td>
        </tr>` : ''}
      </table>

      <div style="border-top: 1px solid #C5A059; padding-top: 20px; font-size: 11px; text-align: center; color: #A0A0A0;">
        Este es un correo automático generado desde la Landing Page oficial de <strong>Las Cabañitas de El Escondite</strong>.
      </div>
    </div>
  `;

  const emailText = `
    NUEVA RESERVA - LAS CABAÑITAS DE EL ESCONDITE
    =============================================
    Cabaña: ${targetRoomName} (Habitación #${roomId})
    Check In: ${checkIn}
    Check Out: ${checkOut}
    Adultos: ${adults}
    Niños: ${kids}
    Tarifa: $${totalPrice} USD
    
    Cliente: ${customerName}
    Correo: ${customerEmail}
    Teléfono: ${customerPhone || 'No especificado'}
    Comentarios: ${customerComments || 'Ninguno'}
  `;

  // Send actual email if SMTP credentials exist in .env, otherwise simulate
  let emailSent = false;
  let errorMsg = '';

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"Las Cabañitas de El Escondite" <${process.env.SMTP_USER}>`,
        to: emailRecipients.join(', '),
        subject: `🔔 Nueva Reserva: ${targetRoomName} - ${customerName}`,
        text: emailText,
        html: emailHtml
      });
      emailSent = true;
    } catch (e: any) {
      console.error('Error sending real email via SMTP:', e);
      errorMsg = e.message || 'Error SMTP';
    }
  }

  // Write to Google Sheet Webhook if available (DET)
  let sheetSaved = false;
  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reserve',
          roomId,
          adults,
          kids,
          price: totalPrice,
          checkIn,
          checkOut,
          customerName,
          customerEmail,
          customerPhone,
          customerComments
        })
      });
      if (response.ok) {
        sheetSaved = true;
      }
    } catch (e) {
      console.error('Error writing reservation to Google Script:', e);
    }
  }

  // Backup write locally to a JSON file
  const localReservationsFile = path.join(process.cwd(), 'reservations_db.json');
  let localReservations: any[] = [];
  try {
    if (fs.existsSync(localReservationsFile)) {
      localReservations = JSON.parse(fs.readFileSync(localReservationsFile, 'utf-8'));
    }
  } catch (e) {}

  localReservations.push({
    roomId,
    adults,
    kids,
    price: totalPrice,
    checkIn,
    checkOut,
    customerName,
    customerEmail,
    customerPhone,
    customerComments,
    timestamp: new Date().toISOString()
  });

  try {
    fs.writeFileSync(localReservationsFile, JSON.stringify(localReservations, null, 2));
  } catch (e) {}

  // Always log for transparency and preview inspection
  console.log('====== RESERVATION NOTIFICATION EMAIL ======');
  console.log('TO:', emailRecipients.join(', '));
  console.log('SUBJECT:', `🔔 Nueva Reserva: ${targetRoomName} - ${customerName}`);
  console.log('CONTENT:', emailText);
  console.log('SAVED TO SHEETS (DET):', sheetSaved ? 'YES' : 'NO');
  console.log('============================================');

  res.json({
    success: true,
    totalPrice: totalPrice,
    recipients: emailRecipients,
    emailSentReal: emailSent,
    sheetSaved,
    errorMsg: errorMsg,
    mockedEmailContent: {
      to: emailRecipients,
      subject: `🔔 Nueva Reserva: ${targetRoomName} - ${customerName}`,
      html: emailHtml
    }
  });
});

// Route to submit contact queries and write to MSJ sheet
app.post('/api/contact', async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para procesar la consulta.' });
  }

  // Fetch recipients from Sheet or fallback
  const bdRows = await fetchSheetData('BD');
  let emailRecipients = [...DEFAULT_EMAILS];

  if (bdRows && bdRows.length > 1) {
    const fetchedEmails: string[] = [];
    bdRows.forEach((row, idx) => {
      if (idx === 0) return;
      if (row[7] && row[7].includes('@')) {
        const rowEmails = row[7].split(',').map(e => e.trim()).filter(e => e.includes('@'));
        rowEmails.forEach(email => {
          if (!fetchedEmails.includes(email)) fetchedEmails.push(email);
        });
      }
    });
    if (fetchedEmails.length > 0) {
      emailRecipients = fetchedEmails;
    }
  }

  // Create email HTML body
  const emailHtml = `
    <div style="font-family: 'Georgia', serif; color: #121212; background-color: #faf9f5; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #C5A059; border-radius: 4px;">
      <div style="text-align: center; border-bottom: 2px solid #C5A059; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #C5A059; margin: 0; font-weight: normal; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Las Cabañitas de El Escondite</h1>
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #A0A0A0; margin: 5px 0 0 0;">Nueva Consulta de Contacto</p>
      </div>

      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Estimado administrador,</p>
      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Se ha recibido una nueva consulta desde el formulario de contacto del sitio web:</p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0; width: 40%;">Nombre Completo</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: bold; color: #121212;">${fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Correo</td>
          <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #C5A059; text-decoration: none;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Teléfono</td>
          <td style="padding: 10px 0; font-size: 14px;">${phone}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1ede1;">
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0;">Asunto</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: bold;">${subject}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; color: #A0A0A0; vertical-align: top;">Mensaje</td>
          <td style="padding: 10px 0; font-size: 13px; line-height: 1.5; font-style: italic;">${message}</td>
        </tr>
      </table>

      <div style="border-top: 1px solid #C5A059; padding-top: 20px; font-size: 11px; text-align: center; color: #A0A0A0;">
        Este es un correo automático generado desde la Landing Page oficial de <strong>Las Cabañitas de El Escondite</strong>.
      </div>
    </div>
  `;

  const emailText = `
    NUEVA CONSULTA - LAS CABAÑITAS DE EL ESCONDITE
    =============================================
    Nombre: ${fullName}
    Correo: ${email}
    Teléfono: ${phone}
    Asunto: ${subject}
    Mensaje: ${message}
  `;

  // Send SMTP email if configured
  let emailSent = false;
  let errorMsg = '';

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"Las Cabañitas de El Escondite" <${process.env.SMTP_USER}>`,
        to: emailRecipients.join(', '),
        subject: `✉️ Nueva Consulta de Contacto: ${fullName}`,
        text: emailText,
        html: emailHtml
      });
      emailSent = true;
    } catch (e: any) {
      console.error('Error sending contact email via SMTP:', e);
      errorMsg = e.message || 'Error SMTP';
    }
  }

  // Write to Google Sheet Webhook if available (MSJ)
  let sheetSaved = false;
  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'contact',
          fullName,
          email,
          phone,
          subject,
          message
        })
      });
      if (response.ok) {
        sheetSaved = true;
      }
    } catch (e) {
      console.error('Error writing contact query to Google Script:', e);
    }
  }

  // Local JSON write
  const localMessagesFile = path.join(process.cwd(), 'messages_db.json');
  let localMessages: any[] = [];
  try {
    if (fs.existsSync(localMessagesFile)) {
      localMessages = JSON.parse(fs.readFileSync(localMessagesFile, 'utf-8'));
    }
  } catch (e) {}

  localMessages.push({
    fullName,
    email,
    phone,
    subject,
    message,
    timestamp: new Date().toISOString()
  });

  try {
    fs.writeFileSync(localMessagesFile, JSON.stringify(localMessages, null, 2));
  } catch (e) {}

  console.log('====== CONTACT INQUIRY EMAIL ======');
  console.log('TO:', emailRecipients.join(', '));
  console.log('SUBJECT:', `✉️ Nueva Consulta de Contacto: ${fullName}`);
  console.log('CONTENT:', emailText);
  console.log('SAVED TO SHEETS (MSJ):', sheetSaved ? 'YES' : 'NO');
  console.log('===================================');

  res.json({
    success: true,
    recipients: emailRecipients,
    emailSentReal: emailSent,
    sheetSaved,
    errorMsg,
    mockedEmailContent: {
      to: emailRecipients,
      subject: `✉️ Nueva Consulta de Contacto: ${fullName}`,
      html: emailHtml
    }
  });
});

// Serve frontend assets & mount Vite middleware in development
async function startViteAndListen() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Only start listening if not running in a serverless environment (like Vercel)
  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  }
}

if (!process.env.VERCEL) {
  startViteAndListen();
}

export default app;
