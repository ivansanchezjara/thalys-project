"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResults } from "./SearchResults";
import { normalizeText } from "@/utils/textHelpers";
import Sections from "./Sections";

export default function ProductsContent({ initialProducts = [] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const totalProducts = initialProducts.length;

  // --- LÓGICA DE BÚSQUEDA PROFUNDA (CORREGIDA) ---
  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    const term = normalizeText(searchQuery);

    return initialProducts.filter((p) => {
      // 1. Match en datos principales
      const matchMain =
        normalizeText(p.name).includes(term) ||
        normalizeText(p.description).includes(term) ||
        normalizeText(p.generalCode).includes(term) ||
        (p.productCode && normalizeText(p.productCode).includes(term));

      // 2. Match en Variantes (Curetas rígidas, talles de guantes, etc.)
      const matchVariants = p.variants?.some(
        (v) =>
          normalizeText(v.variant).includes(term) ||
          normalizeText(v.productCode).includes(term)
      );

      // 3. Match en Tags (Palabras clave extra)
      const matchTags = p.tags?.some((tag) => normalizeText(tag).includes(term));

      return matchMain || matchVariants || matchTags;
    });
  }, [searchQuery, initialProducts]);

  return (
    <main className="max-w-7xl mx-auto py-6 lg:py-16">
      {!searchQuery && (
        <header className="mb-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-thalys-blue">
            Nuestros <span className="text-thalys-red">Productos</span>
          </h1>

          {/* CONTADOR MINIMALISTA */}
          <div className="mt-3 flex items-center justify-center text-gray-500 font-medium bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
            <p className="text-xs font-medium uppercase tracking-wide">
              {totalProducts} productos disponibles
            </p>
          </div>
        </header>
      )}

      {searchQuery ? (
        <SearchResults
          results={filteredResults}
          searchQuery={searchQuery}
          activeCategory="Todos"
        />
      ) :
        <Sections productsData={initialProducts} />
      }
    </main>
  );
}