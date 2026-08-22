/**
 * GOOGLE APPS SCRIPT PARA LA PLANILLA DE RESERVAS Y CONSULTAS
 * 
 * Instrucciones de instalación:
 * 1. En tu Google Sheet, ve a: Extensiones > Apps Script.
 * 2. Borra cualquier código existente en el archivo "Código.gs".
 * 3. Copia todo este código y pégalo allí.
 * 4. Guarda el proyecto (clic en el ícono del disquete).
 * 5. Haz clic en "Implementar" (Deploy) > "Nueva implementación" (New deployment).
 * 6. Selecciona tipo "Aplicación web" (Web app).
 * 7. En "Quién tiene acceso" (Who has access), selecciona "Cualquiera" (Anyone) - esto es crucial para que la web envíe datos.
 * 8. Haz clic en "Implementar" y autoriza los permisos si te lo solicita.
 * 9. Copia la URL de la aplicación web que te entregue Google Apps Script y colócala en tu variable de entorno GOOGLE_SCRIPT_URL en el archivo .env.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.action === "reserve") {
      var sheet = ss.getSheetByName("DET");
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: "La pestaña 'DET' no existe" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // Buscar la última celda utilizada específicamente en la columna A
      var lastRowA = getLastRowInColumn(sheet, "A");
      var nextRow = Math.max(lastRowA + 1, 2); // Si está vacío, inicia en la fila 2 (debajo del encabezado)
      
      // Registrar la información de la reserva
      sheet.getRange(nextRow, 1).setValue(new Date()); // Columna A: Fecha Registro (Timestamp)
      sheet.getRange(nextRow, 2).setValue(data.roomId); // Columna B: ID Cabaña
      sheet.getRange(nextRow, 3).setValue(data.checkIn); // Columna C: Fecha Entrada
      sheet.getRange(nextRow, 4).setValue(data.checkOut); // Columna D: Fecha Salida
      sheet.getRange(nextRow, 5).setValue(data.adults); // Columna E: Adultos
      sheet.getRange(nextRow, 6).setValue(data.kids); // Columna F: Niños
      sheet.getRange(nextRow, 7).setValue(data.price); // Columna G: Precio Total ($ USD)
      sheet.getRange(nextRow, 8).setValue(data.customerName || ""); // Columna H: Nombre del Solicitante
      sheet.getRange(nextRow, 9).setValue(data.customerEmail || ""); // Columna I: Correo Electrónico
      sheet.getRange(nextRow, 10).setValue(data.customerPhone || ""); // Columna J: Teléfono de Contacto
      sheet.getRange(nextRow, 11).setValue(data.customerComments || ""); // Columna K: Comentarios / Peticiones Especiales
      
      return ContentService.createTextOutput(JSON.stringify({ success: true, action: "reserve", row: nextRow }))
        .setMimeType(ContentService.MimeType.JSON);
    } 
    
    else if (data.action === "contact") {
      var sheet = ss.getSheetByName("MSJ");
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: "La pestaña 'MSJ' no existe" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // Buscar la última celda utilizada específicamente en la columna A
      var lastRowA = getLastRowInColumn(sheet, "A");
      var nextRow = Math.max(lastRowA + 1, 2); // Si está vacío, inicia en la fila 2 (debajo del encabezado)
      
      // Registrar la consulta de contacto
      sheet.getRange(nextRow, 1).setValue(new Date()); // Columna A: Fecha Registro (Timestamp)
      sheet.getRange(nextRow, 2).setValue(data.fullName || ""); // Columna B: Nombre Completo
      sheet.getRange(nextRow, 3).setValue(data.email || ""); // Columna C: Correo Electrónico
      sheet.getRange(nextRow, 4).setValue(data.phone || ""); // Columna D: Teléfono
      sheet.getRange(nextRow, 5).setValue(data.subject || ""); // Columna E: Asunto
      sheet.getRange(nextRow, 6).setValue(data.message || ""); // Columna F: Mensaje
      
      return ContentService.createTextOutput(JSON.stringify({ success: true, action: "contact", row: nextRow }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Acción no reconocida" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función auxiliar para obtener de forma eficiente la última fila utilizada
 * en una columna específica, ignorando celdas con fórmulas vacías o formatos.
 */
function getLastRowInColumn(sheet, columnLetter) {
  var lastRow = sheet.getLastRow();
  if (lastRow === 0) return 0;
  
  // Obtenemos solo el rango que tiene algún dato en toda la hoja para ahorrar recursos
  var range = sheet.getRange(columnLetter + "1:" + columnLetter + lastRow);
  var values = range.getValues();
  
  // Recorremos de abajo hacia arriba buscando la primera celda no vacía
  for (var i = values.length - 1; i >= 0; i--) {
    var val = values[i][0];
    if (val !== "" && val !== null && val !== undefined) {
      return i + 1; // Retorna la fila real (1-based)
    }
  }
  return 0;
}
