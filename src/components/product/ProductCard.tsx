import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: any;
}

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04";

export default function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  // Helper: safe getter for the image path/URL from product.images
  const getImageUrl = (): string | null => {
    if (!product) return null;

    // common shapes:
    // product.images = [{ url: "/uploads/abc.jpg", filename: "abc.jpg" }]
    // product.images = [{ url: "uploads/abc.jpg" }]
    // product.images = ["/uploads/abc.jpg"]
    // product.images = ["http://localhost:4000/uploads/abc.jpg"]
    // product.image = "/uploads/abc.jpg" (single)
    const imgs = product.images ?? product.image ?? null;
    if (!imgs) return null;

    const first = Array.isArray(imgs) ? imgs[0] : imgs;

    // If first is object with url property
    if (typeof first === "object" && first !== null) {
      const url = (first.url as string) || (first.path as string) || "";
      if (!url) return null;
      // If url already looks absolute, return as-is
      if (/^(https?:)?\/\//i.test(url)) return url;
      // Ensure leading slash
      return `http://localhost:4000${url.startsWith("/") ? url : `/${url}`}`;
    }

    // If first is a string
    if (typeof first === "string") {
      const url = first;
      if (!url) return null;
      if (/^(https?:)?\/\//i.test(url)) return url;
      return `http://localhost:4000${url.startsWith("/") ? url : `/${url}`}`;
    }

    return null;
  };

  // Lazy-init image src
  if (imgSrc === null) {
    setImgSrc(getImageUrl() ?? PLACEHOLDER);
  }

  const stock = product?.stock ?? 0;

  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
        <img
          src={imgSrc || PLACEHOLDER}
          className="h-56 w-full object-cover"
          alt={product?.name ?? "product"}
          onError={(e) => {
            // If image fails to load, fallback to placeholder
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== PLACEHOLDER) {
              target.src = PLACEHOLDER;
              setImgSrc(PLACEHOLDER);
            }
          }}
        />

        <div className="p-5">
          <h3 className="font-medium text-sm">{product?.name}</h3>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product?.description}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold">€{product?.price}</span>
            <span className={`text-xs ${stock < 10 ? "text-red-500" : "text-gray-500"}`}>
              {stock < 10 ? `Only ${stock} left` : "In stock"}
            </span>
          </div>

          <button className="mt-4 w-full bg-violet-500 text-white py-2 rounded-lg text-sm">
            View product
          </button>
        </div>
      </div>
    </Link>
  );
}