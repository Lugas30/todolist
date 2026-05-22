"use client";

import { useRouter } from "next/navigation";
import { UserDetail } from "./types";

interface UserCardProps {
  user: UserDetail;
}

export const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();

  return (
    <div className="w-full bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header Card */}
      <div className="bg-linear-to-r invert-0 bg-teal-700 p-6 sm:p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-blue-100 text-sm">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Body Card */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* Kolom Kiri: Personal Info */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800 border-b pb-2">
            Personal Information
          </h3>
          <div className="space-y-2">
            <p className="text-gray-500">Email</p>
            <p className="text-gray-900 font-medium break-all">{user.email}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-500">Phone</p>
            <p className="text-gray-900 font-medium">{user.phone}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-500">Website</p>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium block"
            >
              {user.website}
            </a>
          </div>
        </div>

        {/* Kolom Kanan: Company & Address */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 border-b pb-2">
              Company
            </h3>
            <div>
              <p className="font-bold text-gray-900 text-sm">
                {user.company.name}
              </p>
              <p className="text-gray-500 italic text-xs mt-1">
                "{user.company.catchPhrase}"
              </p>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-800 border-b pb-2">
              Address
            </h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              {user.address.suite}, {user.address.street}
              <br />
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Card Navigation */}
      <div className="bg-gray-50 px-6 py-4 sm:px-8 border-t border-gray-100 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
        >
          ← Back to list (Preserve Filters)
        </button>
      </div>
    </div>
  );
};
