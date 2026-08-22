// Archivo de configuración centralizado para todas las imágenes del sitio web.
// Puedes cambiar estas URLs por enlaces de Internet directos (Unsplash, Imgur, tu propio servidor, etc.)
// o usar identificadores de imagen directos.

export const IMAGES_CONFIG = {
  // Imagen de fondo principal (Hero) de la página de inicio
  heroBg: '1C4Vc7JNb4-hUrIVVCDEvWoMLvLtw-5rt', // ID de la imagen o URL directa

  // Imagen para la sección de Steakhouse / Restaurante
  steakhouse: '/src/assets/images/steakhouse_plate_1783547977723.jpg',

  // Imagen por defecto para suites/habitaciones de respaldo
  defaultSuite: '/src/assets/images/luxurious_suite_1783547989633.jpg',

  // Imágenes por defecto de cada una de las habitaciones (se usarán si no están especificadas dinámicamente)
  rooms: {
    '1': '1vvP-2YplPbJo_fsVr78hSX-aMZyby_vO', // ID de la habitación o URL directa
    '2': '1YyhMYaYeNv5wPhRHuofRpGt3s2zt2Uj4', // Habitación 2
    '3': '1eVR76OIiBt00fMoXvVnpQye0tfB4jz4K', // Habitación 3
    '4': '1KZG-0UgywJs5Dd-X7oVNvEiSsb6DBUFl', // Habitación 4
    '5': '1Sx0NSHOmSyg-ot6BpPEoOB1UWU8aShz6', // Habitación 5
  } as Record<string, string>
};

// Enlaces a tus redes sociales
export const SOCIAL_CONFIG = {
  facebook: 'https://www.facebook.com/tu_pagina', //
  instagram: 'https://www.instagram.com/tu_usuario', // 
  tripadvisor: 'https://www.tripadvisor.com/', // 
  youtube: 'https://www.youtube.com/', // 
};
