"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { User } from "./types";

interface UserTableProps {
  data: User[];
}

export const UserTable = ({ data }: UserTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Menjaga agar search & filter state terbawa ke halaman detail
  const handleRowClick = (id: number) => {
    router.push(`/users/${id}?${searchParams.toString()}`);
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 border border-dashed border-gray-200 rounded-xl">
        Tidak ada data user yang cocok dengan kriteria pencarian dan filter.
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-md rounded-xl border border-gray-200">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-600">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-600 text-center">
                Posts
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-600 text-center">
                Completed
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-600 text-center">
                Pending
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate max-w-45">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-50">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-center font-semibold text-gray-700">
                  {user.totalPosts}
                </td>
                <td className="px-6 py-4 text-sm text-center font-semibold text-green-600">
                  {user.completedTodos}
                </td>
                <td className="px-6 py-4 text-sm text-center font-semibold text-amber-600">
                  {user.pendingTodos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden bg-gray-50">
        {data.map((user) => (
          <div
            key={user.id}
            onClick={() => handleRowClick(user.id)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3 cursor-pointer hover:border-blue-300 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 wrap-break-word max-w-50">
                  {user.name}
                </h4>
                <p className="text-xs text-gray-500 break-all">{user.email}</p>
              </div>
            </div>
            {/* Activity Signals Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">
                  Posts
                </span>
                <span className="text-sm font-bold text-gray-700">
                  {user.totalPosts}
                </span>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <span className="text-[10px] font-bold text-green-500 uppercase block">
                  Done
                </span>
                <span className="text-sm font-bold text-green-600">
                  {user.completedTodos}
                </span>
              </div>
              <div className="bg-amber-50 p-2 rounded">
                <span className="text-[10px] font-bold text-amber-500 uppercase block">
                  Pending
                </span>
                <span className="text-sm font-bold text-amber-600">
                  {user.pendingTodos}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
