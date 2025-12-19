import type { JSX } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white p-5 shadow hover:shadow-md transition flex items-center gap-4">
      <div className="text-violet-500">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}
