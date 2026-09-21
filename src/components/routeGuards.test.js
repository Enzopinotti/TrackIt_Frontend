import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router";
import ProtectedRoute from "./ProtectedRoute.js";
import PublicRoute from "./PublicRoute.js";
import { AuthContext } from "../context/AuthContext.js";

function authValue(overrides = {}) {
  return {
    user: null,
    token: null,
    loading: false,
    login: async () => {},
    logout: () => {},
    updateUser: () => {},
    ...overrides,
  };
}

function renderProtected(value) {
  render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <div>private-content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>public-root</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

function renderPublic(value) {
  render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={["/public"]}>
        <Routes>
          <Route
            path="/public"
            element={
              <PublicRoute>
                <div>public-content</div>
              </PublicRoute>
            }
          />
          <Route path="/home" element={<div>home-content</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe("route guards", () => {
  it("shows loading while protected auth state is unresolved", () => {
    renderProtected(authValue({ loading: true }));

    expect(document.querySelector(".loading-animation")).toBeInTheDocument();
    expect(screen.queryByText("private-content")).not.toBeInTheDocument();
  });

  it("redirects unauthenticated protected routes to the public root", () => {
    renderProtected(authValue());

    expect(screen.getByText("public-root")).toBeInTheDocument();
  });

  it("renders protected content for an authenticated user", () => {
    renderProtected(authValue({ user: { id: "user1" } }));

    expect(screen.getByText("private-content")).toBeInTheDocument();
  });

  it("shows loading while public auth state is unresolved", () => {
    renderPublic(authValue({ loading: true }));

    expect(document.querySelector(".loading-animation")).toBeInTheDocument();
    expect(screen.queryByText("public-content")).not.toBeInTheDocument();
  });

  it("redirects authenticated users away from public auth pages", () => {
    renderPublic(authValue({ user: { id: "user1" } }));

    expect(screen.getByText("home-content")).toBeInTheDocument();
  });

  it("renders public auth pages for unauthenticated users", () => {
    renderPublic(authValue());

    expect(screen.getByText("public-content")).toBeInTheDocument();
  });
});
