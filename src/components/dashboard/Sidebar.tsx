import { Home, Grid, Box } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  toggle: () => void;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/dashboard", roles: ["superadmin"] },
    { name: "Categories", icon: <Grid />, path: "/dashboard/categories", roles: ["superadmin"] },
    { name: "Products", icon: <Box />, path: "/dashboard/products", roles: ["admin", "superadmin"] },
  ];

  return (
    <div className={`bg-white h-full border-r flex flex-col ${collapsed ? "w-20" : "w-64"}`}>
      {/* Logo */}
      <div className="p-4 border-b">
        <h1 className={`text-xl font-bold text-violet-600 ${collapsed ? "text-center" : ""}`}>
          {collapsed ? "E" : "Electroniks"}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1">
        {menuItems
          .filter((item) => user && item.roles.includes(user.role))
          .map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-4 hover:bg-violet-100 transition ${
                location.pathname === item.path ? "bg-violet-100 border-r-4 border-violet-600 font-semibold" : ""
              }`}
            >
              <span className="text-violet-600">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
      </nav>
    </div>
  );
}