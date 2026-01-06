"use client";
import { useId } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCard } from "@/components/products/ProductsCard";
import { THALYS_IMAGES_URL } from "@/assets/constants";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductsCarousel({ products, title = "Destacados" }) {
  const uniqueId = useId().replace(/:/g, "");
  const prevId = `prev-${uniqueId}`;
  const nextId = `next-${uniqueId}`;
  const paginationId = `pagination-${uniqueId}`;

  const limitedProducts = products.slice(0, 10);
  const hasMore = products.length > 10;

  // Función para crear la URL limpia: "Instrumental Estético" -> "/products/instrumental-estetico"
  const categorySlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quita tildes
    .replace(/\s+/g, "-"); // Cambia espacios por guiones

  const dynamicViewAllLink = `/products/${categorySlug}`;

  return (
    <section className="py-4 bg-gray-50/50">
      <div className="mx-auto px-6">
        {/* CABECERA SIMPLIFICADA */}
        <div className="flex flex-row justify-between items-center mb-6 gap-4">
          <Link
            href={dynamicViewAllLink}
            className="group text-left flex-1 min-w-0"
          >
            <div className="inline-block relative">
              <div className="flex items-center">
                <h2 className="text-xl md:text-2xl font-bold text-thalys-blue leading-tight tracking-tight pr-4 transition-colors group-hover:text-thalys-red">
                  {title}
                </h2>
                <div className="md:hidden text-thalys-red opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                  <ArrowRight size={24} />
                </div>
              </div>
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-thalys-red transition-all duration-300 group-hover:w-full"></span>
            </div>
          </Link>

          {/* CONTROLES SIEMPRE VISIBLES */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id={prevId}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-thalys-blue hover:text-white transition-all shadow-sm cursor-pointer disabled:opacity-20 disabled:cursor-auto"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              id={nextId}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-thalys-blue hover:text-white transition-all shadow-sm cursor-pointer disabled:opacity-20 disabled:cursor-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* CONTENIDO DEL CARRUSEL */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.4}
          navigation={{
            prevEl: `#${prevId}`,
            nextEl: `#${nextId}`,
          }}
          pagination={{
            clickable: true,
            el: `#${paginationId}`,
          }}
          breakpoints={{
            480: { slidesPerView: 2.2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="overflow-visible!"
        >
          {limitedProducts.map((product) => (
            <SwiperSlide key={product.generalCode}>
              <Link
                href={`/products/${product.defaultSlug || product.slug}`}
                className="block hover:scale-[1.02] transition-transform duration-300 pb-4"
              >
                <ProductCard
                  product={{
                    ...product,
                    image: `${THALYS_IMAGES_URL}${
                      Array.isArray(product.image)
                        ? product.image[0]
                        : product.image
                    }`,
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}

          {hasMore && (
            <SwiperSlide>
              <Link
                href={dynamicViewAllLink}
                className="flex flex-col items-center justify-center h-full min-h-[300px] bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-thalys-red hover:bg-thalys-red/5 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-thalys-red group-hover:text-white transition-colors">
                  <Plus size={32} />
                </div>
                <span className="font-bold text-thalys-blue group-hover:text-thalys-red transition-colors text-center px-4">
                  Ver más {title}
                </span>
                <span className="text-sm text-gray-400 mt-1 font-medium">
                  +{products.length - 10} productos
                </span>
              </Link>
            </SwiperSlide>
          )}
        </Swiper>

        <div
          id={paginationId}
          className="custom-pagination flex justify-center gap-2 mt-4"
        ></div>
      </div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 5px;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 30px;
          background: #a92130 !important;
        }
      `}</style>
    </section>
  );
}
