"use client";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AccordionSection = ({
    title,
    subtitle,
    isOpen,
    onToggle,
    children
}) => {
    return (
        <section className="bg-white border-b border-gray-50 shadow-sm">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 lg:p-8 text-left bg-white hover:bg-gray-50 transition-colors"
            >
                <div className="flex flex-col">
                    <h2 className="text-xl lg:text-2xl font-poppins text-thalys-blue tracking-wider flex items-center gap-2">
                        {title}
                    </h2>
                    {subtitle && <p className="text-gray-500 text-left text-xs mt-1">{subtitle}</p>}
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={28} className="text-gray-300" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="bg-gray-50 pb-8">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};