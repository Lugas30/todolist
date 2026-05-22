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
    filterType,
    setFilterType,
    sortOrder,
    setSortOrder,
  } = useUsers();

  return (
    <div className="container mx-auto p-4 max-w-6xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        Users Workspace
      </h1>

      {/* Kontrol Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
            Cari User
          </label>
          <input
            type="text"
            placeholder="Nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
            Filter Aktivitas
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Semua User</option>
            <option value="pending">Pending Tugas</option>
            <option value="no_completed">Tugas Belum Selesai</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
            Urutan Nama / Tugas
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="asc">Nama (A-Z) ↑</option>
            <option value="desc">Nama (Z-A) ↓</option>
            <option value="most_pending">Pending Terbanyak</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          Terjadi kesalahan memuat data operasi.
        </div>
      )}

      {isLoading ? (
        <div className="w-full space-y-4 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <UserTable data={users} />
      )}
    </div>
  );
};

export default UsersPage;
