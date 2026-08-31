"use client";

import Link from "next/link";
import "./sidebar.css";

type Item = {
  etiqueta: string;
  href: string;
};

type SidebarProps = {
  itemActivo?: string;
  items?: Item[];
  logoHref?: string;
  onAgregar?: () => void;
};

const ITEMS_POR_DEFECTO: Item[] = [
  { etiqueta: "My Books", href: "#libros" },
  { etiqueta: "Explore", href: "#explorar" },
  { etiqueta: "Stats", href: "#stats" },
  { etiqueta: "Settings", href: "#ajustes" },
];

export default function Sidebar({
  itemActivo = "My Books",
  items = ITEMS_POR_DEFECTO,
  logoHref = "/",
  onAgregar,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <Link className="sidebar__logo" href={logoHref}>
        BOOK PICKER
      </Link>

      <nav className="sidebar__nav" aria-label="Navegación principal">
        {items.map((item) => (
          <Link
            key={item.etiqueta}
            className={`sidebar__item ${
              itemActivo === item.etiqueta ? "sidebar__item--activo" : ""
            }`}
            href={item.href}
          >
            {item.etiqueta}
          </Link>
        ))}
      </nav>

      <button className="sidebar__cta" type="button" onClick={onAgregar}>
        + Add New Book
      </button>
    </aside>
  );
}
