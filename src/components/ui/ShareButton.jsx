"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({
  url,
  title = "Thalys - Insumos Odontológicos",
  text = "Mira este producto de Thalys",
  className = "",
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const finalUrl = url || window.location.href;
    const shareData = { title, text, url: finalUrl };

    // 1. Intento compartir nativo (Celulares con HTTPS)
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }

    // 2. Fallback: Copiar al portapapeles (PC o HTTP)
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(finalUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = finalUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al compartir", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 rounded-full font-bold border shrink-0 
      bg-gray-70 border-gray-200/50 backdrop-blur-md active:scale-95 
      p-3 md:px-4 md:py-2 text-xs shadow-sm hover:bg-white transition-colors ${className}`}
    >
      <div className="text-thalys-blue flex items-center gap-2">
        {copied ? (
          <Check
            size={16}
            strokeWidth={3}
            className="animate-in zoom-in duration-300 text-thalys-blue"
          />
        ) : (
          <Share2 size={16} strokeWidth={2.5} />
        )}

        <span className="hidden md:block">
          {copied ? "Enlace Copiado" : "Compartir"}
        </span>
      </div>
    </button>
  );
}
