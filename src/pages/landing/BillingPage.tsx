import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LandingLayout from "../../components/layouts/LandingLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import { toast } from "react-hot-toast";
import { getProductById } from "../../api/products";
import { purchaseProducts } from "../../api/users";

type Product = {
  _id: string;
  name: string;
  price: number;
  // add other product fields if needed
};

type PurchaseProduct = {
  product: string;
  quantity: number;
};

export default function BillingPage() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  });

  useEffect(() => {
    if ((location as any).state) {
      // When coming from a cart or product page we may pass the product & quantity in location.state
      const state: any = (location as any).state;
      if (state.product) setProduct(state.product as Product);
      if (state.quantity) setQuantity(Number(state.quantity) || 1);
    } else if (productId) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, location]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await getProductById(productId!);
      setProduct(data);
    } catch (error: any) {
      toast.error("Failed to load product");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, surname, email, address, city, postalCode, country } = formData;
    if (!name || !surname || !email || !address || !city || !postalCode || !country) {
      toast.error("Please fill all fields");
      return;
    }

    if (!product?._id) {
      toast.error("Product not available");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        surname,
        email,
        address,
        city,
        postalCode,
        country,
        products: [
          {
            product: product._id,
            quantity,
          } as PurchaseProduct,
        ],
      };

      // Use the central api wrapper function so the request goes to /users/purchase
      await purchaseProducts(payload);

      toast.success("Order placed successfully! Check your email for confirmation.");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div>Loading...</div>;

  const tax = 0.2;
  const subtotal = product.price * quantity;
  const taxAmount = subtotal * tax;
  const shipping = 20;
  const total = subtotal + taxAmount + shipping;

  return (
    <LandingLayout>
      {loading && <Loader />}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow">
              <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Input label="First Name" name="name" value={formData.name} onChange={handleChange} required />
                <Input label="Last Name" name="surname" value={formData.surname} onChange={handleChange} required />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mb-4"
                required
              />

              <div className="grid md:grid-cols-3 gap-4">
                <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
                <Input label="Country" name="country" value={formData.country} onChange={handleChange} required />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow h-fit">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="mb-4 border-b pb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>{product.name}</span>
                  <span>€{product.price}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tax (20%)</span>
                  <span>€{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Shipping</span>
                  <span>€{shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 transition"
                loading={loading}
              >
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </div>
    </LandingLayout>
  );
}