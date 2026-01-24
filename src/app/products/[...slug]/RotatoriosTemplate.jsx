"use client";
import CategoryTemplate from "@/components/products/CategoryTemplate";
import DiamondTech from "@/components/products/rotatorios/DiamnondTech"; // El componente que creamos

export default function RotatoriosTemplate({
    categorySlug,
    subCategorySlug,
    title,
    description,
    productsData
}) {
    return (
        <>
            {/* 2. Sección Técnica (Solo se muestra si estamos en la categoría o subcategoría de fresas) */}
            <div className="max-w-7xl mx-auto px-6 ">
                <DiamondTech />
            </div>
            {/* 1. La lista de productos estándar */}
            <CategoryTemplate
                categorySlug={categorySlug}
                subCategorySlug={subCategorySlug}
                title={title}
                description={description}
                productsData={productsData}
            />


        </>
    );
}