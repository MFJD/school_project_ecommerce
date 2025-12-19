import { Bell } from "lucide-react";
import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useAuth } from "../../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 border-b">
      <div></div>

      <div className="flex items-center gap-4 relative">
        <Bell size={24} className="text-gray-600" />

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold"
          >
            {user?.name?.[0]}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg z-50">
              <div className="p-4 border-b">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-gray-500 text-sm">{user?.role}</p>
              </div>
              <button
                className="w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setDropdownOpen(false);
                  setLogoutModal(true);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal title="Confirm Logout" isOpen={logoutModal} onClose={() => setLogoutModal(false)}>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setLogoutModal(false)}>Cancel</Button>
          <Button
            className="bg-violet-500 text-white px-4 py-1 rounded-sm"
            onClick={() => {
              logout();
              window.location.href = "/signin";
            }}
          >
            Leave
          </Button>
        </div>
      </Modal>
    </header>
  );
}
