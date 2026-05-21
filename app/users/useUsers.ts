"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { User } from "./types";

const fetcher = (url: string): Promise<User[]> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Gagal mengambil data user");
    return res.json();
  });

export const useUsers = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<User[]>("https://jsonplaceholder.typicode.com/users", fetcher);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    const filtered = users.filter((user) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    });

    return filtered.sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }, [users, searchQuery, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return {
    users: filteredAndSortedUsers,
    error,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortOrder,
    toggleSortOrder,
  };
};
