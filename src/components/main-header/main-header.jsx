"use client";

import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import logoImg from "../../../public/logo_Thalys.png";
import { useCart } from "@/app/context/CartContext";
import CategoriesMenu from "./CategoriesMenu"; // <--- 1. Importamos el componente

export default function MainHeader({ productsData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Productos", href: "/products" },
    { name: "Descargas", href: "/downloads" },
    { name: "Sobre Nosotros", href: "/about" },

  ];

  return (
    <header className="w-full sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-4 p-3 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 flex items-center transition-opacity hover:opacity-90 active:scale-95"
        >
          <Image
            src={logoImg}
            alt="Logo Thalys"
            height={48}
            width={150}
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-600 self-stretch">

          {/* 2. AÑADIMOS EL MENÚ DE CATEGORÍAS AQUÍ */}
          <CategoriesMenu productsData={productsData} />

          {/* Mapeamos el resto de links, excluyendo "Productos" porque ya está en el menú */}
          {navLinks.filter(link => link.name !== "Productos").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center h-full transition-colors hover:text-gray-900 ${pathname === link.href ? "text-gray-900 font-medium" : ""
                }`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-[-13px] left-0 w-full h-0.5 bg-gray-900" />
              )}
            </Link>
          ))}
        </nav>

        <SearchBar />

        {/* Contenedor de Iconos (Carrito visible en todo, Menu solo Mobile) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Carrito Minimalista (Sin texto deslizable) */}
          <button
            onClick={openCart}
            className="flex items-center justify-center p-2.5 bg-white text-thalys-blue hover:bg-gray-50 rounded-full transition-all active:scale-90 relative group"
            aria-label="Ver pedido"
          >
            <div className="relative">
              <ShoppingCart
                size={24}
                strokeWidth={2}
                className="group-hover:scale-110 transition-transform duration-300"
              />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-thalys-red text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold shadow-sm animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors z-50 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Limpio y sin el botón negro de pedido */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100 bg-white ${mobileOpen
          ? "max-h-[800px] opacity-100 overflow-y-auto" // Aumentamos max-h para que quepa el acordeón
          : "max-h-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-2 p-4 pb-6">

          {/* 3. AÑADIMOS EL MENÚ MÓVIL AQUÍ */}
          <CategoriesMenu mobile={true} onItemClick={() => setMobileOpen(false)} productsData={productsData} />

          {/* Mapeamos el resto de links, excluyendo "Productos" */}
          {navLinks.filter(link => link.name !== "Productos").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`p-4 rounded-2xl text-xl font-poppins transition-colors flex items-center justify-between ${pathname === link.href
                ? "bg-gray-50 text-thalys-blue font-bold"
                : "text-gray-600 active:bg-gray-50 font-medium"
                }`}
            >
              <span>{link.name}</span>
              <ArrowRight
                size={20}
                className={`transition-transform duration-300 ${pathname === link.href
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
                  }`}
              />
            </Link>
          ))}

          <div className="mt-4 pt-6 border-t border-gray-50">
            <p className="text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold text-center">
              Thalys • Insumos Profesionales
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}