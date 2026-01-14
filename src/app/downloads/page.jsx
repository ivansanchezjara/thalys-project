import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const metadata = {
    title: "Catálogos y Descargas",
    description: "Descarga nuestros catálogos completos de instrumental, rotatorios e insumos en PDF.",
    openGraph: {
        title: "Catálogos Thalys | Descargas",
        description: "Accede a la lista completa de precios y productos.",
        images: ["/logo_Thalys.png"],
    },
};

const catalogs = [
    {
        id: "instrumental",
        title: "Instrumentales",
        description: "Catálogo de nuestra línea completa de instrumentales.",
        link: "https://drive.google.com/file/d/1kQKxldDf4uLbW0hmAOChrVGpE9zizr_p/view?usp=drive_link",
        color: "bg-blue-50 text-blue-600",
    },
    {
        id: "rotatorios",
        title: "Rotatorios y Fresas",
        description: "Catálogo técnico de fresas de diamante, carburo y pulidores de alta precisión.",
        link: "https://drive.google.com/file/d/1jfXGflibQdAVM8mN90NO7L9LV0OE2rg_/view?usp=sharing",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        id: "piezas-mano",
        title: "Piezas de Mano",
        description: "Turbinas, contra-ángulos y micromotores. Tecnología y ergonomía para tu clínica.",
        link: "https://drive.google.com/file/d/1DuaCmRYOIDqMgZzScSWPQqwi9TfIo4vh/view?usp=drive_link",
        color: "bg-purple-50 text-purple-600",
    },
];

export default function DownloadsPage() {
    return (
        <div className="bg-white min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* ENCABEZADO */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-poppins font-bold text-thalys-blue mb-4">
                        Catálogos <span className="text-thalys-red">Digitales</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Descarga nuestros catálogos actualizados en formato PDF para consultar
                        nuestros productos, códigos y especificaciones técnicas cómodamente
                        desde tu dispositivo.
                    </p>
                </div>

                {/* GRILLA DE CATÁLOGOS */}
                <div className="grid gap-8 md:grid-cols-3">
                    {catalogs.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Barra de color superior */}
                            <div
                                className={`h-2 w-full ${item.color
                                    .split(" ")[0]
                                    .replace("-50", "-500")}`}
                            />

                            {/* CAMBIOS AQUÍ: 
                  Agregué 'items-center' y 'text-center' para centrar todo el contenido 
              */}
                            <div className="p-6 flex flex-col flex-grow items-center text-center">

                                {/* Icono PDF */}
                                <div
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                        />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-thalys-blue transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-sm mb-6 flex-grow">
                                    {item.description}
                                </p>

                                {/* Usamos <a> para links externos */}
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 text-gray-700 font-medium rounded-lg group-hover:bg-thalys-blue group-hover:text-white transition-all duration-300"
                                >
                                    <span>Ver PDF</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- BOTÓN DE WHATSAPP --- */}
                <div className="mt-16 flex flex-col items-center justify-center gap-4">
                    <p className="text-sm text-gray-400">
                        ¿Necesitas ayuda con algún código?
                    </p>

                    <a
                        /* 👇 REEMPLAZA EL NÚMERO AQUÍ */
                        href="https://wa.me/5959983188000?text=Hola%20Thalys,%20estaba%20viendo%20los%20catálogos%20y%20tengo%20una%20consulta."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto md:px-12 bg-[#25D366] hover:bg-[#1fae53] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-500/10"
                    >
                        <MessageCircle fill="currentColor" size={20} />
                        <span className="text-base">Consultar por WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
}