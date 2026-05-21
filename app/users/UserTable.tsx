"use client";

import { User } from "./types";
import { useRouter } from "next/navigation";

interface UserTableProps {
  data: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/users/${id}`);
  };

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Tidak ada data pengguna yang ditemukan.
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-md rounded-md border border-gray-200">
      {/* Tampilan Desktop (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
                Website
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm">{user.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tampilan Mobile (Bentuk Card List) */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden bg-gray-50">
        {data.map((user) => (
          <div
            key={user.id}
            onClick={() => handleRowClick(user.id)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-2"
          >
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400 block">
                Name
              </span>
              <span className="text-sm font-medium text-gray-900">
                {user.name}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400 block">
                Email
              </span>
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400 block">
                Website
              </span>
              {user.website}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
