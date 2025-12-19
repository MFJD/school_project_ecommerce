import { MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface ActionCellProps {
  row: any;
  type: "category" | "product";
  onUpdate: (id: string, data?: any) => void;
  onDelete: (id: string) => void;
}

export default function ActionCell({ row, type, onUpdate, onDelete }: ActionCellProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState({
    name: row.name || "",
    category: row.categoryId || "",
    price: row.price?.replace("€", "") || "",
    stock: row.stock || "",
    description: row.description || "",
    images: [] as File[],
  });

  // Update formData when row changes
  useEffect(() => {
    setFormData({
      name: row.name || "",
      category: row.categoryId || "",
      price: row.price?.replace("€", "") || "",
      stock: row.stock || "",
      description: row.description || "",
      images: [],
    });
  }, [row]);

  const toggleDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
    setDropdownOpen(!dropdownOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    if (files) {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button ref={buttonRef} onClick={toggleDropdown}>
        <MoreVertical size={20} />
      </button>

      {dropdownOpen &&
        createPortal(
          <div
            className="absolute z-50 w-32 bg-white border shadow-lg rounded-sm"
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            <button
              className="w-full text-left px-3 py-1 hover:bg-gray-100 text-sm"
              onClick={() => { setDropdownOpen(false); setUpdateModal(true); }}
            >
              Update
            </button>
            <button
              className="w-full text-left px-3 py-1 hover:bg-gray-100 text-sm text-red-500"
              onClick={() => { setDropdownOpen(false); setDeleteModal(true); }}
            >
              Delete
            </button>
          </div>,
          document.body
        )}

      {/* Update Modal */}
      <Modal title={`Update ${type === "category" ? "Category" : "Product"}`} isOpen={updateModal} onClose={() => setUpdateModal(false)}>
        <div className="space-y-3">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
          {type === "product" && (
            <>
              <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
              <Input label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  rows={3}
                />
              </div>
              <Input label="Upload Images" type="file" name="images" onChange={handleChange} multiple />
            </>
          )}
        </div>
        <Button
          className="mt-4 w-full rounded-sm bg-violet-500 text-white"
          onClick={() => { 
            setUpdateModal(false); 
            onUpdate(row.id, { ...formData, categoryId: row.categoryId }); 
          }}
        >
          Update
        </Button>
      </Modal>

      {/* Delete Modal */}
      <Modal title={`Delete ${row.name}?`} isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <p>Are you sure you want to delete this {type}?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button className="bg-gray-200 text-gray-800 px-4 py-1 rounded-sm" onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button
            className="bg-red-500 text-white px-4 py-1 rounded-sm"
            onClick={() => { setDeleteModal(false); onDelete(row.id); }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}