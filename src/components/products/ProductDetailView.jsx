"use client";
import Link from "next/link";
import { MessageCircle, Tag, ShieldCheck, Truck } from "lucide-react";
import AddToCartSingle from "@/app/products/[...slug]/addToCartSingle"; // Ajusta la ruta si mueves addToCartSingle
import ProductImageGallery from "@/components/ui/ProductImageGallery";
import { THALYS_IMAGES_URL } from "@/assets/constants";

export default function ProductDetailView({ product, selectedVariant, segments }) {
    // --- Lógica Visual y de Datos ---
    const isSelectionIncomplete = product.variants && product.variants.length > 0 && !selectedVariant;
    const currentProductCode = selectedVariant ? selectedVariant.productCode : product.productCode;
    const currentVariantName = selectedVariant ? selectedVariant.variant : null;

    // Cálculo del Path Prefix para Breadcrumbs correctos
    const pathPrefix = segments.slice(0, -1).join('/');

    const whatsappMessage = `¡Hola Thalys! Me interesa información sobre: ${product.name}${currentVariantName
        ? ` - ${product.variantType || "Opción"}: ${currentVariantName}`
        : ""
        } (Código: ${currentProductCode})`;

    const images = selectedVariant?.image && selectedVariant.image.length > 0
        ? selectedVariant.image
        : Array.isArray(product.image) ? product.image : [product.image];

    return (
        <main className="max-w-7xl mx-auto px-6 py-6 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-12 lg:gap-24">

                <ProductImageGallery
                    images={images}
                    displayName={product.name}
                    thalysImagesUrl={THALYS_IMAGES_URL}
                />

                <div className="flex flex-col justify-center">
                    {/* Header con Categoría y Código */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 text-left">
                        <div className="flex items-center flex-wrap gap-2">
                            <span className="text-thalys-gold text-[12px] font-bold uppercase tracking-[0.2em]">
                                {product.categories || "General"}
                            </span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500 text-[12px] font-medium uppercase tracking-wider">
                                {product.professionalAreas || "Uso General"}
                            </span>
                        </div>
                        <span className="w-fit bg-gray-100 text-gray-400 text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                            {isSelectionIncomplete ? "Seleccionar variante" : `#${currentProductCode}`}
                        </span>
                    </div>

                    {/* Título */}
                    <h1 className="text-left text-3xl lg:text-5xl font-bold text-thalys-blue mb-6 leading-[1.1]">
                        {product.name}
                        {currentVariantName && <span className="text-thalys-red ml-2">({currentVariantName})</span>}
                    </h1>

                    {/* Descripción */}
                    <div className="mb-6 text-left">
                        <h2 className="text-[10px] font-bold text-thalys-blue/40 uppercase tracking-widest mb-3">Descripción Técnica</h2>
                        <p className="text-base text-left lg:text-lg text-thalys-text leading-relaxed font-light">{product.longDescription}</p>
                    </div>

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {product.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-[9px] rounded-lg border border-gray-200 uppercase">
                                    <Tag size={10} className="text-gray-400" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Selector de Variantes */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-8 text-left">
                            <h2 className="text-[10px] font-bold text-thalys-red uppercase tracking-widest mb-3">Seleccionar {product.variantType || "Opción"}</h2>
                            <div className="flex flex-wrap gap-2">
                                {product.variants.map((v) => (
                                    <Link
                                        key={v.productCode}
                                        href={pathPrefix ? `/products/${pathPrefix}/${product.slug}-${v.subSlug}` : `/products/${product.slug}-${v.subSlug}`}
                                        scroll={false}
                                        className={`px-4 py-2 rounded-xl border-2 font-bold text-xs transition-all ${selectedVariant?.subSlug === v.subSlug ? "border-thalys-blue bg-thalys-blue text-white shadow-md scale-105" : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"}`}
                                    >
                                        {v.variant}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Precio y Disponibilidad */}
                    <div className="flex items-center gap-4 mb-10 text-left">
                        <div className="flex flex-col">
                            <span className="text-2xl lg:text-3xl font-bold text-gray-900 leading-none">Precio a consultar</span>
                            <span className="text-xs text-thalys-red font-medium mt-1">Consulta por disponibilidad</span>
                        </div>
                    </div>

                    {/* Garantía y Envío */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                            <ShieldCheck className="text-thalys-red" size={20} />
                            <div className="flex flex-col text-xs font-bold text-thalys-blue uppercase text-left">Garantía {product.brand}<span className="text-[10px] text-gray-400 font-normal italic">Original Certificado</span></div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                            <Truck className="text-thalys-red" size={20} />
                            <div className="flex flex-col text-xs font-bold text-thalys-blue uppercase text-left">Envío Nacional<span className="text-[10px] text-gray-400 font-normal italic">Todo el territorio</span></div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-row gap-3 w-full items-center">
                        <AddToCartSingle
                            disabled={isSelectionIncomplete}
                            product={{ ...product, productCode: currentProductCode, variant: currentVariantName, slug: segments }}
                        />
                        <Link
                            href={`https://api.whatsapp.com/send?phone=595983188000&text=${encodeURIComponent(whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-0 h-14 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#128C7E] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 px-2"
                        >
                            <MessageCircle size={18} fill="currentColor" />
                            <span className="text-[13px] md:text-base truncate">WhatsApp</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}