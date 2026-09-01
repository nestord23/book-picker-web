"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { LibraryEntry, LibraryStatus } from "@/lib/types";

export type { LibraryStatus };

interface LibraryMutations {
  addBook: (
    bookId: number,
    status?: LibraryStatus,
    rating?: number,
    review?: string,
  ) => Promise<boolean>;
  removeBook: (bookId: number) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useLibrary(status?: LibraryStatus): {
  libros: LibraryEntry[];
  isLoading: boolean;
  error: string | null;
  mutations: LibraryMutations;
} {
  const [libros, setLibros] = useState<LibraryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerLibros = useCallback(async (): Promise<LibraryEntry[]> => {
    const query = status ? `?status=${status}` : "";
    return apiFetch<LibraryEntry[]>(`/api/me/books${query}`);
  }, [status]);

  useEffect(() => {
    let activo = true;

    (async () => {
      try {
        const data = await obtenerLibros();
        if (activo) {
          setLibros(data);
          setError(null);
        }
      } catch (err) {
        if (activo) {
          const mensaje =
            err instanceof Error
              ? err.message
              : "Error al cargar la biblioteca";
          setError(mensaje);
        }
      } finally {
        if (activo) setIsLoading(false);
      }
    })();

    return () => {
      activo = false;
    };
  }, [obtenerLibros]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await obtenerLibros();
      setLibros(data);
    } catch (err) {
      const mensaje =
        err instanceof Error ? err.message : "Error al cargar la biblioteca";
      setError(mensaje);
    } finally {
      setIsLoading(false);
    }
  }, [obtenerLibros]);

  const addBook = useCallback(
    async (
      bookId: number,
      newStatus: LibraryStatus = "to_read",
      rating?: number,
      review?: string,
    ): Promise<boolean> => {
      try {
        await apiFetch<LibraryEntry>("/api/me/books", {
          method: "POST",
          body: JSON.stringify({ bookId, status: newStatus, rating, review }),
        });
        await refetch();
        return true;
      } catch {
        return false;
      }
    },
    [refetch],
  );

  const removeBook = useCallback(
    async (bookId: number): Promise<boolean> => {
      try {
        await apiFetch<void>(`/api/me/books/${bookId}`, {
          method: "DELETE",
        });
        await refetch();
        return true;
      } catch {
        return false;
      }
    },
    [refetch],
  );

  return {
    libros,
    isLoading,
    error,
    mutations: { addBook, removeBook, refetch },
  };
}
