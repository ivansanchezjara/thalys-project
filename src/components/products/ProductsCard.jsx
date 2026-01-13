"use client";

import Image from "next/image";
import { ShoppingCart, Check, ListFilter } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const hasVariants = product.variants && product.variants.length > 0;

  const handleAdd = (e) => {
    if (hasVariants) return;
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full relative">
      {/* Contenedor de Imagen */}
      <div className="relative aspect-square overflow-hidden shrink-0">
        {product.tag && (
          <span className="absolute top-2 left-2 bg-thalys-red text-white text-[8px] uppercase font-bold px-2 py-0.5 rounded-full z-20 shadow-sm">
            {product.tag}
          </span>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Detalles del Producto */}
      <div className="p-3 flex flex-col grow text-left">
        <span className="text-[9px] text-thalys-gold font-bold uppercase tracking-widest mb-1 truncate">
          {product.categories || "General"}
        </span>

        {/* NOMBRE */}
        <h3 className="text-sm font-medium text-thalys-blue mb-2 leading-tight group-hover:underline underline-offset-2 transition-all line-clamp-2 min-h-[2.5em]">
          {product.name}
        </h3>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex justify-between items-end border-t border-gray-50 pt-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 uppercase font-medium">
                Precio
              </span>
              <span className="text-sm font-bold text-gray-800 leading-none">
                A consultar
              </span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 ${hasVariants
              ? "bg-thalys-blue text-white hover:bg-blue-900"
              : added
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-thalys-blue border border-gray-200 hover:bg-gray-200"
              }`}
          >
            {hasVariants ? (
              <>
                <ListFilter size={14} />
                Opciones
              </>
            ) : added ? (
              <>
                <Check size={14} />
                ¡Agregado!
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                Añadir
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
