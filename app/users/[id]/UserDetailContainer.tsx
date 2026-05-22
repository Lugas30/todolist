"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserDetail } from "./useUserDetail";
import { UserCard } from "./UserCard";

export const UserDetailContainer = ({ id }: { id: string }) => {
  const router = useRouter();
  const { user, posts, todos, error, isLoading } = useUserDetail(id);
  const [activeTab, setActiveTab] = useState<"posts" | "todos">("posts");

  // Penanganan Edge Case: Invalid User ID
  if (id && isNaN(Number(id))) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium mb-4">
          Error: User ID tidak valid.
        </p>
        <button
          onClick={() => router.push("/users")}
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
        >
          Kembali
        </button>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-red-600 p-4">
        Terjadi kesalahan memuat data workspace user.
      </div>
    );
  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading Workspace...
      </div>
    );
  if (!user)
    return <div className="text-gray-500 p-4">User tidak ditemukan.</div>;

  return (
    <div className="space-y-8">
      {/* Profil Atas */}
      <UserCard user={user} />

      {/* Bagian Workspace: Posts & Todos */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
        {/* Navigasi Tab */}
        <div className="flex space-x-4 border-b border-gray-100 mb-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 ${
              activeTab === "posts"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("todos")}
            className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 ${
              activeTab === "todos"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Todos ({todos.length})
          </button>
        </div>

        {/* Konten Tab: Posts */}
        {activeTab === "posts" && (
          <div className="space-y-4 max-h-100 overflow-y-auto pr-2">
            {posts.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                User ini belum mempublikasikan postingan.
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <h4 className="font-semibold text-gray-900 capitalize text-sm mb-1 wrap-break-word">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed wrap-break-word">
                    {post.body}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Konten Tab: Todos */}
        {activeTab === "todos" && (
          <div className="space-y-2 max-h-100 overflow-y-auto pr-2">
            {todos.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                Tidak ditemukan daftar tugas.
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${todo.completed ? "bg-green-500" : "bg-amber-500"}`}
                  />
                  <p
                    className={`text-xs capitalize flex-1 wrap-break-word ${todo.completed ? "line-through text-gray-400" : "text-gray-700 font-medium"}`}
                  >
                    {todo.title}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${todo.completed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {todo.completed ? "Done" : "Pending"}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
