import { useState, useEffect } from "react";
import LandingLayout from "../../components/layouts/LandingLayout";
import ProductCard from "../../components/product/ProductCard";
import ProductFilter from "../../components/product/ProductFilter";
import PopularSection from "../../components/product/PopularSection";
import Loader from "../../components/ui/Loader";
import { toast } from "react-hot-toast";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";

export default function LandingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchText, products]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);
    } catch (error: any) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p: any) => p.category._id === selectedCategory);
    }

    if (searchText) {
      filtered = filtered.filter((p: any) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <LandingLayout>
      {loading && <Loader />}
      
      {/* HERO SECTION */}
      <section className="relative h-[500px] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593642532400-2682810df593')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium electronics</h1>
            <p className="text-lg md:text-xl">Discover carefully selected devices with premium quality and fast delivery.</p>
          </div>
        </div>
      </section>
      
      <br />
      
      <ProductFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      
      <PopularSection categories={categories} />

      <section className="max-w-7xl mx-auto px-6 py-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </LandingLayout>
  );
}