/**
 * Configuración centralizada de categorías
 * Define metadata, títulos y descripciones para cada categoría
 */

export const CATEGORIES = {
  instrumentales: {
    name: "Instrumentales",
    title: "Instrumentales",
    description: "Precisión absoluta en materiales de grado quirúrgico.",
    metadata: {
      title: "Instrumentales Odontológicos | Thalys",
      description:
        "Explora nuestra gama de fórceps, elevadores y todo sobre instrumentales.",
    },
  },
  bioseguridad: {
    name: "Bioseguridad",
    title: "Bioseguridad",
    description:
      "Protección total para tu equipo y tus pacientes con nuestros insumos certificados.",
    metadata: {
      title: "Bioseguridad y Protección | Thalys",
      description: "Guantes, mascarillas y esterilización para tu clínica.",
    },
  },
  destacados: {
    name: "Destacados",
    title: "Productos Destacados",
    description:
      "Descubre los productos más nuevos y destacados de nuestro catálogo.",
    metadata: {
      title: "Productos Destacados | Thalys",
      description:
        "Los mejores productos de nuestro catálogo seleccionados para ti.",
    },
    isSpecial: true, // Filtra por 'featured' en lugar de 'categories'
  },
};

/**
 * Obtiene la configuración de una categoría
 * @param {string} slug - Slug de la categoría (ej: "instrumentales")
 * @returns {Object|null} Configuración de la categoría o null si no existe
 */
export function getCategoryConfig(slug) {
  return CATEGORIES[slug] || null;
}

/**
 * Obtiene todos los slugs de categorías válidos
 * @returns {Array<string>} Array de slugs
 */
export function getCategorySlugs() {
  return Object.keys(CATEGORIES);
}
