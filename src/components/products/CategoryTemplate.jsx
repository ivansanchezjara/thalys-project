"use client";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductsCard";
import ProductsFilters from "@/components/products/ProductsFilters";
import { THALYS_IMAGES_URL } from "@/assets/constants";
import { PaginationInfo, PaginationControls } from "@/components/ui/Pagination";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useMemo, useRef } from "react";
import { toSlug } from "@/utils/textHelpers";

const ITEMS_PER_PAGE = 24;

export default function CategoryTemplate({
  categorySlug,
  title,
  description,
  productsData = [],
}) {

  const {
    activeSubCategory,
    activeArea,
    activeAttributes,
    currentPage,
    setCurrentPage,
    subCategories,
    professionalAreas,
    dynamicAttributes,
    filteredProducts,
    handleSubCategoryChange,
    setActiveArea,
    handleAttributeChange,
    clearAllFilters,
  } = useProductFilters(productsData);

  // --- PAGINACIÓN ---
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const itemsSectionRef = useRef(null);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to the top of the products section
      if (itemsSectionRef.current) {
        const yOffset = -100; // Optional offset for sticky headers
        const element = itemsSectionRef.current;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });

        // Fallback or alternative:
        // itemsSectionRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Configuración de grupos de filtros
  const filterGroups = useMemo(() => {
    return [
      {
        title: "Categoría",
        options: subCategories,
        active: activeSubCategory,
        setActive: handleSubCategoryChange,
      },
      {
        title: "Área Profesional",
        options: professionalAreas,
        active: activeArea,
        setActive: setActiveArea,
      },
      ...dynamicAttributes.map((attr) => ({
        title: attr.title,
        options: attr.options,
        active: activeAttributes[attr.key] || "Todos",
        setActive: (val) => handleAttributeChange(attr.key, val),
      })),
    ].filter((g) => g.options.length > 2);
  }, [
    subCategories,
    professionalAreas,
    dynamicAttributes,
    activeSubCategory,
    activeArea,
    activeAttributes,
    handleSubCategoryChange,
    setActiveArea,
    handleAttributeChange,
  ]);

  return (
    <main ref={itemsSectionRef} className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
      {/* HEADER */}
      <header className="mb-6 flex flex-col items-center justify-center text-center border-b border-gray-100 pb-6">
        <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-thalys-blue">
          {title}
        </h1>
        {description && (
          <p className="text-gray-500 font-light mt-3 max-w-xl mx-auto">
            {description}
          </p>
        )}
      </header>

      {/* LAYOUT PRINCIPAL: SIDEBAR + GRID */}
      <div className="flex flex-col md:flex-row items-start animate-fadeIn">
        {/* SIDEBAR FILTERS */}
        <div className="w-full md:w-auto">
          {filterGroups.length > 0 && (
            <ProductsFilters
              filterGroups={filterGroups}
              clearAll={clearAllFilters}
            />
          )}
        </div>

        {/* CONTENIDO (GRID) */}
        <div className="flex-1 w-full">
          <PaginationInfo
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={totalItems}
          />

          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mb-12">
                {paginatedProducts.map((product) => (
                  <Link
                    href={`/products/${categorySlug || toSlug(product.categories)}/${toSlug(product.subCategory)}/${product.slug}`}
                    key={product.generalCode}
                    className="block hover:scale-[1.02] transition-transform duration-300"
                  >
                    <ProductCard
                      product={{
                        ...product,
                        image: `${THALYS_IMAGES_URL}${Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                          }`,
                      }}
                    />
                  </Link>
                ))}
              </div>

              {/* PAGINATION CONTROLS */}
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center">
              <p className="text-gray-500">
                No se encontraron productos con estos filtros.
              </p>
              <button
                onClick={clearAllFilters}
                className="text-thalys-blue hover:underline mt-4 font-bold"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
