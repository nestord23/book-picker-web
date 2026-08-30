"use client";

import { useState } from "react";
import Link from "next/link";
import "./registro.css";
import "../boton/boton.css";
import "../decoracion/decoracion.css";

export default function Registro() {
  const [verContrasena, setVerContrasena] = useState(false);

  return (
    <div className="registro">
      <span className="decoracion decoracion--azul" />
      <span className="decoracion decoracion--amarilla" />
      <span className="decoracion decoracion--verde" />

      <main className="registro__card">
        <span className="registro__detalle" aria-hidden="true" />

        <header className="registro__cabecera">
          <span className="registro__logo">BOOK PICKER</span>
        </header>

        <div className="registro__cuerpo">
          <h1 className="registro__titulo">Join the club</h1>
          <p className="registro__subtitulo">
            Create an account to start tracking your reading journey with
            aggressive enthusiasm.
          </p>

          <form
            className="registro__formulario"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="registro__campo">
              <label className="registro__etiqueta" htmlFor="nombre">
                Name (optional)
              </label>
              <input
                id="nombre"
                className="registro__input"
                type="text"
                name="nombre"
                autoComplete="name"
                placeholder="Tu nombre"
              />
            </div>

            <div className="registro__campo">
              <label className="registro__etiqueta" htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                className="registro__input"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="registro__campo">
              <label className="registro__etiqueta" htmlFor="password">
                Password *
              </label>
              <div className="registro__contrasena">
                <input
                  id="password"
                  className="registro__input registro__input--con-ojo"
                  type={verContrasena ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
                <button
                  className="registro__ojo"
                  type="button"
                  aria-label={
                    verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setVerContrasena((v) => !v)}
                >
                  {verContrasena ? (
                    <svg
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
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <path d="M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg
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
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="registro__ayuda">Min. 8 characters</p>
            </div>

            <button className="boton boton--azul" type="submit">
              Crear cuenta -&gt;
            </button>
          </form>
        </div>
      </main>

      <footer className="registro__footer">
        <p className="registro__footer-texto">
          Already have an account?{" "}
          <Link className="registro__enlace" href="/">
            LOG IN HERE
          </Link>
        </p>
      </footer>
    </div>
  );
}