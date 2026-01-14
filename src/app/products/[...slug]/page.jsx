import { findProductAndVariant, getProductsByCategory, getFeaturedProducts } from "@/lib/productsData";
import { notFound } from "next/navigation";
import { THALYS_IMAGES_URL } from "@/assets/constants";
import { getCategoryConfig } from "@/config/categories";
import CategoryTemplate from "@/components/products/CategoryTemplate";
import ProductDetailView from "@/components/products/ProductDetailView"; // <--- Importamos el componente
import { toSlug } from "@/utils/textHelpers";
import React from "react";

// --- METADATA (Se mantiene igual) ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const segments = Array.isArray(slug) ? slug : [slug];
  const lastSegment = segments[segments.length - 1];

  // 1. LÓGICA DE PRODUCTO
  const { product, selectedVariant } = findProductAndVariant(lastSegment);
  if (product) {
    const displayName = selectedVariant
      ? `${product.name} (${selectedVariant.variant})`
      : product.name;
    const mainImg = Array.isArray(product.image) ? product.image[0] : product.image;

    return {
      title: `${displayName}`,
      description: product.longDescription,
      openGraph: {
        images: [{ url: `${THALYS_IMAGES_URL}${mainImg}` }],
      },
    };
  }

  // 2. LÓGICA DE CATEGORÍA / SUBCATEGORÍA
  const categoryConfig = getCategoryConfig(segments[0]);
  if (categoryConfig) {
    let title = categoryConfig.title;
    let description = categoryConfig.description;

    if (segments.length === 2) {
      // Es una subcategoría, intentamos obtener el nombre real de los productos
      const allProducts = categoryConfig.isSpecial ? getFeaturedProducts() : getProductsByCategory(categoryConfig.name);
      const subProduct = allProducts.find(p => toSlug(p.subCategory) === segments[1]);
      if (subProduct) {
        title = subProduct.subCategory;
        description = `Explora nuestra línea de ${title} en Thalys.`;
      }
    }

    return {
      title: title,
      description: description,
      openGraph: {
        title: `${title} | Thalys`,
        description: description,
        images: ["/logo_Thalys.png"], // O una imagen por categoría si tienes
      }
    };
  }

  // 3. LÓGICA DE ESPECIALIDAD (Área Profesional)
  const { getProfessionalAreas } = await import("@/lib/productsData");
  const specialties = getProfessionalAreas();
  const specialtyName = specialties.find(s => toSlug(s) === segments[0]);

  if (specialtyName) {
    let title = specialtyName;
    if (segments.length >= 2) {
      // Lógica similar para subcategoría dentro de especialidad
      title = `Productos para ${specialtyName}`;
    }

    return {
      title: title,
      description: `Productos para ${specialtyName}.`,
      openGraph: {
        title: `${title} | Thalys`,
        images: ["/logo_Thalys.png"],
      }
    };
  }

  // Fallback por defecto
  return { title: "Catálogo de Productos" };
}

// --- PÁGINA PRINCIPAL ---
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const segments = Array.isArray(slug) ? slug : [slug];
  const lastSegment = segments[segments.length - 1];

  // 1. ¿ES UN PRODUCTO? (Prioridad)
  const { product, selectedVariant } = findProductAndVariant(lastSegment);

  if (product) {
    // Delegamos toda la UI al componente ProductDetailView
    // Pasamos 'segments' para que el componente pueda calcular el pathPrefix y Breadcrumbs
    return (
      <ProductDetailView
        product={product}
        selectedVariant={selectedVariant}
        segments={segments}
      />
    );
  }

  // 2. ¿Es una Categoría o Subcategoría?
  const categoryConfig = getCategoryConfig(segments[0]);
  if (categoryConfig) {
    let initialProducts = categoryConfig.isSpecial ? getFeaturedProducts() : getProductsByCategory(categoryConfig.name);
    let title = categoryConfig.title;
    let description = categoryConfig.description;

    // Si hay un segundo segmento, es subcategoría
    if (segments.length === 2) {
      const subSlug = segments[1];
      initialProducts = initialProducts.filter(p => toSlug(p.subCategory) === subSlug);

      if (initialProducts.length > 0) {
        title = initialProducts[0].subCategory;
        description = `Productos en ${title} de la categoría ${categoryConfig.name}`;
      }
    }

    return (
      <CategoryTemplate
        categorySlug={segments[0]}
        subCategorySlug={segments[1] || null}
        title={title}
        description={description}
        productsData={initialProducts}
      />
    );
  }

  // 3. ¿Es una Especialidad (professionalArea)?
  const { getProfessionalAreas, getProductsByProfessionalArea } = await import("@/lib/productsData");
  const specialties = getProfessionalAreas();
  const specialtyName = specialties.find(s => toSlug(s) === segments[0]);

  if (specialtyName) {
    let initialProducts = getProductsByProfessionalArea(specialtyName);
    let title = specialtyName;

    // Lógica para manejar la subcategoría dentro de la especialidad (/products/cirugia/bisturi)
    if (segments.length >= 2) {
      const subSlug = segments[1];
      initialProducts = initialProducts.filter(p => toSlug(p.subCategory || "") === subSlug);

      if (initialProducts.length > 0) {
        title = initialProducts[0].subCategory;
      }
    }

    return (
      <CategoryTemplate
        categoryName={specialtyName}
        categorySlug={segments[0]}
        subCategorySlug={segments[1] || null}
        title={title}
        description={`Productos especializados para ${specialtyName}.`}
        productsData={initialProducts}
      />
    );
  }

  // 4. Fallback
  notFound();
}