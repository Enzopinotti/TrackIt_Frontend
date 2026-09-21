import React, { useContext } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  AuthContext,
  AuthProvider,
} from "./AuthContext.js";
import { apiUrl } from "../config/runtime.js";

function AuthProbe() {
  const { user, token, loading, login, logout } = useContext(AuthContext);

  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="token">{token || "none"}</span>
      <span data-testid="user">{user?.name || "none"}</span>
      <button type="button" onClick={() => login("new-token")}>
        login
      </button>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
}

function renderAuth() {
  return render(
    <AuthProvider>
      <AuthProbe />
    </AuthProvider>,
  );
}

describe("AuthProvider", () => {
  it("settles unauthenticated without calling the backend when no token exists", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    renderAuth();

    await waitFor(() =>
      expect(screen.getByTestId("loading")).toHaveTextContent("false"),
    );

    expect(screen.getByTestId("token")).toHaveTextContent("none");
    expect(screen.getByTestId("user")).toHaveTextContent("none");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("restores a stored token by loading the external profile", async () => {
    localStorage.setItem("authToken", "stored-token");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "user1", name: "Enzo" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderAuth();

    await waitFor(() =>
      expect(screen.getByTestId("user")).toHaveTextContent("Enzo"),
    );

    expect(screen.getByTestId("token")).toHaveTextContent("stored-token");
    expect(fetchMock).toHaveBeenCalledWith(
      apiUrl("/api/User/profile"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer stored-token",
        }),
      }),
    );
  });

  it("invalidates a stored token when profile restoration fails", async () => {
    localStorage.setItem("authToken", "expired-token");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Unauthorized",
      }),
    );

    renderAuth();

    await waitFor(() =>
      expect(screen.getByTestId("loading")).toHaveTextContent("false"),
    );

    expect(localStorage.getItem("authToken")).toBeNull();
    expect(screen.getByTestId("token")).toHaveTextContent("none");
    expect(screen.getByTestId("user")).toHaveTextContent("none");
  });

  it("stores a login token, loads the profile, and logout clears auth state", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "user2", name: "TrackIt User" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderAuth();

    await waitFor(() =>
      expect(screen.getByTestId("loading")).toHaveTextContent("false"),
    );

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    await waitFor(() =>
      expect(screen.getByTestId("user")).toHaveTextContent("TrackIt User"),
    );

    expect(localStorage.getItem("authToken")).toBe("new-token");
    expect(screen.getByTestId("token")).toHaveTextContent("new-token");

    fireEvent.click(screen.getByRole("button", { name: "logout" }));

    expect(localStorage.getItem("authToken")).toBeNull();
    expect(screen.getByTestId("token")).toHaveTextContent("none");
    expect(screen.getByTestId("user")).toHaveTextContent("none");
  });
});
