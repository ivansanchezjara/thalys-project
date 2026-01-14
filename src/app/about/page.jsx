import Image from "next/image";
import { ShieldCheck, Wrench, Users, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Sobre Nosotros | Thalys - Innovación Odontológica",
  description: "Descubre la filosofía de Thalys. Ofrecemos Precisión en insumos odontológicos que inspira confianza clínica.",
  keywords: ["odontología", "insumos dentales", "Thalys", "instrumental médico", "precisión clínica"],
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Confiabilidad",
    text: "Garantía de calidad en cada suministro dental.",
    img: "/about/cinta-articular.png",
  },
  {
    icon: Wrench,
    title: "Enfoque técnico",
    text: "Ergonomía y precisión diseñada para el experto.",
    img: "/about/cuba-ultrasonica.png",
  },
  {
    icon: Users,
    title: "Experiencia Real",
    text: "Feedback constante de odontólogos líderes.",
    img: "/about/guantes.png",
  },
  {
    icon: Target,
    title: "Propósito Claro",
    text: "Soluciones que optimizan tu flujo de trabajo.",
    img: "/about/silicona-de-adicion.png",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      {/* Reducimos el gap de 24/40 a 12/20 para que las secciones estén más cerca */}
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12 flex flex-col gap-16 lg:gap-24">
        {/* --- Hero Section --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <span className="text-center text-thalys-red font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Innovación Odontológica
            </span>
            <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-thalys-blue leading-[1.1]">
              Precisión que inspira <br />
              <span className="text-thalys-red">confianza clínica.</span>
            </h1>

            <p className="text-base md:text-lg text-thalys-text leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Thalys redefine el estándar en insumos odontológicos y de
              laboratorio. Creamos el equilibrio perfecto entre ingeniería
              funcional y diseño accesible para el profesional moderno.
            </p>

            <div className="h-1.5 w-20 bg-thalys-red rounded-full mx-auto"></div>
          </div>

          <div className="relative order-1 lg:order-2 w-full aspect-square max-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-tr from-thalys-gold/30 to-thalys-gold/5 rounded-[3rem] shadow-xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/about/instrumentales.png"
                alt="Instrumentales Thalys Premium"
                fill
                className="object-contain scale-115 drop-shadow-2xl transition-transform duration-700 hover:scale-120"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* --- Values Section --- */}
        <section>
          <div className="text-center mb-5">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-thalys-blue mb-4">
              Los pilares de <span className="text-thalys-red">Thalys</span>
            </h2>
            <p className="text-thalys-text max-w-2xl mx-auto">
              Más que productos, entregamos herramientas diseñadas para elevar
              el estándar de tu consulta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl border border-gray-100 p-4 transition-all duration-500 hover:shadow-lg flex flex-col items-center text-center"
                >
                  <div className="relative w-full aspect-square mb-6 flex items-center justify-center bg-linear-to-b from-gray-50 to-white rounded-2xl overflow-hidden p-4">
                    <Image
                      src={card.img}
                      alt={card.title}
                      width={280}
                      height={280}
                      className="object-contain w-full drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mb-4 p-3 bg-thalys-red/5 rounded-2xl text-thalys-red">
                    <Icon size={22} />
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <h3 className="font-poppins text-xl font-bold text-thalys-blue group-hover:text-thalys-red transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-thalys-text leading-relaxed px-2">
                      {card.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- Philosophy Section --- */}
        <section className="bg-gray-50/80 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="relative min-h-[300px] lg:min-h-full flex items-center justify-center p-8">
              <Image
                src="/about/piezas-de-mano1.png"
                alt="Detalle de instrumento dental Thalys"
                width={450}
                height={450}
                className="w-full h-auto max-h-[350px] object-contain drop-shadow-xl"
              />
            </div>

            {/* Reducimos el padding de p-20 a p-12 */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center text-center lg:text-left lg:items-start bg-gray-50/30 lg:bg-transparent">
              <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-thalys-blue leading-tight">
                Nuestra Filosofía
              </h2>
              <div className="space-y-6 text-thalys-text">
                <p className="text-lg leading-relaxed max-w-lg text-gray-700">
                  Thalys nace como respuesta a la necesidad de contar con
                  productos{" "}
                  <span className="text-thalys-gold font-semibold underline underline-offset-4 decoration-thalys-gold/30">
                    confiables, bien diseñados y accesibles.
                  </span>
                </p>

                <div className="relative py-4 pl-6 text-left">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-thalys-red rounded-full" />
                  <p className="text-lg italic text-thalys-blue/80 font-medium">
                    "Nuestro objetivo es acompañar al profesional con
                    herramientas en las que pueda confiar a largo plazo, sin
                    sacrificar calidad ni soporte técnico."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        {/* Reducimos el padding vertical de la sección final */}
        <section className="text-center max-w-4xl mx-auto py-6">
          <h3 className="text-2xl md:text-4xl font-poppins font-bold text-thalys-blue mb-8">
            Precisión y compromiso con tu profesión.
          </h3>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-thalys-red text-white px-10 py-4 rounded-full font-semibold hover:bg-[#8a1b27] transition-all active:scale-95"
          >
            Ver Catálogo de Productos
            <ArrowRight size={20} />
          </Link>
        </section>
      </div>
    </main>
  );
}
