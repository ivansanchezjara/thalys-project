"use client";
import { useCart } from "@/app/context/CartContext";
import { ShoppingCart, Check, MousePointerClick } from "lucide-react";
import { useState } from "react";
import { THALYS_IMAGES_URL } from "@/assets/constants";

export default function AddToCartSingle({ product, disabled }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (disabled) return;

    // Procesamos la imagen correctamente (tomando la primera si es array)
    const rawImage = Array.isArray(product.image)
      ? product.image[0]
      : product.image;

    const cartProduct = {
      ...product,
      name: product.name || product.description,
      // Usamos la URL completa para el carrito
      image: rawImage.startsWith("http")
        ? rawImage
        : `${THALYS_IMAGES_URL}${rawImage}`,
    };

    addToCart(cartProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`flex-[1.5] min-w-0 h-14 rounded-full font-bold active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 group ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200"
          : added
          ? "bg-green-500 text-white shadow-green-200"
          : "bg-thalys-blue text-white shadow-thalys-blue/10 hover:bg-blue-900"
      }`}
    >
      {disabled ? (
        <>
          <MousePointerClick size={18} className="shrink-0 opacity-50" />
          <span className="text-[13px] md:text-base truncate">
            Seleccionar {product.variantType || "talle"}
          </span>
        </>
      ) : added ? (
        <>
          <Check size={18} />
          <span className="text-[13px] md:text-base truncate">¡Agregado!</span>
        </>
      ) : (
        <>
          <ShoppingCart
            size={18}
            className="group-hover:animate-bounce shrink-0"
          />
          <span className="text-[13px] md:text-base truncate">
            Añadir al carrito
          </span>
        </>
      )}
    </button>
  );
}
