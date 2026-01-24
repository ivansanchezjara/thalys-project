import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { capitalize } from "@/utils/textHelpers";

/**
 * Hook personalizado para manejar filtros de productos usando URL parameters
 * @param {Array} products - Array de productos a filtrar
 * @returns {Object} Estado y funciones de filtrado
 */
export function useProductFilters(products) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper para actualizar URL
  const updateUrl = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "Todos") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Resetear a página 1 si cambian los filtros (cualquier cambio que no sea 'page')
    const isFilterChange = Object.keys(updates).some((k) => k !== "page");
    if (isFilterChange) {
      params.delete("page");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 1. Leer estado desde URL
  const activeSubCategory = searchParams.get("subCategory") || "Todos";
  const activeArea = searchParams.get("area") || "Todos";
  const currentPage = Number(searchParams.get("page")) || 1;

  // Reconstruir activeAttributes desde URL (cualquier param que no sea system reserved)
  const activeAttributes = useMemo(() => {
    const reservedParams = ["subCategory", "area", "page", "query"];
    const attrs = {};
    searchParams.forEach((value, key) => {
      if (!reservedParams.includes(key)) {
        attrs[key] = value;
      }
    });
    return attrs;
  }, [searchParams]);

  // 2. Extraer subcategorías únicas
  const subCategories = useMemo(() => {
    const subs = new Set(products.map((p) => p.subCategory).filter(Boolean));
    return ["Todos", ...Array.from(subs).sort()];
  }, [products]);

  // 3. Filtrar por subcategoría
  const filteredBySubCategory = useMemo(() => {
    if (activeSubCategory === "Todos") return products;
    return products.filter((p) => p.subCategory === activeSubCategory);
  }, [products, activeSubCategory]);

  // 4. Extraer áreas profesionales únicas
  const professionalAreas = useMemo(() => {
    const areas = new Set(
      filteredBySubCategory.map((p) => p.professionalAreas).filter(Boolean),
    );
    return ["Todos", ...Array.from(areas).sort()];
  }, [filteredBySubCategory]);

  // 5. Extraer atributos dinámicos
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

  // 6. Aplicar todos los filtros
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
          (p) => p.attributes && p.attributes[key] === value,
        );
      }
    });

    // Ordenar alfabéticamente
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredBySubCategory, activeArea, activeAttributes]);

  // Handlers
  const handleSubCategoryChange = (sub) => {
    // Al cambiar subcategoría, limpiamos área y atributos
    // Nota: updateUrl ya maneja el reset de página
    const params = new URLSearchParams(searchParams.toString());

    // Limpiar atributos dinámicos actuales
    Array.from(params.keys()).forEach((key) => {
      if (!["subCategory", "area", "page", "query"].includes(key)) {
        params.delete(key);
      }
    });

    // Preparar updates
    const updates = {
      subCategory: sub === "Todos" ? null : sub,
      area: null, // Reset area
    };

    // Para limpiar atributos extra que no están en updates explicitamente
    // necesitamos hacerlo manualmente o re-pensar updateUrl.
    // Simplificación: usaremos router.replace con un nuevo objeto de params limpio
    // para este caso específico de cambio mayor.

    const newParams = new URLSearchParams();
    if (sub !== "Todos") newParams.set("subCategory", sub);
    // Preservar query si existe (para búsquedas) aunque este hook se usa principalmente en categorías
    if (searchParams.get("query"))
      newParams.set("query", searchParams.get("query"));

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const setActiveArea = (area) => {
    updateUrl({ area: area === "Todos" ? null : area });
  };

  const handleAttributeChange = (key, value) => {
    updateUrl({ [key]: value === "Todos" ? null : value });
  };

  const setCurrentPage = (page) => {
    updateUrl({ page: page.toString() });
  };

  const clearAllFilters = () => {
    // Mantener query si existe
    const query = searchParams.get("query");
    const newParams = new URLSearchParams();
    if (query) newParams.set("query", query);

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
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
