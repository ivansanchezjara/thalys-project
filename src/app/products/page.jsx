import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export async function generateMetadata({ searchParams }) {
  // Safe handling for Next.js 13/14/15 compatibility
  const params = await searchParams; // In Next.js 15 this is required
  const query = params?.q;

  if (query) {
    return {
      title: `Resultados para "${query}" | Thalys`,
      description: `Mirá el instrumental de alta precisión que encontramos para "${query}" en el catálogo de Thalys.`,
    };
  }

  return {
    title: "Productos | Thalys Insumos Odontológicos",
    description:
      "Explora nuestros insumos odontológicos de alta precisión. Calidad premium para clínicas.",
  };
}

// --- COMPONENTE PRINCIPAL (Server Component) ---
export default function ProductsPage() {
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
      <ProductsContent />
    </Suspense>
  );
}
