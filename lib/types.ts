export interface User {
  id: number;
  name: string | null;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name?: string;
  email: string;
  password: string;
}

export interface LibraryBook {
  id: number;
  title: string;
  description: string | null;
  publishYear: number | null;
  genre: string | null;
}

export interface LibraryEntry {
  id: number;
  status: "to_read" | "reading" | "read";
  rating: number | null;
  review: string | null;
  addedAt: string;
  updatedAt: string;
  book: LibraryBook;
}

export type LibraryStatus = "to_read" | "reading" | "read";
