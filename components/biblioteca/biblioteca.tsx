"use client";

import { useState } from "react";
import "./biblioteca.css";
import Sidebar from "../sidebar/sidebar";

type Estado = "TO READ" | "READING" | "READ";

type Libro = {
  titulo: string;
  autor: string;
  estado: Estado;
  rating: number;
};

const LIBROS: Libro[] = [
  { titulo: "Dune", autor: "Frank Herbert", estado: "READING", rating: 5 },
  {
    titulo: "Neuromancer",
    autor: "William Gibson",
    estado: "TO READ",
    rating: 0,
  },
  { titulo: "The Hobbit", autor: "J.R.R. Tolkien", estado: "READ", rating: 4 },
  { titulo: "Blindsight", autor: "Peter Watts", estado: "READING", rating: 4 },
  {
    titulo: "Dune Messiah",
    autor: "Frank Herbert",
    estado: "TO READ",
    rating: 0,
  },
  { titulo: "Hyperion", autor: "Dan Simmons", estado: "READ", rating: 5 },
  {
    titulo: "Snow Crash",
    autor: "Neal Stephenson",
    estado: "READING",
    rating: 3,
  },
  { titulo: "Foundation", autor: "Isaac Asimov", estado: "READ", rating: 5 },
  {
    titulo: "The Left Hand",
    autor: "Ursula K. Le Guin",
    estado: "TO READ",
    rating: 0,
  },
];

const FILTROS: Array<"ALL" | Estado> = ["ALL", "TO READ", "READING", "READ"];

const COLOR_POR_ESTADO: Record<Estado, string> = {
  "TO READ": "#FFD500",
  READING: "#4D7FFF",
  READ: "#7aad3f",
};

function Estrellas({ rating }: { rating: number }) {
  return (
    <div className="tarjeta-libro__estrellas" aria-label={`${rating} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`tarjeta-libro__estrella ${
            n <= rating ? "tarjeta-libro__estrella--activa" : ""
          }`}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.26 6.86.6-5.21 4.53 1.56 6.72L12 16.9 5.89 20.1l1.56-6.72L2.24 8.86l6.86-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Biblioteca() {
  const [filtroActivo, setFiltroActivo] = useState<"ALL" | Estado>("ALL");

  const librosVisibles =
    filtroActivo === "ALL"
      ? LIBROS
      : LIBROS.filter((libro) => libro.estado === filtroActivo);

  return (
    <div className="biblioteca">
      <Sidebar itemActivo="My Books" />

      <main className="biblioteca__contenido">
        <header className="biblioteca__cabecera">
          <div>
            <h1 className="biblioteca__titulo">My Library</h1>
            <p className="biblioteca__subtitulo">Your collection, untuned.</p>
          </div>

          <div className="biblioteca__busqueda">
            <svg
              className="biblioteca__lupa"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="biblioteca__buscador"
              type="search"
              placeholder="Search titles, authors..."
              aria-label="Buscar libros"
            />
          </div>
        </header>

        <div
          className="biblioteca__filtros"
          role="tablist"
          aria-label="Filtrar por estado"
        >
          {FILTROS.map((filtro) => (
            <button
              key={filtro}
              className={`biblioteca__filtro ${
                filtroActivo === filtro ? "biblioteca__filtro--activo" : ""
              }`}
              type="button"
              role="tab"
              aria-selected={filtroActivo === filtro}
              onClick={() => setFiltroActivo(filtro)}
            >
              {filtro}
            </button>
          ))}
        </div>

        <section
          id="libros"
          className="biblioteca__rejilla"
          aria-label="Mis libros"
        >
          {librosVisibles.map((libro) => (
            <article className="tarjeta-libro" key={libro.titulo}>
              <span className="tarjeta-libro__estado">{libro.estado}</span>

              <div
                className="tarjeta-libro__portada"
                style={{
                  backgroundColor: COLOR_POR_ESTADO[libro.estado],
                }}
              >
                <span className="tarjeta-libro__titulo">{libro.titulo}</span>
              </div>

              <div className="tarjeta-libro__detalles">
                <span className="tarjeta-libro__autor">{libro.autor}</span>
                <div className="tarjeta-libro__acciones">
                  <Estrellas rating={libro.rating} />
                  <button className="tarjeta-libro__editar" type="button">
                    Edit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
