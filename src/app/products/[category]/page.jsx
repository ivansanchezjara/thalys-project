"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import productsData from "@/assets/THALYS.json";
import { SearchResults } from "../SearchResults";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category; // ej: "ortodoncia"

  // 1. Buscamos los productos que pertenecen a este slug
  const { filteredProducts, categoryName } = useMemo(() => {
    const filtered = productsData.filter((p) => {
      const slug = p.categories
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
      return slug === categorySlug;
    });

    // Intentamos obtener el nombre real (con mayúsculas/tildes) del primer producto
    const realName =
      filtered.length > 0 ? filtered[0].categories : categorySlug;

    return { filteredProducts: filtered, categoryName: realName };
  }, [categorySlug]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16 min-h-screen">
      <SearchResults
        results={filteredProducts}
        searchQuery={categoryName}
        activeCategory={categoryName}
      />
    </main>
  );
}
