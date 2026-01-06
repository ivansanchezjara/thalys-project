import Footer from "@/components/footer/footer";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
// 1. Importamos el componente del Portal (ajusta la ruta según tu carpeta)
import SideCart from "@/components/cart/SideCart";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: {
    template: "%s | Thalys",
    default: "Thalys | Insumos Odontológicos",
  },
  description:
    "Equipamiento y herramientas de alta precisión para profesionales de la salud dental en Paraguay.",
  openGraph: {
    title: "Thalys | Insumos Odontológicos",
    description: "Calidad premium para tu clínica.",
    images: ["/logo-Thalys.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased scroll-smooth">
        <CartProvider>
          <SideCart />
          <MainHeader />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
