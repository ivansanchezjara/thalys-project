// lib/routeResolver.js
import {
  findProductAndVariant,
  getProductsByCategory,
  getFeaturedProducts,
  getProfessionalAreas,
  getProductsByProfessionalArea,
} from "@/lib/productsData";
import { getCategoryConfig } from "@/config/categories";
import { toSlug } from "@/utils/textHelpers";

export async function resolveRouteData(slugParam) {
  const segments = Array.isArray(slugParam) ? slugParam : [slugParam];
  const lastSegment = segments[segments.length - 1];
  const firstSegment = segments[0];

  // 1. INTENTO: PRODUCTO
  const { product, selectedVariant } = findProductAndVariant(lastSegment);
  if (product) {
    return {
      type: "PRODUCT",
      data: { product, selectedVariant, segments },
    };
  }

  // 2. INTENTO: CATEGORÍA TÉCNICA (ej: "Instrumentales")
  const categoryConfig = getCategoryConfig(firstSegment);
  if (categoryConfig) {
    let initialProducts = categoryConfig.isSpecial
      ? getFeaturedProducts()
      : getProductsByCategory(categoryConfig.name);

    let title = categoryConfig.title;
    let description = categoryConfig.description;

    // Manejo de Subcategoría
    if (segments.length === 2) {
      const subSlug = segments[1];
      initialProducts = initialProducts.filter(
        (p) => toSlug(p.subCategory) === subSlug,
      );

      if (initialProducts.length > 0) {
        title = initialProducts[0].subCategory; // Override del título
        description = `Productos en ${title} de la categoría ${categoryConfig.name}`;
      }
    }

    return {
      type: "CATEGORY",
      data: {
        categorySlug: firstSegment,
        subCategorySlug: segments[1] || null,
        title,
        description,
        products: initialProducts,
      },
    };
  }

  // 3. INTENTO: ESPECIALIDAD (ej: "Cirugía")
  const specialties = getProfessionalAreas();
  const specialtyName = specialties.find((s) => toSlug(s) === firstSegment);

  if (specialtyName) {
    let initialProducts = getProductsByProfessionalArea(specialtyName);
    let title = specialtyName;

    // Manejo de Subcategoría dentro de Especialidad
    if (segments.length >= 2) {
      const subSlug = segments[1];
      initialProducts = initialProducts.filter(
        (p) => toSlug(p.subCategory || "") === subSlug,
      );
      if (initialProducts.length > 0) {
        title = initialProducts[0].subCategory;
      }
    }

    return {
      type: "SPECIALTY",
      data: {
        categoryName: specialtyName,
        categorySlug: firstSegment,
        subCategorySlug: segments[1] || null,
        title,
        description: `Productos especializados para ${specialtyName}.`,
        products: initialProducts,
      },
    };
  }

  // 4. NADA ENCONTRADO
  return null;
}
