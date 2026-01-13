"use client";
import { useState } from "react";
import Image from "next/image";
import ShareButton from "@/components/ui/ShareButton";

export default function ProductImageGallery({
  images,
  displayName,
  thalysImagesUrl,
}) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-6">
      {/* Imagen Principal */}
      <div className="relative aspect-square bg-gray-50 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group">
        <Image
          src={`${thalysImagesUrl}${selectedImage}`}
          alt={displayName}
          fill
          className=" object-contain transition-transform duration-500 group-hover:scale-105"
          priority
        />

        {/* Botón de compartir posicionado arriba a la derecha */}
        <div className="absolute top-5 right-5 z-10">
          <ShareButton
            title={displayName}
            text={`Doctor, le comparto este insumo de Thalys: ${displayName}`}
          />
        </div>
      </div>

      {/* Miniaturas (Solo si hay más de 1 imagen) */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`relative h-20 w-20 rounded-2xl overflow-hidden border-2 transition-all bg-white ${selectedImage === img
                  ? "border-thalys-blue shadow-md scale-105"
                  : "border-transparent hover:border-gray-200"
                }`}
            >
              <Image
                src={`${thalysImagesUrl}${img}`}
                alt={`${displayName} vista ${index + 1}`}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
