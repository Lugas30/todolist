"use client";

import { useUsers } from "./useUsers";
import { UserTable } from "./UserTable";

const UsersPage = () => {
  const {
    users,
    error,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortOrder,
    toggleSortOrder,
  } = useUsers();

  return (
    <div className="container mx-auto p-4 max-w-6xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        Users List
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-sm transition-all"
          />
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2 justify-end">
          <span className="text-sm text-gray-600 font-medium">
            Urutkan Nama:
          </span>
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm focus:outline-none"
          >
            {sortOrder === "asc" ? "Ascending (A-Z)" : "Descending (Z-A)"}
          </button>
        </div>
      </div>

      {/* State Handling: Error */}
      {error && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
          Terjadi kesalahan: {error.message || "Gagal memuat data."}
        </div>
      )}

      {/* State Handling: Loading */}
      {isLoading && (
        <div className="w-full space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-full hidden md:block"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded w-full"></div>
          ))}
        </div>
      )}

      {/* Tampilan Data */}
      {!isLoading && !error && <UserTable data={users} />}
    </div>
  );
};

export default UsersPage;
