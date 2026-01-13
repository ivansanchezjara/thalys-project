import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { useState } from "react";

export default function ProductsFilters({ filterGroups, clearAll }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-thalys-blue font-semibold text-sm hover:bg-gray-50 transition-all mb-4"
      >
        <Filter size={16} />
        {isOpen ? "Ocultar" : "Filtrar"}
      </button>

      {isOpen && (
        <aside className="w-full flex flex-col gap-6 pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pb-0 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-thalys-blue">Filtros Activos</h3>
            {clearAll && (
              <button
                onClick={clearAll}
                className="text-xs text-thalys-red hover:underline font-medium"
              >
                Borrar todo
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {filterGroups.map((group, index) => (
              <FilterGroup key={index} group={group} />
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}

function FilterGroup({ group }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!group.options || group.options.length <= 1) return null;

  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 group"
      >
        <span className="text-sm font-bold text-gray-700 uppercase tracking-wider group-hover:text-thalys-blue transition-colors">
          {group.title}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col gap-2 mt-2 animate-in slide-in-from-top-2 duration-200">
          {group.options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer group/item"
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${group.active === option
                  ? "border-thalys-blue bg-thalys-blue"
                  : "border-gray-300 bg-white group-hover/item:border-thalys-blue"
                  }`}
                onClick={() => group.setActive(option)}
              >
                {group.active === option && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
              <span
                className={`text-sm ${group.active === option
                  ? "text-thalys-blue font-medium"
                  : "text-gray-600 group-hover/item:text-gray-900"
                  }`}
                onClick={() => group.setActive(option)}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}