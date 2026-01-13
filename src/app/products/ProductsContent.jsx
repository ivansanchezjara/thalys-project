"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsCarousel from "@/components/ui/ProductsCarousel";
import { SearchResults } from "./SearchResults";
import { AccordionSection } from "@/components/products/AccordionSection";
import { getProducts } from "@/lib/productsData";
import { normalizeText, toSlug } from "@/utils/textHelpers";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const productsData = getProducts();
  const totalProducts = productsData.length;

  const [openSection, setOpenSection] = useState("especialidades");

  // --- LÓGICA DE BÚSQUEDA PROFUNDA (CORREGIDA) ---
  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    const term = normalizeText(searchQuery);

    return productsData.filter((p) => {
      // 1. Match en datos principales
      const matchMain =
        normalizeText(p.name).includes(term) ||
        normalizeText(p.description).includes(term) ||
        normalizeText(p.generalCode).includes(term) ||
        (p.productCode && normalizeText(p.productCode).includes(term));

      // 2. Match en Variantes (Curetas rígidas, talles de guantes, etc.)
      const matchVariants = p.variants?.some(
        (v) =>
          normalizeText(v.variant).includes(term) ||
          normalizeText(v.productCode).includes(term)
      );

      // 3. Match en Tags (Palabras clave extra)
      const matchTags = p.tags?.some((tag) => normalizeText(tag).includes(term));

      return matchMain || matchVariants || matchTags;
    });
  }, [searchQuery, productsData]);

  // --- LÓGICA DE MAPEOS ---
  const categoriesMap = useMemo(() => {
    if (searchQuery) return {};
    const groups = {};
    productsData.forEach((p) => {
      const cat = p.categories || "Otros";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [searchQuery, productsData]);

  const specialtiesMap = useMemo(() => {
    if (searchQuery) return {};
    const groups = {};
    productsData.forEach((p) => {
      if (p.professionalAreas) {
        const areas = p.professionalAreas.split(",").map((a) => a.trim());
        areas.forEach((area) => {
          if (area === "General") return;
          if (!groups[area]) groups[area] = [];
          groups[area].push(p);
        });
      }
    });
    return groups;
  }, [searchQuery, productsData]);

  const getCategoryLink = (name) => `/products/${toSlug(name)}`;

  return (
    <main className="max-w-7xl mx-auto py-6 lg:py-16">
      {!searchQuery && (
        <header className="mb-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-thalys-blue">
            Nuestros <span className="text-thalys-red">Productos</span>
          </h1>

          {/* CONTADOR MINIMALISTA */}
          <div className="mt-3 flex items-center justify-center text-gray-500 font-medium bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
            <p className="text-xs font-medium uppercase tracking-wide">
              {totalProducts} productos disponibles
            </p>
          </div>
        </header>
      )}

      {searchQuery ? (
        <SearchResults
          results={filteredResults}
          searchQuery={searchQuery}
          activeCategory="Todos"
        />
      ) : (
        <div className="space-y-4 animate-fadeIn">
          {/* SECCIÓN ESPECIALIDADES */}
          <AccordionSection
            title="Explorar por Especialidad"
            subtitle="Instrumental específico para tu práctica."
            isOpen={openSection === "especialidades"}
            onToggle={() =>
              setOpenSection(
                openSection === "especialidades" ? null : "especialidades"
              )
            }
          >
            <div className="bg-gray-50 space-y-4">
              {Object.entries(specialtiesMap).map(([name, products]) => (
                <ProductsCarousel
                  key={name}
                  products={products}
                  title={name}
                  viewAllLink={getCategoryLink(name)}
                  pathPrefix={toSlug(name)}
                />
              ))}
            </div>
          </AccordionSection>

          {/* SECCIÓN CATEGORÍAS */}
          <AccordionSection
            title="Tipos de Productos"
            subtitle="Catálogo organizado por categorías técnicas."
            isOpen={openSection === "productos"}
            onToggle={() =>
              setOpenSection(openSection === "productos" ? null : "productos")
            }
          >
            <div className="space-y-4">
              {Object.entries(categoriesMap).map(([name, products]) => (
                <ProductsCarousel
                  key={name}
                  products={products}
                  title={name}
                  viewAllLink={getCategoryLink(name)}
                  pathPrefix={null}
                />
              ))}
            </div>
          </AccordionSection>
        </div>
      )}
    </main>
  );
}