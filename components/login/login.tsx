"use client";

import { useState } from "react";
import "./login.css";
import "../boton/boton.css";
import "../decoracion/decoracion.css";
import Image from "next/image";

export default function Login() {
  const [verContrasena, setVerContrasena] = useState(false);
  const [autenticacionFallida, setAutenticacionFallida] = useState(true);

  return (
    <div className="login">
      <span className="decoracion decoracion--azul" />
      <span className="decoracion decoracion--amarilla" />
      <span className="decoracion decoracion--verde" />

      <main className="login__card">
        <header className="login__cabecera">
          <Image
            className="login__logo"
            src="/book_picker_logo.png"
            alt="Book Picker"
            width={1024}
            height={1024}
            loading="eager"
          />
        </header>

        <div className="login__cuerpo">
          <div>
            <h1 className="login__titulo">Welcome back</h1>
            <p className="login__subtitulo">Pick up where you left off</p>
          </div>

          {autenticacionFallida && (
            <div className="login__banner login__banner--error" role="alert">
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
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              Inicio de sesión fallido. Verifica tus credenciales.
            </div>
          )}

          <form
            className="login__formulario"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="login__campo">
              <label className="login__etiqueta" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                className="login__input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="login__campo">
              <label className="login__etiqueta" htmlFor="password">
                Password
              </label>
              <div className="login__contrasena">
                <input
                  id="password"
                  className="login__input login__input--con-ojo"
                  type={verContrasena ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                <button
                  className="login__ojo"
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
            </div>

            <button className="boton boton--primario" type="submit">
              Iniciar sesión
            </button>
          </form>

          <div className="login__enlaces">
            <a className="login__enlace" href="#">
              Forgot password?
            </a>
            <a className="login__enlace" href="/register">
              Register
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
