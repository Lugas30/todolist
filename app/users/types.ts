export interface User {
  id: number;
  name: string;
  email: string;
  website: string;
  totalPosts?: number;
  completedTodos?: number;
  pendingTodos?: number;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
