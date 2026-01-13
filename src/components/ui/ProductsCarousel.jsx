"use client";
import { useId } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCard } from "@/components/products/ProductsCard";
import { THALYS_IMAGES_URL } from "@/assets/constants";
import { toSlug } from "@/utils/textHelpers";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductsCarousel({
  products,
  title = "Destacados",
  viewAllLink,
  pathPrefix = null,
}) {
  const uniqueId = useId().replace(/:/g, "");
  const prevId = `prev-${uniqueId}`;
  const nextId = `next-${uniqueId}`;
  const paginationId = `pagination-${uniqueId}`;

  const limitedProducts = products.slice(0, 10);
  const hasMore = products.length > 10;
  const dynamicLink = viewAllLink || `/products/${toSlug(title)}`;

  return (
    <section className="pt-4 relative group/carousel">
      <div className="mx-auto px-4">
        <div className="flex flex-row items-baseline mb-4 gap-4">
          <h2 className="text-xl md:text-2xl text-thalys-blue leading-tight tracking-tight">
            {title}
          </h2>
          <Link
            href={dynamicLink}
            className="group flex items-center gap-0.5 font-semibold text-xs md:text-sm text-thalys-red hover:underline mb-0.5"
          >
            Ver más productos
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative">
          <button id={prevId} className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 text-thalys-blue hover:bg-thalys-blue hover:text-white items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 cursor-pointer">
            <ChevronLeft size={20} />
          </button>
          <button id={nextId} className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 text-thalys-blue hover:bg-thalys-blue hover:text-white items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 cursor-pointer">
            <ChevronRight size={20} />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2}
            slidesPerGroup={2}
            navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
            pagination={{ clickable: true, el: `#${paginationId}` }}
            breakpoints={{
              480: { slidesPerView: 2.2, slidesPerGroup: 2 },
              768: { slidesPerView: 4, slidesPerGroup: 4 },
              1024: { slidesPerView: 5, slidesPerGroup: 5 },
            }}
            className="px-1 py-4"
          >
            {limitedProducts.map((product) => {
              let productHref;
              const subCat = toSlug(product.subCategory || "general");

              // LÓGICA CORREGIDA:
              if (pathPrefix) {
                // Generamos 4 niveles: /products/cirugia/bisturi/slug
                // Esto asegura que el breadcrumb tenga "Cirugía" y "Bisturí"
                productHref = `/products/${pathPrefix}/${subCat}/${product.slug}`;
              } else {
                // Ruta Jerárquica: /products/instrumentales/bisturi/slug
                const cat = toSlug(product.categories || "otros");
                productHref = `/products/${cat}/${subCat}/${product.slug}`;
              }

              return (
                <SwiperSlide key={product.generalCode}>
                  <Link href={productHref} className="block hover:scale-[1.02] transition-transform duration-300 pb-2">
                    <ProductCard
                      product={{
                        ...product,
                        image: `${THALYS_IMAGES_URL}${Array.isArray(product.image) ? product.image[0] : product.image}`,
                      }}
                    />
                  </Link>
                </SwiperSlide>
              );
            })}

            {hasMore && (
              <SwiperSlide>
                <Link href={dynamicLink} className="flex flex-col items-center justify-center h-full min-h-[200px] bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-thalys-red hover:bg-thalys-red/5 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-thalys-red group-hover:text-white transition-colors">
                    <Plus size={24} />
                  </div>
                  <span className="font-bold text-sm text-thalys-blue group-hover:text-thalys-red transition-colors text-center px-4">Ver más</span>
                </Link>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div id={paginationId} className="custom-pagination flex justify-center gap-2 mt-4"></div>
      </div>
    </section>
  );
}