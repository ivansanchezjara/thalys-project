"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Activity, Award, Microscope } from "lucide-react";
import Image from "next/image";

export default function DiamondTech() {
    return (
        <section className="w-full bg-white pt-10 ">
            <div className=" mx-auto">

                {/* --- HEADER PRINCIPAL --- */}
                <div className="flex flex-col items-center text-center mb-10 max-w-5xl mx-auto px-4">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-7xl font-bold text-[#A61E2E] mb-4"
                    >
                        60%
                        <span className="text-3xl md:text-4xl block md:inline text-gray-800 font-semibold uppercase tracking-tight md:ml-4">
                            Exposición de Diamante
                        </span>
                    </motion.h2>


                    <p className="text-[#1A2B45] text-lg md:text-xl font-bold tracking-[0.2em] uppercase mr-[-0.2em]">
                        Superioridad a través de Tecnología
                    </p>


                    <div className="h-1.5 w-32 bg-[#A61E2E] rounded-full mt-6" />

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

                    {/* 1. IMAGEN MICROSCÓPICA (La prueba real) */}
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group isolate">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                                src="/rotatorios/microscopic-burs.png"
                                alt="Microscopía electrónica de fresa Thalys"
                                fill
                                className="object-fill opacity-90 transition-transform duration-[2s] ease-out scale-105 group-hover:scale-110"
                            />

                            {/* ESCÁNER: Usa thalys-red con opacidad */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-thalys-red/20 to-transparent z-10"
                                initial={{ top: "-20%" }}
                                animate={{ top: "120%" }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 1
                                }}
                            />

                            {/* RETÍCULA CENTRAL */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity">
                                <div className="w-[1px] h-8 bg-thalys-red/80"></div>
                                <div className="h-[1px] w-8 bg-thalys-red/80 absolute"></div>
                            </div>

                            {/* ESQUINAS DE ENCUADRE */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-thalys-red/60 rounded-tl-sm"></div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-thalys-red/60 rounded-tr-sm"></div>
                            <div className="absolute bottom-24 left-4 w-4 h-4 border-b-2 border-l-2 border-thalys-red/60 rounded-bl-sm"></div>
                            <div className="absolute bottom-24 right-4 w-4 h-4 border-b-2 border-r-2 border-thalys-red/60 rounded-br-sm"></div>

                            {/* DATOS INFERIORES */}
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-6 pt-16 z-20">

                                <div className="flex items-center gap-2 mb-2">
                                    <motion.div
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="p-1.5 bg-thalys-red/20 rounded-full border border-thalys-red/40"
                                    >
                                        <Microscope className="text-thalys-red" size={14} />
                                    </motion.div>
                                    <span className="text-white/100 font-mono text-[10px] font-bold uppercase tracking-[0.2em] shadow-thalys-red/50 drop-shadow-sm">
                                        SEM Analysis <span className="text-white/30 mx-1">|</span> LIVE
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-3 text-[10px] font-mono text-white/80">
                                    <div className="group/item">
                                        <span className="block text-thalys-red/100 text-[9px] uppercase tracking-wider mb-0.5 group-hover/item:text-thalys-red transition-colors">Mag</span>
                                        214 X
                                    </div>
                                    <div className="group/item">
                                        <span className="block text-thalys-red/100 text-[9px] uppercase tracking-wider mb-0.5 group-hover/item:text-thalys-red transition-colors">WD</span>
                                        4.1 mm
                                    </div>
                                    <div className="group/item">
                                        <span className="block text-thalys-red/100 text-[9px] uppercase tracking-wider mb-0.5 group-hover/item:text-thalys-red transition-colors">Signal</span>
                                        SE2
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* --- BLOQUE IZQUIERDO: ICEBERG (PROPORCIONAL) --- */}

                    <div className="relative bg-gradient-to-b from-[#1A2B45] min-h-[300px] to-[#0D1624] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden w-full aspect-[4/3] group flex flex-col">

                        {/* 1. FONDO: SVG Brillante */}
                        <div className="absolute inset-0 z-0 bottom-5">
                            <Image
                                src="/rotatorios/iceberg.svg"
                                alt="Gráfico Iceberg Background"
                                fill
                                // Mantenemos object-contain para asegurar el ancho total del dibujo
                                className="object-contain object-bottom opacity-100 transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>

                        {/* 2. CONTENIDO */}
                        <div className="relative z-10 flex-grow flex flex-col justify-between p-3 md:p-6">

                            {/* Título */}
                            <div className="text-center">
                                <h3 className="text-white text-xl sm:text-3xl md:text-3xl font-bold italic">
                                    Más Diamante por Diamante
                                </h3>
                            </div>

                            {/* 3. DATOS NUMÉRICOS */}
                            <div className="mt-auto bg-white/5 rounded-2xl p-2 sm:p-4 md:p-6 border border-white/10 backdrop-blur-md shadow-2xl">
                                <div className="flex justify-between items-center relative">

                                    {/* Lado Thalys - CYAN */}
                                    <div className="text-center w-1/2 border-r border-white/10 pr-2">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {/* CAMBIO: text-5xl en móvil. Mucho más grande y legible. */}
                                            <span className="block text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 to-white drop-shadow-sm">
                                                60%
                                            </span>
                                            {/* CAMBIO: text-xs (12px) en móvil. Antes era 7px. */}
                                            <p className="text-cyan-400 text-xs md:text-sm font-bold uppercase tracking-widest mt-1">
                                                Thalys MDT
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* VS - Cyan */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D1624] p-2 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] z-20">
                                        {/* CAMBIO: text-xs en móvil */}
                                        <span className="text-white font-black italic text-xs md:text-sm">VS</span>
                                    </div>

                                    {/* Lado Competencia */}
                                    <div className="text-center w-1/2 pl-2">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {/* CAMBIO: text-4xl en móvil. Grande, pero un paso menor que el ganador (Thalys). */}
                                            <span className="block text-4xl md:text-5xl font-bold text-gray-200">
                                                35%
                                            </span>
                                            {/* CAMBIO: text-xs en móvil. */}
                                            <p className="text-gray-200 text-xs md:text-sm font-bold uppercase tracking-widest mt-1">
                                                Otras Fresas
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Footer Text */}

                                <p className="text-center text-white text-[8px] md:text-xs mt-3 md:mt-4 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                                    Exposición de cristal medida bajo microscopía
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-8 lg:col-span-2 w-full max-w-4xl mx-auto mt-8">
                        <div className="bg-gray-20 p-8 rounded-[2.5rem] border-l-8 border-[#A61E2E] h-full shadow-sm">

                            {/* Logo / Título SafeShank */}
                            <div className="flex items-start gap-5 mb-6">
                                <div className="p-4 bg-white rounded-2xl shadow-md text-[#A61E2E]">
                                    <ShieldCheck size={40} />
                                </div>
                                <div>
                                    <h4 className="text-3xl font-black text-[#1A2B45] leading-none mb-1">
                                        SAFESHANK<sup className="text-lg">®</sup>
                                    </h4>
                                    <p className="text-left text-sm text-gray-500 font-medium uppercase tracking-wide">
                                        Estándar de Seguridad
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-left text-gray-700 text-base leading-relaxed">
                                    El corazón de nuestras fresas. Vástagos de acero inoxidable endurecido fabricados con precisión suiza para proteger la vida útil de tu turbina.
                                </p>

                                {/* Métricas Críticas (Del PDF) */}
                                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm grid grid-cols-2 gap-6">
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Diámetro Exacto</span>
                                        <span className="text-[#1A2B45] font-mono text-2xl font-bold">1.597<span className="text-sm text-gray-400 ml-1">mm</span></span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Tolerancia ISO</span>
                                        <span className="text-[#A61E2E] font-mono text-xl font-bold">+0.001</span>
                                        <span className="block text-gray-400 text-xs font-mono">-0.005 mm</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 my-6"></div>

                                {/* Listas de Características y Beneficios */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h5 className="text-[#A61E2E] font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                            <Activity size={16} /> Características
                                        </h5>
                                        <ul className="text-sm text-gray-600 space-y-3 font-medium">
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#A61E2E] mt-1">•</span>
                                                Mayor resistencia de adhesión.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#A61E2E] mt-1">•</span>
                                                Exposición optimizada de cada cristal.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#A61E2E] mt-1">•</span>
                                                Recubrimiento uniforme 360°.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <h5 className="text-cyan-700 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                            <Zap size={16} /> Beneficios
                                        </h5>
                                        <ul className="text-sm text-gray-600 space-y-3 font-medium">
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-600 mt-1">•</span>
                                                Corte más rápido y frío.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-600 mt-1">•</span>
                                                Vida útil prolongada.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-600 mt-1">•</span>
                                                Menor obstrucción (clogging).
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}