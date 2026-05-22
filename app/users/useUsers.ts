"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { User, Post, Todo } from "./types";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Gagal memuat data");
    return res.json();
  });

export const useUsers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parallel Fetching menggunakan SWR
  const {
    data: rawUsers,
    error: uError,
    isLoading: uLoading,
  } = useSWR<User[]>("https://jsonplaceholder.typicode.com/users", fetcher);
  const {
    data: posts,
    error: pError,
    isLoading: pLoading,
  } = useSWR<Post[]>("https://jsonplaceholder.typicode.com/posts", fetcher);
  const {
    data: todos,
    error: tError,
    isLoading: tLoading,
  } = useSWR<Todo[]>("https://jsonplaceholder.typicode.com/todos", fetcher);

  // Ambil state dari URL Search Params (Bawaan Next.js 13+ App Router)
  const searchQuery = searchParams.get("search") || "";
  const filterType = searchParams.get("filter") || "all"; // all, pending, no_completed
  const sortOrder = searchParams.get("sort") || "asc"; // asc, desc, most_pending

  // Menggabungkan data users dengan statistik posts & todos
  const enrichedUsers = useMemo(() => {
    if (!rawUsers || !posts || !todos) return [];

    return rawUsers.map((user) => {
      const userPosts = posts.filter((p) => p.userId === user.id);
      const userTodos = todos.filter((t) => t.userId === user.id);

      return {
        ...user,
        totalPosts: userPosts.length,
        completedTodos: userTodos.filter((t) => t.completed).length,
        pendingTodos: userTodos.filter((t) => !t.completed).length,
      };
    });
  }, [rawUsers, posts, todos]);

  // Eksekusi Filter & Sort berdasarkan kombinasi URL params
  const processedUsers = useMemo(() => {
    let result = [...enrichedUsers];

    // 1. Text Filter (Name / Email)
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower),
      );
    }

    // 2. Meaningful Activity Filter (Task 4 Requirement)
    if (filterType === "pending") {
      result = result.filter((u) => (u.pendingTodos ?? 0) > 0);
    } else if (filterType === "no_completed") {
      result = result.filter((u) => (u.completedTodos ?? 0) === 0);
    }

    // 3. Sorting Logic
    result.sort((a, b) => {
      if (sortOrder === "most_pending") {
        return (b.pendingTodos ?? 0) - (a.pendingTodos ?? 0);
      }
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    return result;
  }, [enrichedUsers, searchQuery, filterType, sortOrder]);

  // Fungsi pembantu untuk mengupdate URL query params tanpa menghilangkan parameter lain
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/users?${params.toString()}`);
  };

  return {
    users: processedUsers,
    error: uError || pError || tError,
    isLoading: uLoading || pLoading || tLoading,
    searchQuery,
    setSearchQuery: (val: string) => updateParams("search", val),
    filterType,
    setFilterType: (val: string) => updateParams("filter", val),
    sortOrder,
    setSortOrder: (val: string) => updateParams("sort", val),
  };
};
