import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import LandingLayout from "../../components/layouts/LandingLayout";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import { toast } from "react-hot-toast";
import { getProductById, getProducts } from "../../api/products";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80&auto=format&fit=crop";

function normalizeImage(item: any, hostPrefix = "http://localhost:4000") {
  if (!item) return null;
  if (typeof item === "string") {
    const s = item.trim();
    if (!s) return null;
    if (/^(https?:)?\/\//i.test(s)) return s; // absolute url already
    return `${hostPrefix}${s.startsWith("/") ? s : `/${s}`}`;
  }
  // object - prefer url, then path, then filename
  const url = (item.url || item.path || item.filename || "").toString().trim();
  if (!url) return null;
  if (/^(https?:)?\/\//i.test(url)) return url;
  return `${hostPrefix}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchSimilarProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await getProductById(id!);
      setProduct(data);

      // Normalize images to absolute URLs (handle Cloudinary full URLs and relative server URLs)
      const normalized = (data.images ?? [])
        .map((img: any) => normalizeImage(img) || null)
        .filter(Boolean) as string[];

      // prefer first normalized image, fallback to placeholder
      setActiveImage(normalized[0] ?? PLACEHOLDER);
    } catch (error: any) {
      toast.error("Failed to load product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const data = await getProducts();
      setSimilarProducts(data.filter((p: any) => p._id !== id).slice(0, 4));
    } catch (error) {
      console.error("Failed to load similar products", error);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let val = parseInt(raw, 10);
    if (Number.isNaN(val)) val = 1;
    if (product) {
      if (val < 1) val = 1;
      if (val > product.stock) val = product.stock;
    } else if (val < 1) {
      val = 1;
    }
    setQuantity(val);
  };

  const handleBuyNow = () => {
    if (product) {
      navigate(`/billing/${product._id}`, { state: { product, quantity } });
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div className="p-6">Product not found</div>;

  // Build normalized images array for thumbnails & main image
  const images = (product.images ?? [])
    .map((img: any) => normalizeImage(img) || null)
    .filter(Boolean) as string[];

  const displayedActive = activeImage || images[0] || PLACEHOLDER;
  const stock = product.stock ?? 0;

  return (
    <LandingLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {(images.length > 0 ? images : [PLACEHOLDER]).map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
                    displayedActive === img ? "border-violet-500" : "border-gray-200"
                  }`}
                  alt={`Product thumbnail ${idx + 1}`}
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (t.src !== PLACEHOLDER) t.src = PLACEHOLDER;
                  }}
                />
              ))}
            </div>

            <img
              src={displayedActive}
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
              alt={product.name}
              onError={(e) => {
                const t = e.currentTarget;
                if (t.src !== PLACEHOLDER) t.src = PLACEHOLDER;
              }}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-violet-600 text-2xl font-semibold mb-2">€{product.price}</p>
            <p className={`text-sm mb-4 ${stock < 10 ? "text-red-500" : "text-gray-500"}`}>
              {stock < 10 ? `Only ${stock} left in stock!` : "In stock"}
            </p>

            <div className="flex gap-4 mb-4">
              <Input
                type="number"
                min={1}
                max={stock}
                value={String(quantity)}
                onChange={handleQuantityChange}
                className="w-24"
              />
              <button
                className="bg-violet-500 text-white px-6 py-2 rounded-lg hover:bg-violet-600 transition"
                onClick={handleBuyNow}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6">Similar Items</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}