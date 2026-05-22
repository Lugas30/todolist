"use client";

import useSWR from "swr";
import { UserDetail, Post, Todo } from "./types";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Gagal mengambil data");
    return res.json();
  });

export const useUserDetail = (id: string) => {
  const {
    data: user,
    error: uError,
    isLoading: uLoading,
  } = useSWR<UserDetail>(
    id ? `https://jsonplaceholder.typicode.com/users/${id}` : null,
    fetcher,
  );

  const {
    data: posts,
    error: pError,
    isLoading: pLoading,
  } = useSWR<Post[]>(
    id ? "https://jsonplaceholder.typicode.com/posts" : null,
    fetcher,
  );

  const {
    data: todos,
    error: tError,
    isLoading: tLoading,
  } = useSWR<Todo[]>(
    id ? "https://jsonplaceholder.typicode.com/todos" : null,
    fetcher,
  );

  // Ambil data yang spesifik milik user id ini saja
  const userPosts = posts ? posts.filter((p) => p.userId === Number(id)) : [];
  const userTodos = todos ? todos.filter((t) => t.userId === Number(id)) : [];

  return {
    user,
    posts: userPosts,
    todos: userTodos,
    error: uError || pError || tError,
    isLoading: uLoading || pLoading || tLoading,
  };
};
