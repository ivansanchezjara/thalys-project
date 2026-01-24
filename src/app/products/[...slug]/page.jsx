import React from "react";
import { notFound } from "next/navigation";
import { THALYS_IMAGES_URL } from "@/assets/constants";
import { resolveRouteData } from "@/lib/routeResolver";
import RotatoriosTemplate from "./RotatoriosTemplate";

// Componentes UI
import CategoryTemplate from "@/components/products/CategoryTemplate";
import ProductDetailView from "@/components/products/ProductDetailView";

// --- METADATA ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await resolveRouteData(slug);

  if (!result) return { title: "Página no encontrada" };

  if (result.type === "PRODUCT") {
    const { product, selectedVariant } = result.data;
    const displayName = selectedVariant
      ? `${product.name} (${selectedVariant.variant})`
      : product.name;
    const mainImg = Array.isArray(product.image) ? product.image[0] : product.image;

    return {
      title: displayName,
      description: product.longDescription,
      openGraph: {
        images: [{ url: `${THALYS_IMAGES_URL}${mainImg}` }],
      },
    };
  }

  // Si es CATEGORY o SPECIALTY, comparten estructura de metadata
  if (result.type === "CATEGORY" || result.type === "SPECIALTY") {
    const { title, description } = result.data;
    return {
      title: title,
      description: description,
      openGraph: {
        title: `${title} | Thalys`,
        description: description,
        images: ["/logo_Thalys_OP.jpg"],
      }
    };
  }
}

// --- PÁGINA PRINCIPAL ---
export default async function ProductPage({ params }) {
  const { slug } = await params;

  // 1. Resolvemos qué es esto (Producto, Categoría o Especialidad)
  const result = await resolveRouteData(slug);

  // 2. Si no es nada, 404
  if (!result) {
    notFound();
  }

  // 3. Renderizamos según el tipo
  switch (result.type) {
    case "PRODUCT":
      return (
        <ProductDetailView
          product={result.data.product}
          selectedVariant={result.data.selectedVariant}
          segments={result.data.segments}
        />
      );

    case "CATEGORY":
      if (result.data.categorySlug == "rotatorios") {
        return (
          <RotatoriosTemplate
            categorySlug={result.data.categorySlug}
            subCategorySlug={result.data.subCategorySlug}
            title={result.data.title}
            description={result.data.description}
            productsData={result.data.products}
          />
        )
      } else {
        return (
          <CategoryTemplate
            categorySlug={result.data.categorySlug}
            subCategorySlug={result.data.subCategorySlug}
            title={result.data.title}
            description={result.data.description}
            productsData={result.data.products}
          />
        );
      }

    case "SPECIALTY":
      return (
        <CategoryTemplate
          categoryName={result.data.categoryName}
          categorySlug={result.data.categorySlug}
          subCategorySlug={result.data.subCategorySlug}
          title={result.data.title}
          description={result.data.description}
          productsData={result.data.products}
        />
      );

    default:
      notFound();
  }
}