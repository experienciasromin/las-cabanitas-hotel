// Archivo de configuración centralizado para todas las imágenes del sitio web.
// Puedes cambiar estas URLs por enlaces de Internet directos (Unsplash, Imgur, tu propio servidor, etc.)
// o usar enlaces de Google Drive / identificadores directos.

export function extractDriveId(urlOrId: string): string {
  if (!urlOrId) return '';
  urlOrId = urlOrId.trim().replace(/^["']|["']$/g, '');
  if (!urlOrId) return '';
  if (/^[a-zA-Z0-9_-]{25,55}$/.test(urlOrId)) {
    return urlOrId;
  }
  const matchD = urlOrId.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD) return matchD[1];
  const matchIdParam = urlOrId.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam) return matchIdParam[1];
  return '';
}

export function formatImageUrl(urlOrId: string): string {
  if (!urlOrId) return '';
  const driveId = extractDriveId(urlOrId);
  if (driveId) {
    // lh3.googleusercontent.com provides fast, direct CDN loading for public Google Drive images
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }
  return urlOrId;
}

export const IMAGES_CONFIG = {
  // Imagen de fondo principal (Hero) de la página de inicio
  heroBg: '1H2yIXOkcD9no1q2UlDPA6rSOW2ZoGrYv',

  // Imagen para la sección de Steakhouse / Restaurante
  steakhouse: '/src/assets/images/steakhouse_plate_1783547977723.jpg',

  // Imagen por defecto para suites/habitaciones de respaldo
  defaultSuite: '1NxaSUIUbNdqykjrK26z4qNGaWklcmPRX',

  // Imágenes por defecto de cada una de las habitaciones
  rooms: {
    '1': '1NxaSUIUbNdqykjrK26z4qNGaWklcmPRX', // Habitación 1: El rincón de El Escondite
    '2': '1mvxTIB0JWz87BIlKtVlu3XMwSiOwlxKn', // Habitación 2: Mirador al bosque vivo
    '3': '1BXyAoz1l3rJCegBv8wal2DnwL2MwJdUG', // Habitación 3: Mirador del Boquerón
    '4': '1WkyXmkkAz4XFqMEWa7WluBE2zQ7avXT2', // Habitación 4: Refugio en el Boquerón
    '5': '1EVtm5QsE2tzmq3_e3dzOmg4IZtMP8MgO', // Habitación 5: Cabaña El Mirador
  } as Record<string, string>
};

// Enlaces a tus redes sociales
export const SOCIAL_CONFIG = {
  facebook: 'https://www.facebook.com/tu_pagina',
  instagram: 'https://www.instagram.com/tu_usuario',
  tripadvisor: 'https://www.tripadvisor.com/',
  youtube: 'https://www.youtube.com/',
};

