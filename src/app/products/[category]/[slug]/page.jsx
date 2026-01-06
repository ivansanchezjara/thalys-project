import productsData from "@/assets/THALYS.json";
import { ShieldCheck, Truck, Tag, MessageCircle } from "lucide-react"; // Asegúrate de que el import de Tag esté presente
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartSingle from "./addToCartSingle";
import { THALYS_IMAGES_URL } from "@/assets/constants";
import ProductImageGallery from "@/components/ui/ProductImageGallery";

function findProductAndVariant(slug) {
  for (const item of productsData) {
    if (item.slug === slug) return { product: item, selectedVariant: null };

    if (item.variants && slug.startsWith(item.slug)) {
      const sub = slug.replace(`${item.slug}-`, "");
      const v = item.variants.find((v) => v.subSlug === sub);
      if (v) return { product: item, selectedVariant: v };
    }
  }
  return { product: null, selectedVariant: null };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product, selectedVariant } = findProductAndVariant(slug);
  if (!product) return { title: "Producto no encontrado | Thalys" };

  const displayName = selectedVariant
    ? `${product.name} (${selectedVariant.variant})`
    : product.name;

  const mainImg = Array.isArray(product.image)
    ? product.image[0]
    : product.image;
  const displayImage = `${THALYS_IMAGES_URL}${mainImg}`;

  return {
    title: `${displayName} | Thalys`,
    description: product.longDescription,
    openGraph: {
      title: `${displayName} | Thalys`,
      description: product.longDescription,
      images: [
        { url: displayImage, width: 800, height: 800, alt: displayName },
      ],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { product, selectedVariant } = findProductAndVariant(slug);

  if (!product) notFound();

  const needsVariant = product?.variants && product.variants.length > 0;
  const isSelectionIncomplete = needsVariant && !selectedVariant;

  const currentProductCode = selectedVariant
    ? selectedVariant.productCode
    : product.productCode;
  const currentVariantName = selectedVariant ? selectedVariant.variant : null;
  const displayName = product.name;

  const whatsappMessage = `¡Hola Thalys! Me interesa información sobre: ${displayName}${
    currentVariantName
      ? ` - ${product.variantType || "Opción"}: ${currentVariantName}`
      : ""
  } (Código: ${currentProductCode})`;

  const images =
    selectedVariant?.image && selectedVariant.image.length > 0
      ? selectedVariant.image
      : Array.isArray(product.image)
      ? product.image
      : [product.image];

  const galleryAlt = selectedVariant
    ? `${product.name} - ${selectedVariant.variant}`
    : product.name;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <nav className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs md:text-sm font-medium mb-8 text-gray-500">
        <Link
          href="/"
          className="hover:text-thalys-red transition-colors shrink-0"
        >
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          href="/products"
          className="hover:text-thalys-red transition-colors shrink-0"
        >
          Productos
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-thalys-blue font-bold truncate flex-1 sm:flex-none">
          {displayName}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <ProductImageGallery
          images={images}
          displayName={galleryAlt}
          thalysImagesUrl={THALYS_IMAGES_URL}
        />

        <div className="flex flex-col justify-center">
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
            <span className="w-fit bg-gray-100 text-gray-400 text-[12px] font-mono px-2 py-0.5 rounded">
              #{currentProductCode}
            </span>
          </div>

          <h1 className="text-left text-3xl lg:text-5xl font-poppins font-bold text-thalys-blue mb-6 leading-[1.1]">
            {displayName}{" "}
            {currentVariantName && (
              <span className="text-thalys-red ml-2">
                ({currentVariantName})
              </span>
            )}
          </h1>

          <div className="mb-6 text-left">
            <h2 className="text-[10px] font-bold text-thalys-blue/40 uppercase tracking-widest mb-3">
              Descripción Técnica
            </h2>
            <p className="text-base text-left lg:text-lg text-thalys-text leading-relaxed font-light">
              {product.longDescription}
            </p>
          </div>

          {/* TAGS */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-[9px] rounded-lg border border-gray-200 uppercase"
                >
                  <Tag size={10} className="text-gray-400" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {product.variants && product.variants.length > 0 && (
            <div className="mb-8 text-left animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-[10px] font-bold text-thalys-red uppercase tracking-widest mb-3">
                Seleccionar {product.variantType || "Opción"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <Link
                    key={v.productCode}
                    href={`/products/${product.slug}-${v.subSlug}`}
                    scroll={false}
                    className={`px-4 py-2 rounded-xl border-2 font-bold text-xs transition-all ${
                      selectedVariant?.subSlug === v.subSlug
                        ? "border-thalys-blue bg-thalys-blue text-white shadow-md scale-105"
                        : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    {v.variant}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-10 text-left">
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-bold text-gray-900 leading-none">
                Precio a consultar
              </span>
              <span className="text-xs text-thalys-red font-medium mt-1">
                Consulta por disponibilidad
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
              <ShieldCheck className="text-thalys-red" size={20} />
              <div className="flex flex-col text-xs font-bold text-thalys-blue uppercase text-left">
                Garantía {product.brand}
                <span className="text-[10px] text-gray-400 font-normal italic">
                  Original Certificado
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
              <Truck className="text-thalys-red" size={20} />
              <div className="flex flex-col text-xs font-bold text-thalys-blue uppercase text-left">
                Envío Nacional
                <span className="text-[10px] text-gray-400 font-normal italic">
                  Todo el territorio
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-3 w-full items-center">
            <AddToCartSingle
              disabled={isSelectionIncomplete}
              product={{
                ...product,
                productCode: currentProductCode,
                variant: currentVariantName,
                slug: slug,
              }}
            />
            <Link
              href={`https://api.whatsapp.com/send?phone=595983188000&text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              className="flex-1 min-w-0 h-14 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#128C7E] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 px-2"
            >
              <MessageCircle size={18} fill="currentColor" />
              <span className="text-[13px] md:text-base truncate">
                WhatsApp
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
