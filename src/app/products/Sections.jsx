import ProductsCarousel from "@/components/ui/ProductsCarousel";
import { AccordionSection } from "@/components/products/AccordionSection";
import { useState } from "react"
import { useMemo } from "react";
import { toSlug } from "@/utils/textHelpers";

export default function Sections({ productsData }) {

    const [openSection, setOpenSection] = useState(null);

    // --- LÓGICA DE MAPEOS ---
    const categoriesMap = useMemo(() => {
        const groups = {};
        productsData.forEach((p) => {
            const cat = p.categories || "Otros";
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(p);
        });
        return groups;
    }, [productsData]);

    const specialtiesMap = useMemo(() => {
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
    }, [productsData]);

    const getCategoryLink = (name) => `/products/${toSlug(name)}`;

    return (
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
    );
}