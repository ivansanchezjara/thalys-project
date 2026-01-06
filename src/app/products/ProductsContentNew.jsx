"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductsCarousel from "@/components/ui/ProductsCarousel";
import { SearchResults } from "./SearchResults";
import productsData from "@/assets/THALYS.json";

export default function ProductsContentNew() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const activeCategory = searchParams.get("category") || "Todos";

  // 1. Filtrado para búsqueda
  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    const term = searchQuery.toLowerCase();
    return productsData.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
        p.variants?.some((v) => v.productCode.toLowerCase().includes(term))
    );
  }, [searchQuery]);

  // 2. Agrupación para carruseles
  const categoriesMap = useMemo(() => {
    if (searchQuery) return {};
    const groups = {};
    productsData.forEach((p) => {
      const cat = p.categories || "Otros";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [searchQuery]);

  const mainFeatured = useMemo(
    () => productsData.filter((p) => p.featured),
    []
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
      {searchQuery ? (
        /* VISTA DE BÚSQUEDA: El header ya está dentro de este componente */
        <SearchResults
          results={filteredResults}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
        />
      ) : (
        /* VISTA EDITORIAL: Aquí sí ponemos el header del catálogo */
        <>
          <header className="mb-12 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-thalys-blue">
              Catálogo <span className="text-thalys-red">Premium</span>
            </h1>
            <p className="text-gray-500 font-light mt-3 max-w-xl mx-auto">
              Equipamiento de alta precisión para clínicas y laboratorios.
            </p>
          </header>

          {activeCategory === "Todos" && (
            <ProductsCarousel
              products={mainFeatured}
              title="Novedades Thalys"
            />
          )}

          {Object.entries(categoriesMap).map(([name, products]) => {
            if (activeCategory !== "Todos" && activeCategory !== name)
              return null;
            return (
              <ProductsCarousel
                key={name}
                products={products}
                title={name}
                viewAllLink={`/products?category=${name}`}
              />
            );
          })}
        </>
      )}
    </main>
  );
}
