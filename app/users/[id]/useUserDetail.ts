"use client";

import useSWR from "swr";
import { UserDetail } from "./types";

const fetcher = (url: string): Promise<UserDetail> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Gagal memuat detail data user");
    return res.json();
  });

export const useUserDetail = (id: string) => {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR<UserDetail>(
    id ? `https://jsonplaceholder.typicode.com/users/${id}` : null,
    fetcher,
  );

  return {
    user,
    error,
    isLoading,
  };
};
