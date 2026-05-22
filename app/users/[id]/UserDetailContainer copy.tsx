"use client";

import { useUserDetail } from "./useUserDetail";
import { UserCard } from "./UserCard";

interface UserDetailContainerProps {
  id: string;
}

export const UserDetailContainer = ({ id }: UserDetailContainerProps) => {
  const { user, error, isLoading } = useUserDetail(id);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
        Terjadi kesalahan: {error.message || "Gagal memuat profil user."}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
        <div className="h-32 bg-gray-200 w-full"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-20 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return user ? <UserCard user={user} /> : null;
};
