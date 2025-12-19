import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import ActionCell from "../../components/dashboard/ActionCell";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import { toast } from "react-hot-toast";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../api/products";
import { getCategories } from "../../api/categories";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [] as File[],
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data.map((prod: any) => ({
        id: prod._id,
        name: prod.name,
        category: prod.category?.name || "N/A",
        categoryId: prod.category?._id,
        price: `€${prod.price}`,
        stock: prod.stock,
        description: prod.description,
        images: prod.images,
      })));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error: any) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleUpdate = async (id: string, data?: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.categoryId);
      formData.append("price", data.price.replace("€", ""));
      formData.append("stock", data.stock);
      formData.append("description", data.description);
      
      if (data.images && data.images.length > 0) {
        data.images.forEach((file: File) => {
          formData.append("images", file);
        });
      }

      await updateProduct(id, formData);
      toast.success("Product updated successfully");
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("description", newProduct.description);
      
      newProduct.images.forEach((file) => {
        formData.append("images", file);
      });

      await createProduct(formData);
      toast.success("Product created successfully");
      setNewProduct({ name: "", category: "", price: "", stock: "", description: "", images: [] });
      setCreateModalOpen(false);
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = products.filter(
    (item) => item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "Name", selector: (row: any) => row.name, sortable: true },
    { name: "Category", selector: (row: any) => row.category },
    { name: "Price", selector: (row: any) => row.price, sortable: true },
    { name: "Stock", selector: (row: any) => row.stock, sortable: true },
    {
      name: "Actions",
      cell: (row: any) => <ActionCell row={row} type="product" onUpdate={handleUpdate} onDelete={handleDelete} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button className="bg-violet-500 text-white rounded-sm px-3 py-1 text-sm" onClick={() => setCreateModalOpen(true)}>Create</Button>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="border border-gray-300 p-2 mb-4 w-full rounded-md"
      />

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        striped
      />

      {/* Create Product Modal */}
      <Modal title="Create Product" isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <div className="space-y-3">
          <Input 
            label="Name" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <Input 
            label="Price" 
            type="number"
            value={newProduct.price} 
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
          />
          <Input 
            label="Stock" 
            type="number"
            value={newProduct.stock} 
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} 
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              rows={3}
            />
          </div>
          <Input 
            label="Upload Images" 
            type="file" 
            multiple 
            onChange={(e) => {
              if (e.target.files) setNewProduct({ ...newProduct, images: Array.from(e.target.files) });
            }} 
          />
        </div>
        <Button className="mt-4 w-full rounded-sm bg-violet-500 text-white" onClick={handleCreate}>
          Create
        </Button>
      </Modal>
    </>
  );
}