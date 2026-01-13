import rawData from "../assets/THALYS.json";

// Intentar normalizar los datos de diferentes formas posibles en Next.js
let productsData = [];

if (Array.isArray(rawData)) {
  productsData = rawData;
} else if (rawData && typeof rawData === "object") {
  if (Array.isArray(rawData.default)) {
    productsData = rawData.default;
  } else if (rawData.products && Array.isArray(rawData.products)) {
    productsData = rawData.products;
  } else {
    // Si no es un array, intentamos convertirlo si es un objeto con índices
    productsData = Object.values(rawData).filter(
      (item) => item && typeof item === "object"
    );
  }
}

/**
 * Módulo centralizado para acceso a datos de productos
 */

export function getProducts() {
  return productsData;
}

export function getFeaturedProducts() {
  return productsData.filter((product) => product.featured);
}

export function getProductsByCategory(categoryName) {
  return productsData.filter((p) => p.categories === categoryName);
}

export function getProductsByProfessionalArea(areaName) {
  const normArea = areaName.toLowerCase();
  return productsData.filter((p) => {
    if (!p.professionalAreas) return false;
    return p.professionalAreas
      .split(",")
      .map((a) => a.trim().toLowerCase())
      .includes(normArea);
  });
}

export function getProfessionalAreas() {
  const areas = new Set();
  productsData.forEach((p) => {
    if (p.professionalAreas) {
      p.professionalAreas
        .split(",")
        .map((a) => a.trim())
        .forEach((a) => {
          if (a && a !== "General") areas.add(a);
        });
    }
  });
  return Array.from(areas).sort();
}

export function findProductAndVariant(slug) {
  if (!slug) return { product: null, selectedVariant: null };

  // Normalizar slug
  const cleanSlug = String(slug).toLowerCase();

  for (const item of productsData) {
    if (!item || !item.slug) continue;

    const itemSlug = String(item.slug).toLowerCase();

    // 1. Coincidencia exacta
    if (itemSlug === cleanSlug) {
      return { product: item, selectedVariant: null };
    }

    // 2. Coincidencia con variante
    if (item.variants && cleanSlug.startsWith(itemSlug)) {
      const sub = cleanSlug.replace(`${itemSlug}-`, "");
      const v = item.variants.find(
        (v) => String(v.subSlug).toLowerCase() === sub
      );
      if (v) return { product: item, selectedVariant: v };
    }
  }

  return { product: null, selectedVariant: null };
}

export function getProductBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase();
  return (
    productsData.find(
      (p) => p.slug && String(p.slug).toLowerCase() === cleanSlug
    ) || null
  );
}
