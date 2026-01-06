"use client";
import { useCart } from "@/app/context/CartContext";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { THALYS_IMAGES_URL } from "@/assets/constants";
import Link from "next/link";

export default function SideCart() {
  const router = useRouter();
  const {
    isCartOpen,
    closeCart,
    cart,
    cartCount,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [shouldRender, setShouldRender] = useState(isCartOpen);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setAnimateIn(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-1000 flex justify-end">
      {/* Overlay con Blur suave */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />

      {/* PANEL LATERAL: w-[85%] para que se vea el portal en mobile */}
      <div
        className={`relative w-[85%] sm:max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          animateIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header - Alineado a la izquierda */}
        <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm shrink-0">
          <div className="flex flex-col items-start text-left">
            {" "}
            {/* Alineación izquierda total */}
            <h2 className="font-poppins font-bold text-xl text-thalys-blue leading-tight">
              Mi Pedido
            </h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
              {cartCount}{" "}
              {cartCount === 1
                ? "Producto seleccionado"
                : "Productos seleccionados"}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2.5 text-gray-400 hover:text-thalys-red hover:bg-gray-50 rounded-full transition-all shrink-0"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <ShoppingBag size={64} className="text-gray-100 mb-4" />
              <p className="text-gray-400 font-medium">No hay productos aún</p>
            </div>
          ) : (
            // ... dentro de la Lista de Productos (cart.map) ...

            cart.map((item) => {
              // 1. Validamos que item.image exista y extraemos solo el primer elemento si es array
              const uniqueKey = item.slug || item.productCode;

              const itemImage = Array.isArray(item.image)
                ? item.image[0]
                : item.image;
              const imageUrl = itemImage.startsWith("http")
                ? itemImage
                : `${THALYS_IMAGES_URL}${itemImage}`;

              return (
                <div
                  key={uniqueKey}
                  className="flex gap-4 border-b border-gray-50 pb-6 group"
                >
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                    <Image
                      src={imageUrl} // <--- Ahora sí usamos la URL procesada
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info del producto alineada a la izquierda */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between items-start text-left">
                    <div className="w-full text-left">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart} // <--- Corregido: closeCart es la función correcta
                        className="group/title"
                      >
                        <h4 className="text-sm font-bold text-thalys-blue leading-tight mb-1 line-clamp-2 text-left group-hover/title:text-thalys-red transition-colors duration-200">
                          {item.name}
                          {item.variant && (
                            <span className="text-thalys-red ml-1 font-bold">
                              ({item.variant})
                            </span>
                          )}
                        </h4>
                      </Link>
                      <p className="text-[10px] text-gray-400 font-mono text-left italic">
                        ID: {item.productCode}
                      </p>
                    </div>

                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                        <button
                          onClick={() => decreaseQuantity(item.productCode)}
                          className="p-1 text-gray-500 hover:text-thalys-red"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-thalys-blue">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 text-gray-500 hover:text-thalys-blue"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productCode)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer - Con mensaje de respuesta inmediata */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0">
          <button
            disabled={cart.length === 0}
            onClick={() => {
              closeCart();
              router.push("/checkout");
            }}
            className="w-full bg-thalys-blue text-white py-5 rounded-full font-bold flex items-center justify-center gap-2 shadow-xl shadow-thalys-blue/20 active:scale-95 transition-all"
          >
            Solicitar Presupuesto <ArrowRight size={20} />
          </button>

          <p className="text-[10px] text-center mt-4 text-gray-400 uppercase tracking-widest font-bold">
            Respuesta inmediata vía WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
