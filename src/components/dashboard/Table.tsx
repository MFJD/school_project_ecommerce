import { MoreHorizontal } from 'lucide-react';

interface TableProps {
  columns: string[];
  data: any[];
}

export default function Table({ columns, data }: TableProps) {
  return (
    <table className="w-full table-auto border-collapse bg-white rounded-xl shadow overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="text-left p-3 text-gray-700 text-sm">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b hover:bg-gray-50 transition">
            {columns.map((col) => (
              <td key={col} className="p-3 text-gray-600 text-sm">{row[col]}</td>
            ))}
            <td className="p-3 text-gray-600 text-sm cursor-pointer">
              <MoreHorizontal />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
