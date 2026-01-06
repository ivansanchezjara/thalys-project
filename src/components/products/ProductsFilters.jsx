import productsData from "@/assets/THALYS.json";

export const ProductFilters = ({
  activeCategory,
  setActiveCategory,
  activeArea,
  setActiveArea,
}) => {
  // Extraemos categorías dinámicas
  const dynamicCategories = [
    "Todos",
    ...new Set(productsData.map((p) => p.categories).filter(Boolean)),
  ];

  // Extraemos áreas profesionales dinámicas
  const dynamicAreas = [
    "Todos",
    ...new Set(productsData.map((p) => p.professionalAreas).filter(Boolean)),
  ];

  return (
    <div className="flex flex-col gap-8 mb-12">
      {/* Bloque de Categorías */}
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-thalys-blue text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bloque de Especialidades (professionalAreas) */}
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start border-t border-gray-100 pt-6">
        {dynamicAreas.map((area) => (
          <button
            key={area}
            onClick={() => setActiveArea(area)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeArea === area
                ? "bg-thalys-red text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {area}
          </button>
        ))}
      </div>
    </div>
  );
};
