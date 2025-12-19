import { ShoppingCart, Users, Box } from "lucide-react";
import StatsCard from "../../components/dashboard/StatsCard";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Orders" value="1200" icon={<ShoppingCart size={28} />} />
        <StatsCard title="Total Users" value="800" icon={<Users size={28} />} />
        <StatsCard title="Total Products" value="320" icon={<Box size={28} />} />
      </div>
    </div>
  );
}