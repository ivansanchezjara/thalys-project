"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductsCard";
import { ProductFilters } from "@/components/products/ProductsFilters";
import productsData from "@/assets/THALYS.json";
import { THALYS_IMAGES_URL } from "@/assets/constants";
import ShareButton from "@/components/ui/ShareButton";

export default function ProductsContent() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") || "";
  const activeCategory = searchParams.get("category") || "Todos";

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const term = searchQuery.toLowerCase();

      // 1. Buscamos en el nombre, descripción y etiquetas del PADRE
      const matchesSearch = searchQuery
        ? product.name?.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
          // También buscamos si el término coincide con algún productCode de sus variantes
          product.variants?.some((v) =>
            v.productCode.toLowerCase().includes(term)
          )
        : true;

      const matchesCategory =
        activeCategory === "Todos" || product.categories === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
      <header className="mb-6 flex flex-col items-center justify-center  text-center">
        {/* Bloque de Títulos */}
        <div className="flex flex-col items-center">
          {searchQuery ? (
            <>
              {/* Etiqueta con líneas simétricas */}
              <div className="flex items-center justify-center gap-3 text-thalys-red font-bold text-xs uppercase tracking-[0.2em] mb-3">
                <span className="w-8 h-1px bg-thalys-red opacity-30"></span>
                <span className="shrink-0">Resultados de búsqueda</span>
                <span className="w-8 h-1px bg-thalys-red opacity-30"></span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-thalys-blue max-w-3xl">
                Explorando{" "}
                <span className="text-thalys-red">"{searchQuery}"</span>
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-thalys-blue">
                Catálogo <span className="text-thalys-red">Premium</span>
              </h1>
              <p className="text-gray-500 font-light mt-3 max-w-xl mx-auto">
                Equipamiento de alta precisión para clínicas y laboratorios.
              </p>
            </>
          )}
        </div>

        {/* Botón de Compartir Centrado */}
        {searchQuery && (
          <div className=" animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShareButton
              title={`Resultados para "${searchQuery}" | Thalys`}
              text={`Doctor, le comparto estos insumos de Thalys para: ${searchQuery}`}
            />
          </div>
        )}
      </header>

      <ProductFilters
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          window.location.href = `/products?category=${cat}${
            searchQuery ? `&q=${searchQuery}` : ""
          }`;
        }}
      />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {filteredProducts.map((product) => (
            <Link
              href={`/products/${product.defaultSlug || product.slug}`}
              key={product.generalCode}
              className="block hover:scale-[1.02] transition-transform duration-300"
            >
              <ProductCard
                product={{
                  ...product,
                  image: `${THALYS_IMAGES_URL}${
                    Array.isArray(product.image)
                      ? product.image[0]
                      : product.image
                  }`,
                  name: product.name,
                }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 mt-12">
          <h3 className="text-xl font-bold text-thalys-blue mb-2">
            Sin coincidencias
          </h3>
          <p className="text-gray-400 mb-8 px-4 font-light">
            No encontramos resultados para "{searchQuery}"{" "}
            {activeCategory !== "Todos" && `en ${activeCategory}`}.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-thalys-blue text-white rounded-full font-bold active:scale-95 transition-all shadow-lg shadow-thalys-blue/20"
          >
            Limpiar filtros
          </Link>
        </div>
      )}
    </main>
  );
}
