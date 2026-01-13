import { useState, useMemo, useEffect } from "react";
import { capitalize } from "@/utils/textHelpers";

/**
 * Hook personalizado para manejar filtros de productos
 * Extrae subcategorías, áreas profesionales y atributos dinámicos
 * @param {Array} products - Array de productos a filtrar
 * @returns {Object} Estado y funciones de filtrado
 */
export function useProductFilters(products) {
  const [activeSubCategory, setActiveSubCategory] = useState("Todos");
  const [activeArea, setActiveArea] = useState("Todos");
  const [activeAttributes, setActiveAttributes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Extraer subcategorías únicas
  const subCategories = useMemo(() => {
    const subs = new Set(products.map((p) => p.subCategory).filter(Boolean));
    return ["Todos", ...Array.from(subs).sort()];
  }, [products]);

  // 2. Filtrar por subcategoría
  const filteredBySubCategory = useMemo(() => {
    if (activeSubCategory === "Todos") return products;
    return products.filter((p) => p.subCategory === activeSubCategory);
  }, [products, activeSubCategory]);

  // 3. Extraer áreas profesionales únicas
  const professionalAreas = useMemo(() => {
    const areas = new Set(
      filteredBySubCategory.map((p) => p.professionalAreas).filter(Boolean)
    );
    return ["Todos", ...Array.from(areas).sort()];
  }, [filteredBySubCategory]);

  // 4. Extraer atributos dinámicos
  const dynamicAttributes = useMemo(() => {
    const attrs = {};
    filteredBySubCategory.forEach((p) => {
      if (p.attributes) {
        Object.keys(p.attributes).forEach((key) => {
          if (!attrs[key]) attrs[key] = new Set();
          attrs[key].add(p.attributes[key]);
        });
      }
    });

    return Object.entries(attrs).map(([key, values]) => ({
      key,
      title: capitalize(key),
      options: ["Todos", ...Array.from(values).sort()],
    }));
  }, [filteredBySubCategory]);

  // 5. Aplicar todos los filtros
  const filteredProducts = useMemo(() => {
    let result = filteredBySubCategory;

    // Filtro por área profesional
    if (activeArea !== "Todos") {
      result = result.filter((p) => p.professionalAreas === activeArea);
    }

    // Filtro por atributos dinámicos
    Object.entries(activeAttributes).forEach(([key, value]) => {
      if (value !== "Todos") {
        result = result.filter(
          (p) => p.attributes && p.attributes[key] === value
        );
      }
    });

    // Ordenar alfabéticamente
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredBySubCategory, activeArea, activeAttributes]);

  // Reset página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSubCategory, activeArea, activeAttributes]);

  // Handlers
  const handleSubCategoryChange = (sub) => {
    setActiveSubCategory(sub);
    setActiveArea("Todos");
    setActiveAttributes({});
  };

  const handleAttributeChange = (key, value) => {
    setActiveAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setActiveSubCategory("Todos");
    setActiveArea("Todos");
    setActiveAttributes({});
  };

  return {
    // Estado
    activeSubCategory,
    activeArea,
    activeAttributes,
    currentPage,
    setCurrentPage,

    // Datos procesados
    subCategories,
    professionalAreas,
    dynamicAttributes,
    filteredProducts,

    // Handlers
    handleSubCategoryChange,
    setActiveArea,
    handleAttributeChange,
    clearAllFilters,
  };
}
