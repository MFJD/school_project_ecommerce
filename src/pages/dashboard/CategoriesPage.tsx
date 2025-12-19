import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import ActionCell from "../../components/dashboard/ActionCell";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import { toast } from "react-hot-toast";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../api/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data.map((cat: any) => ({
        id: cat._id,
        name: cat.name,
        createdAt: new Date(cat.createdAt).toLocaleDateString(),
      })));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdate = async (id: string, data?: any) => {
    setLoading(true);
    try {
      await updateCategory(id, { name: data.name });
      toast.success("Category updated successfully");
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (newCategoryName.trim() === "") {
      toast.error("Please enter a category name");
      return;
    }
    setLoading(true);
    try {
      await createCategory({ name: newCategoryName });
      toast.success("Category created successfully");
      setNewCategoryName("");
      setCreateModalOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = categories.filter(
    (item) => item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "Name", selector: (row: any) => row.name, sortable: true },
    { name: "Created At", selector: (row: any) => row.createdAt },
    {
      name: "Actions",
      cell: (row: any) => (
        <ActionCell row={row} type="category" onUpdate={handleUpdate} onDelete={handleDelete} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button className="bg-violet-500 text-white rounded-sm px-3 py-1 text-sm" onClick={() => setCreateModalOpen(true)}>Create</Button>
      </div>

      <input
        type="text"
        placeholder="Search categories..."
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

      {/* Create Modal */}
      <Modal title="Create Category" isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <Input
          label="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button className="mt-4 w-full rounded-sm bg-violet-500 text-white" onClick={handleCreate}>
          Create
        </Button>
      </Modal>
    </>
  );
}