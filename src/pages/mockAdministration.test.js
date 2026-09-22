import {
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TiposCategorias from "./TiposCategorias/TiposCategorias.js";
import Usuarios from "./Usuarios/Usuarios.js";
import mockTypes from "../data/mockTypes.js";
import mockCategories from "../data/mockCategories.js";

describe("intentional mock/local administration boundaries", () => {
  it("seeds types and categories locally and never calls the backend", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<TiposCategorias />);

    const typeList = within(document.querySelector(".type-list"));
    const categoryList = within(document.querySelector(".category-list"));

    expect(typeList.getByText("Tipo A")).toBeInTheDocument();
    expect(categoryList.getByText("Categoría 1")).toBeInTheDocument();

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("tipos"))).toEqual(mockTypes);
      expect(JSON.parse(localStorage.getItem("categorias"))).toEqual(
        mockCategories,
      );
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("restores locally persisted type/category demo state", () => {
    const customTypes = [
      { id: "type-local", nombre: "Tipo Local", categorias: ["cat-local"] },
    ];
    const customCategories = [
      { id: "cat-local", nombre: "Categoría Local", typeId: "type-local" },
    ];

    localStorage.setItem("tipos", JSON.stringify(customTypes));
    localStorage.setItem("categorias", JSON.stringify(customCategories));

    render(<TiposCategorias />);

    const typeList = within(document.querySelector(".type-list"));
    const categoryList = within(document.querySelector(".category-list"));

    expect(typeList.getByText("Tipo Local")).toBeInTheDocument();
    expect(categoryList.getByText("Categoría Local")).toBeInTheDocument();
    expect(typeList.queryByText("Tipo A")).not.toBeInTheDocument();
  });

  it("keeps the users administration screen on its mock dataset", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<Usuarios />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("María García")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
