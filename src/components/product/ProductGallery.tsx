import { useEffect, useState } from "react";

type ImageInput = string | { url?: string; path?: string; filename?: string } | null | undefined;

interface ProductGalleryProps {
  images: ImageInput[]; // pass product.images directly
  initialIndex?: number;
  className?: string;
}

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80&auto=format&fit=crop";

export default function ProductGallery({ images, initialIndex = 0, className = "" }: ProductGalleryProps) {
  // Normalize incoming images array to an array of strings (absolute URLs)
  const normalized = (images ?? [])
    .map((item) => {
      if (!item) return "";
      if (typeof item === "string") return item;
      // object case: try url, path, filename
      return (item.url || item.path || item.filename || "").toString();
    })
    .map((s) => s.trim())
    .filter(Boolean);

  const [activeIndex, setActiveIndex] = useState<number>(
    normalized.length > 0 ? Math.min(Math.max(0, initialIndex), normalized.length - 1) : -1
  );

  // if images change, reset activeIndex to a valid value
  useEffect(() => {
    if (normalized.length === 0) {
      setActiveIndex(-1);
    } else {
      setActiveIndex((prev) => {
        if (prev < 0 || prev >= normalized.length) return 0;
        return prev;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images?.length]);

  const activeSrc = activeIndex >= 0 ? normalized[activeIndex] : PLACEHOLDER;

  return (
    <div className={`flex gap-4 items-start ${className}`}>
      {/* Thumbnails */}
      <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
        {normalized.length === 0 ? (
          <div className="w-20 h-20 rounded-xl bg-gray-100 border border-gray-200" />
        ) : (
          normalized.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 focus:outline-none transition-all ${
                idx === activeIndex ? "ring-2 ring-violet-500 transform scale-105" : ""
              }`}
              aria-label={`Show image ${idx + 1}`}
            >
              <img
                src={src}
                alt={`thumb-${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (t.src !== PLACEHOLDER) t.src = PLACEHOLDER;
                }}
              />
            </button>
          ))
        )}
      </div>

      {/* Main */}
      <div className="relative w-full max-w-2xl">
        <img
          src={activeSrc}
          alt="product"
          loading="eager"
          className="rounded-2xl shadow-lg w-full h-[420px] object-cover bg-gray-50"
          onError={(e) => {
            const t = e.currentTarget;
            if (t.src !== PLACEHOLDER) t.src = PLACEHOLDER;
          }}
        />
      </div>
    </div>
  );
}