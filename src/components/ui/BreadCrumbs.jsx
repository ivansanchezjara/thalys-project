"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { getProducts } from "@/lib/productsData";
import { CATEGORIES } from "@/config/categories";
import { toSlug } from "@/utils/textHelpers";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const productsData = getProducts();

  // Si estamos en la home, no mostramos breadcrumbs
  if (pathname === "/") return null;

  // Separamos la URL en partes (ej: "products/cirugia/bisturi/slug")
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Mapa para traducir nombres de rutas a español bonito
  const routeNames = {
    products: "Productos",
    instrumentales: "Instrumentales",
    bioseguridad: "Bioseguridad",
    destacados: "Destacados",
    checkout: "Finalizar Compra",
    about: "Sobre Nosotros",
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full pt-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center text-sm text-gray-500">
        {/* Link al Home */}
        <Link
          href="/"
          className="flex items-center hover:text-thalys-blue transition-colors shrink-0"
        >
          <Home size={16} className="mr-1" />
          Inicio
        </Link>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

          // 1. ¿Es un Producto o Variante?
          const productMatch = productsData.find(
            (p) =>
              p.slug === segment ||
              p.variants?.some(v => `${p.slug}-${v.subSlug}` === segment)
          );

          // 2. ¿Es una Categoría principal en el config?
          const categoryMatch = CATEGORIES[segment];

          // 3. ¿Es una Especialidad (Professional Area)?
          // Buscamos en todos los productos si el slug del segmento coincide con alguna especialidad
          const allSpecialties = Array.from(new Set(productsData.flatMap(p =>
            p.professionalAreas?.split(',').map(a => a.trim()) || []
          )));
          const specialtyMatch = allSpecialties.find(s => toSlug(s) === segment);

          // 4. ¿Es una Subcategoría?
          const subCategoryMatch = !productMatch && !categoryMatch && !specialtyMatch ?
            productsData.find(p => toSlug(p.subCategory || "") === segment)?.subCategory : null;

          // DETERMINACIÓN DEL NOMBRE
          let name;

          if (productMatch) {
            // Si es variante, intentamos mostrar el nombre específico
            const variant = productMatch.variants?.find(v => `${productMatch.slug}-${v.subSlug}` === segment);
            name = variant ? `${productMatch.name} (${variant.variant})` : productMatch.name;
          } else if (categoryMatch) {
            name = typeof categoryMatch.name === 'string' ? categoryMatch.name : (categoryMatch.metadata?.title?.split('|')[0].trim() || segment);
          } else if (specialtyMatch) {
            name = specialtyMatch; // Ej: "Cirugía"
          } else if (subCategoryMatch) {
            name = subCategoryMatch;
          } else {
            name = routeNames[segment] || segment.replace(/-/g, " ");
            if (!routeNames[segment]) {
              name = name.charAt(0).toUpperCase() + name.slice(1);
            }
          }

          const isLast = index === pathSegments.length - 1;

          return (
            <div key={href} className="flex items-center">
              <ChevronRight size={14} className="mx-2 text-gray-400 shrink-0" />

              {isLast ? (
                <span className="font-medium text-thalys-blue truncate max-w-[200px] md:max-w-xs">
                  {name}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-thalys-blue transition-colors"
                >
                  {name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}