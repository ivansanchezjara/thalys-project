import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import { getFeaturedProducts } from "@/lib/productsData";
import ProductsCarousel from "@/components/ui/ProductsCarousel";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  return (
    <div className="flex flex-col w-full">
      {/* 1. SECCIÓN HERO: El primer impacto */}
      <section className="relative bg-gray-50 py-10 md:py-12 border-b border-gray-100 overflow-hidden">
        {/* Imagen de Fondo con Opacidad */}
        <div className="absolute inset-0 z-0 opacity-[0.40] pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="relative w-[500px] h-[500px] shrink-0">
            <Image
              src="/instrumental.png"
              alt="Background texture"
              fill
              className="object-contain -rotate-60 scale-[1.4] transition-transform duration-0 antialiased"
              style={{
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                WebkitTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
              priority
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 relative z-10">
          {/* Contenedor del Logo con brillo */}
          <div className="flex-1 flex justify-center relative">
            {/* Brillo decorativo detrás del logo */}
            <div className="absolute inset-0 blur-[100px] rounded-full" />

            <div className="relative w-full max-w-sm aspect-square bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center p-8 overflow-hidden border border-white">
              <Image
                src="/logo_Thalys.png"
                alt="Logo Thalys"
                width={300}
                height={300}
                className="object-contain relative z-10"
                priority
              />
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Insumos Dentales de{" "}
              <span className="text-thalys-red">Alta Gama</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg mx-auto font-light">
              Thalys es tu aliado estratégico en el consultorio. Ofrecemos
              calidad certificada y precisión para profesionales exigentes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-gray-900 text-white px-12 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
              >
                Ver Productos <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="bg-white border border-gray-200 text-gray-700 px-12 py-3.5 rounded-full font-semibold hover:bg-gray-50 transition-all text-center"
              >
                Sobre Nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTOS DESTACADOS */}
      <section className="bg-white py-6 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <ProductsCarousel products={featuredProducts} title="Destacados" />
        </div>
      </section>

      {/* 3. BARRA DE BENEFICIOS: Genera confianza inmediata */}
      <section className="pt-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-blue-50/50 transition-transform hover:scale-105">
            <ShieldCheck className="text-blue-600 w-12 h-12" />
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Garantía Thalys
              </h3>
              <p className="text-sm text-gray-600 max-w-[200px] mx-auto">
                Productos certificados bajo normas internacionales.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-green-50/50 transition-transform hover:scale-105">
            <Truck className="text-green-600 w-12 h-12" />
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Envío Prioritario
              </h3>
              <p className="text-sm text-gray-600 max-w-[200px] mx-auto">
                Sabemos que tu clínica no puede detenerse.
              </p>
            </div>
          </div>

          {/* Card 3: col-span-2 hace que se centre en móviles al ocupar toda la fila inferior */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-yellow-50/50 transition-transform hover:scale-105">
            <Star className="text-yellow-600 w-12 h-12" />
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Soporte Técnico
              </h3>
              <p className="text-sm text-gray-600 max-w-[200px] mx-auto">
                Asesoramiento profesional en cada compra.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
