"use client";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductsCard";
import { THALYS_IMAGES_URL } from "@/assets/constants";
import ShareButton from "@/components/ui/ShareButton";
import { SearchX } from "lucide-react";

export function SearchResults({ results, searchQuery, activeCategory }) {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Header con formato de Thalys */}
      <header className="mb-6 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 text-thalys-red font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <span className="w-8 h-1px bg-thalys-red opacity-30"></span>
            <span className="shrink-0">Resultados de búsqueda</span>
            <span className="w-8 h-1px bg-thalys-red opacity-30"></span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-thalys-blue max-w-3xl">
            Explorando <span className="text-thalys-red">"{searchQuery}"</span>
          </h1>
        </div>

        <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ShareButton
            title={`Resultados para "${searchQuery}" | Thalys`}
            text={`Doctor, le comparto estos insumos de Thalys para: ${searchQuery}`}
          />
        </div>
      </header>

      {/* Lógica de renderizado con tu formato exacto */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {results.map((product) => (
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
        <div className="text-center py-32 bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-200 mt-12 flex flex-col items-center">
          {/* Elemento Visual: Un icono sutil que refuerza el mensaje */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-6">
            <SearchX className="text-gray-300" size={40} strokeWidth={1.5} />
          </div>

          <h3 className="text-2xl font-bold text-thalys-blue mb-3 font-poppins">
            No hay resultados exactos
          </h3>

          <p className="text-gray-500 mb-10 px-4 font-light max-w-sm mx-auto leading-relaxed">
            No encontramos coincidencias para{" "}
            <span className="text-thalys-red font-medium">"{searchQuery}"</span>
            {activeCategory !== "Todos" && (
              <>
                {" "}
                en la categoría{" "}
                <span className="font-medium text-thalys-blue">
                  {activeCategory}
                </span>
              </>
            )}
            .
          </p>

          {/* Botones de acción: Uno principal y uno secundario sutil */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/products"
              className="inline-block px-10 py-4 bg-thalys-blue text-white rounded-full font-bold active:scale-95 transition-all shadow-xl shadow-thalys-blue/20 hover:bg-thalys-blue/90"
            >
              Ver todo el catálogo
            </Link>

            {searchQuery && (
              <button
                onClick={() => window.history.back()}
                className="text-gray-400 text-sm font-medium hover:text-thalys-red transition-colors"
              >
                Volver atrás
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
