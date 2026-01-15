import { Suspense } from "react";
import ProductsContent from "./ProductsContent";
import { getProducts } from "@/lib/productsData";

export async function generateMetadata({ searchParams }) {
  // Safe handling for Next.js 13/14/15 compatibility
  const params = await searchParams;
  const query = params?.q;

  if (query) {
    return {
      title: `Resultados para "${query}"`,
      description: `Mirá los productos que encontramos para "${query}" en el catálogo de Thalys.`,
      openGraph: {
        images: ["/logo_Thalys_OP.jpg"],
      }
    };
  }

  return {
    title: "Catálogo de Productos",
    description:
      "Explora todos nuestros productos. Eleva tu clínica al siguiente nivel.",
    openGraph: {
      images: ["/logo_Thalys_OP.jpg"],
    },
  };
}

// --- COMPONENTE PRINCIPAL (Server Component) ---
export default function ProductsPage() {
  const productsData = getProducts();
  return (
    <Suspense
      fallback={
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
          <div className="w-8 h-8 border-2 border-thalys-blue/20 border-t-thalys-blue rounded-full animate-spin" />
          <p className="font-poppins text-xs font-bold text-thalys-blue/40 uppercase tracking-widest">
            Cargando Catálogo...
          </p>
        </div>
      }
    >
      <ProductsContent initialProducts={productsData} />
    </Suspense>
  );
}
