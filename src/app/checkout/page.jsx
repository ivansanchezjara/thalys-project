"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  User,
  Building2,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { THALYS_IMAGES_URL } from "@/assets/constants";

export default function CheckoutPage() {
  const { cart, cartCount } = useCart();
  const [userData, setUserData] = useState({
    name: "",
    institut: "",
    city: "",
  });

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!userData.name) return alert("Por favor, ingresa tu nombre.");

    const businessNumber = "595983188000";

    let message = "🏥 *NUEVO PEDIDO - THALYS*\n";
    message += "--------------------------\n";
    message += `👤 *Doctor/a:* ${userData.name}\n`;
    message += `📍 *Ciudad:* ${userData.city || "CDE"}\n`;
    message += `🏥 *Institución:* ${userData.institut || "No especificada"}\n`;
    message += "--------------------------\n\n";

    cart.forEach((item) => {
      // Incluimos la variante en el texto de WhatsApp
      const variantText = item.variant ? ` (${item.variant})` : "";
      message += `✅ *${item.name}${variantText}*\n`;
      message += `Cant: ${item.quantity} | Cód: ${item.productCode}\n\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${businessNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-thalys-blue mb-4">
          Tu pedido está vacío
        </h2>
        <Link
          href="/products"
          className="bg-thalys-blue text-white px-8 py-3 rounded-full font-bold"
        >
          Explorar Instrumental
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-12 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LADO IZQUIERDO: Formulario */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/products"
              className="text-gray-400 hover:text-thalys-red flex items-center gap-2 text-sm mb-6 transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Continuar viendo productos
            </Link>
            <h1 className="text-4xl font-poppins font-bold text-thalys-blue mb-4 leading-tight">
              Datos de Envío
            </h1>
            <p className="text-gray-500 font-light max-w-md mx-auto">
              Ingresa tus datos para que un asesor especializado te envíe el
              presupuesto formal a tu celular.
            </p>
          </div>

          <form
            id="checkout-form"
            onSubmit={handleWhatsApp}
            className="space-y-5"
          >
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={20}
              />
              <input
                required
                type="text"
                placeholder="Nombre y Apellido del Dr/a *"
                className="w-full pl-12 p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-thalys-blue outline-none transition-all"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={20}
              />
              <input
                required
                type="text"
                placeholder="Ciudad / Localidad *"
                className="w-full pl-12 p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-thalys-blue outline-none transition-all"
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <Building2
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={20}
              />
              <input
                type="text"
                placeholder="Nombre de la Institución (Opcional)"
                className="w-full pl-12 p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-thalys-blue outline-none transition-all"
                onChange={(e) =>
                  setUserData({ ...userData, institut: e.target.value })
                }
              />
            </div>
          </form>
        </div>

        {/* LADO DERECHO: Resumen Visual */}
        <div className="lg:col-span-5">
          <h2 className="text-xl font-bold text-thalys-blue mb-8 flex justify-between items-center">
            Tu Selección
            <span className="text-xs bg-thalys-blue text-white px-3 py-1 rounded-full">
              {cartCount} Ítems
            </span>
          </h2>

          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {cart.map((item) => {
              // Lógica para limpiar la URL de la imagen y evitar error 403
              const rawImage = Array.isArray(item.image)
                ? item.image[0]
                : item.image;
              const cleanImageName =
                typeof rawImage === "string"
                  ? rawImage.split(",")[0].trim()
                  : "";
              const imageUrl = cleanImageName?.startsWith("http")
                ? cleanImageName
                : `${THALYS_IMAGES_URL}${cleanImageName}`;

              return (
                <div
                  key={item.productCode}
                  className="flex gap-4 items-center group"
                >
                  <div className="relative h-24 w-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-50 shadow-sm">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <Link
                      href={`/products/${item.slug}`}
                      className="group/item flex-1 min-w-0"
                    >
                      <h4 className="text-thalys-blue font-bold leading-tight mb-1 group-hover/item:text-thalys-red transition-colors duration-200">
                        {item.name}
                        {item.variant && (
                          <span className="text-thalys-red ml-1 font-bold">
                            ({item.variant})
                          </span>
                        )}
                      </h4>
                    </Link>
                    <p className="text-left text-[12px] text-gray-400 font-mono italic">
                      Cód: {item.productCode}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">
                        Cantidad: {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-dashed border-gray-200 text-left">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-400 italic">
                Presupuesto:
              </span>
              <span className="text-thalys-blue font-bold text-lg">
                A Consultar
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <button
              form="checkout-form"
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#1fae53] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-500/10"
            >
              <MessageCircle fill="currentColor" size={20} />
              <span className="text-base">Concluir vía WhatsApp</span>
            </button>
            <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-3xl border border-gray-100">
              <ShieldCheck className="text-thalys-red shrink-0" size={20} />
              <p className="text-[10px] text-gray-400 leading-tight font-medium uppercase tracking-tight text-left">
                Compra protegida: Tu pedido será verificado por stock antes del
                pago.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
