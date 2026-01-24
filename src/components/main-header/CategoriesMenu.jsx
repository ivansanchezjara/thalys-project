"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
    ChevronDown, ChevronRight,
    Grip, ShieldCheck, Scissors, Armchair,
    Syringe, Box, ScanFace, WandSparkles, BriefcaseMedical
} from "lucide-react";
import { toSlug } from "@/utils/textHelpers";

export default function CategoriesMenu({ mobile = false, onItemClick, productsData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const menuRef = useRef(null);

    // Cerrar al hacer click fuera (Desktop)
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (!mobile) setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mobile]);

    const toggleAccordion = (name) => {
        setActiveAccordion(activeAccordion === name ? null : name);
    };

    // --- NUEVA FUNCIÓN: Manejar click en enlace ---
    // Cierra el menú desplegable y notifica al padre (si es móvil)
    const handleLinkClick = () => {
        setIsOpen(false); // Cierra este menú (dropdown o acordeón)
        if (onItemClick) onItemClick(); // Cierra el drawer principal en móvil
    };

    // --- DATOS ---
    const specialties = useMemo(() => {
        const unique = new Set();
        productsData.forEach((p) => {
            if (p.professionalAreas) {
                p.professionalAreas.split(",").forEach((area) => {
                    const trimmed = area.trim();
                    if (trimmed !== "General") unique.add(trimmed);
                });
            }
        });
        return Array.from(unique).sort();
    }, [productsData]);

    const categoriesTree = useMemo(() => {
        const tree = {};
        productsData.forEach((p) => {
            const cat = p.categories || "Otros";
            const sub = p.subCategory;
            if (!tree[cat]) tree[cat] = new Set();
            if (sub) tree[cat].add(sub);
        });
        return Object.entries(tree).map(([category, subcategories]) => ({
            name: category,
            subs: Array.from(subcategories).sort()
        })).sort((a, b) => a.name.localeCompare(b.name));
    }, [productsData]);

    const getIcon = (name) => {
        const n = name.toLowerCase();
        if (n.includes("especialidad")) return <Grip size={18} className="text-gray-400" />;
        if (n.includes("bioseguridad")) return <ShieldCheck size={18} className="text-gray-400" />;
        if (n.includes("instrumental")) return <Scissors size={18} className="text-gray-400" />;
        if (n.includes("descart")) return <Box size={18} className="text-gray-400" />;
        if (n.includes("aneste")) return <Syringe size={18} className="text-gray-400" />;
        if (n.includes("sillon") || n.includes("cadeira")) return <Armchair size={18} className="text-gray-400" />;
        if (n.includes("moldagem") || n.includes("modelo")) return <ScanFace size={18} className="text-gray-400" />;
        if (n.includes("rotato")) return <WandSparkles size={18} className="text-gray-400" />;
        return <BriefcaseMedical size={18} className="text-gray-400" />;
    };

    // --- CONTENIDO DEL MENÚ (Lista Vertical) ---
    const MenuList = () => (
        <div className="flex flex-col w-full bg-white text-left select-none">

            {/* 1. Especialidades */}
            <div className="border-b border-gray-100 last:border-0">
                <button
                    onClick={(e) => { e.preventDefault(); toggleAccordion('Especialidades'); }}
                    className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        {getIcon("especialidad")}
                        <span className={`text-sm group-hover:text-thalys-blue transition-colors ${activeAccordion === 'Especialidades' ? "font-bold text-thalys-blue" : "font-medium text-gray-600"
                            }`}>
                            Especialidades
                        </span>
                    </div>
                    <ChevronDown
                        size={16}
                        className={`text-gray-300 transition-transform duration-200 ${activeAccordion === 'Especialidades' ? "rotate-180" : ""}`}
                    />
                </button>
                <div className={`overflow-hidden transition-all duration-300 bg-gray-50 ${activeAccordion === 'Especialidades' ? "max-h-[500px]" : "max-h-0"}`}>
                    <ul className="pl-12 pr-4 py-2 space-y-1">
                        {specialties.map((spec) => (
                            <li key={spec}>
                                <Link
                                    href={`/products/${toSlug(spec)}`}
                                    onClick={handleLinkClick} // <--- CAMBIO AQUÍ
                                    className="block py-2 text-sm text-gray-500 hover:text-thalys-blue hover:translate-x-1 transition-all"
                                >
                                    {spec}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 2. Categorías */}
            {categoriesTree.map((cat) => {
                const hasSubs = cat.subs.length > 0;
                const isExpanded = activeAccordion === cat.name;

                return (
                    <div key={cat.name} className="border-b border-gray-100 last:border-0">
                        {hasSubs ? (
                            <>
                                <button
                                    onClick={(e) => { e.preventDefault(); toggleAccordion(cat.name); }}
                                    className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        {getIcon(cat.name)}
                                        <span className={`text-sm group-hover:text-thalys-blue transition-colors ${isExpanded ? "font-bold text-thalys-blue" : "font-medium text-gray-600"
                                            }`}>
                                            {cat.name}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-300 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                    />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 bg-gray-50 ${isExpanded ? "max-h-[2500px]" : "max-h-0"}`}>
                                    <ul className="pl-12 pr-4 py-2 space-y-1">
                                        {cat.subs.map((sub) => (
                                            <li key={sub}>
                                                <Link
                                                    href={`/products/${toSlug(cat.name)}/${toSlug(sub)}`}
                                                    onClick={handleLinkClick} // <--- CAMBIO AQUÍ
                                                    className="block py-2 text-sm text-gray-500 hover:text-thalys-blue hover:translate-x-1 transition-all"
                                                >
                                                    {sub}
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link
                                                href={`/products/${toSlug(cat.name)}`}
                                                onClick={handleLinkClick} // <--- CAMBIO AQUÍ
                                                className="block py-2 text-xs font-bold text-thalys-blue tracking-wide"
                                            >
                                                Ver todo en {cat.name}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link
                                href={`/products/${toSlug(cat.name)}`}
                                onClick={handleLinkClick} // <--- CAMBIO AQUÍ
                                className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    {getIcon(cat.name)}
                                    <span className="text-gray-600 font-medium text-sm group-hover:text-thalys-blue transition-colors">{cat.name}</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-300 group-hover:text-thalys-blue" />
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );

    // --- RENDERIZADO MÓVIL ---
    if (mobile) {
        return (
            <div className="w-full select-none bg-white">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full p-4 rounded-2xl text-xl font-poppins transition-colors flex items-center justify-between ${isOpen ? "bg-gray-50 text-thalys-blue font-bold" : "text-gray-600 font-medium"
                        }`}
                >
                    <span>Productos</span>
                    <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="mt-2 border-l-2 border-gray-100 ml-4">
                        <MenuList />
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDERIZADO DESKTOP ---
    return (
        <div className="relative h-full flex items-center" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex items-center gap-1 h-full transition-colors font-medium cursor-pointer ${isOpen ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                    }`}
            >
                <span>Productos</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
                {isOpen && (
                    <span className="absolute bottom-[-13px] left-0 w-full h-0.5 bg-gray-900" />
                )}
            </button>

            {/* Dropdown Flotante */}
            <div
                className={`absolute top-full left-0 mt-4 w-80 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-200 origin-top-left 
                ${isOpen ? "opacity-100 scale-100 visible translate-y-2" : "opacity-0 scale-95 invisible translate-y-0"}
                
                /* EL TRIÁNGULO */
                before:content-[''] 
                before:absolute 
                before:-top-2 
                before:left-6 
                before:w-4 
                before:h-4 
                before:bg-white 
                before:rotate-45 
                before:border-l 
                before:border-t 
                before:border-gray-100
            `}
            >
                <div className="relative z-10 max-h-[600px] overflow-y-auto custom-scrollbar rounded-xl">
                    <MenuList />
                </div>
            </div>
        </div>
    );
}