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
    <div className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full relative">
      {/* Contenedor de Imagen */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden shrink-0">
        {product.tag && (
          <span className="absolute top-4 left-4 bg-thalys-red text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full z-20 shadow-sm">
            {product.tag}
          </span>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Detalles del Producto */}
      <div className="p-5 flex flex-col grow text-left">
        <span className="text-[10px] text-thalys-gold font-bold uppercase tracking-widest mb-1">
          {product.categories || "General"}
        </span>

        {/* NOMBRE: Sin límite de filas y con subrayado en hover */}
        <h3 className="text-base text-thalys-blue mb-4 min-h-12 leading-tight group-hover:underline underline-offset-4 transition-all">
          {product.name}
        </h3>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex justify-between items-end border-t border-gray-50 pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase font-medium">
                Precio
              </span>
              <span className="text-lg font-bold text-gray-900 leading-none">
                A consultar
              </span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
              hasVariants
                ? "bg-thalys-blue text-white hover:bg-blue-900"
                : added
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-thalys-blue border border-gray-200 hover:bg-gray-200"
            }`}
          >
            {hasVariants ? (
              <>
                <ListFilter size={18} />
                Ver opciones
              </>
            ) : added ? (
              <>
                <Check size={18} />
                ¡Agregado!
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                Añadir
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
