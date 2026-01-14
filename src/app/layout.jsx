import Footer from "@/components/footer/footer";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import SideCart from "@/components/cart/SideCart";
import { CartProvider } from "./context/CartContext";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { getProducts } from "@/lib/productsData";

export const metadata = {

  metadataBase: new URL("https://main.dnxy71hbjzz8y.amplifyapp.com/"),

  title: {
    template: "%s | Thalys",
    default: "Thalys | Insumos Odontológicos",
  },
  description:
    "Equipamiento y herramientas de alta precisión para profesionales de la salud dental en Paraguay.",
  openGraph: {
    title: "Thalys | Insumos Odontológicos",
    description: "Calidad premium para tu clínica.",
    images: ["/logo_Thalys.png"],
    type: "website",
    locale: "es_PY",
  },
};

export default function RootLayout({ children }) {

  const productsData = getProducts();

  return (
    <html lang="es">
      <body className="antialiased scroll-smooth" suppressHydrationWarning>
        <CartProvider>
          <SideCart />
          <MainHeader productsData={productsData} />
          <Breadcrumbs productsData={productsData} />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
