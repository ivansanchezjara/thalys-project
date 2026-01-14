import { MapPin, MessageCircle } from "lucide-react";
import logoImg from "../../../public/logo_Thalys.png";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-thalys-blue text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" className="inline-block">
            <Image
              src={logoImg}
              alt="Logo Thalys"
              className="h-18 w-auto object-contain"
              priority
            />
          </Link>
          <p className="text-sm md:text-base text-white font-medium">
            Essence of Beauty.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <h4 className="font-poppins font-semibold mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-thalys-gold">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-thalys-gold">
                Productos
              </Link>
            </li>
            <li>
              <Link href="/downloads" className="hover:text-thalys-gold">
                Descargas
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-thalys-gold">
                Sobre Thalys
              </Link>
            </li>
          </ul>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <h4 className="font-poppins font-semibold mb-3">WhatsApp</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex text-left items-center gap-3">
              <a
                href="https://wa.me/595983600789?text=Hola%2C%20tengo%20una%20consulta%20sobre%20los%20productos%20Thalys."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 grid place-items-center"
              >
                <MessageCircle size={24} className="text-white" />
              </a>

              <span>
                Ing. Victor Rolando Sanchez Samaniego
                <br />
                <a
                  href="tel:+595983600789"

                >
                  <strong>+595 983 600 789</strong>
                </a>
              </span>
            </li>
          </ul>
        </div>

        {/* Locations */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h4 className="font-poppins font-semibold mb-3">Visítenos en Paraguay</h4>

          <ul className="space-y-6 text-sm">
            {/* Sucursal Asunción */}
            <li className="flex flex-col items-left gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="text-thalys-gold" size={16} />
                <strong className="text-xl">Asunción</strong>
              </div>
              <div className="text-sm text-left leading-relaxed">
                Mcal. López 458 e/ Paí Perez y Perú
                <br />
                Tel:{" "}
                <a
                  href="tel:+59521205055"
                  className="hover:text-thalys-gold transition-colors"
                >
                  <strong>+595 21 20 50 55</strong>
                </a>
              </div>
            </li>

            {/* Sucursal CDE */}
            <li className="flex flex-col items-left gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="text-thalys-gold" size={16} />
                <strong className="text-xl">Ciudad del Este</strong>
              </div>
              <div className="text-sm text-left leading-relaxed">
                Avda. San Blás 851 – Shopping Rahal
                <br />
                Tel:{" "}
                <a
                  href="tel:+59561510830"
                  className="hover:text-thalys-gold transition-colors"
                >
                  <strong>+595 61 51 08 30</strong>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/30 py-6 text-center text-sm">
        © {new Date().getFullYear()} Thalys · Todos los derechos reservados
      </div>
    </footer>
  );
}
