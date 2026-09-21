import { afterEach, describe, expect, it, vi } from "vitest";

async function loadRuntime() {
  vi.resetModules();
  return import("./runtime.js");
}

afterEach(() => {
  vi.resetModules();
});

describe("runtime URL authority", () => {
  it("uses the secure historical API default", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "");
    vi.stubEnv("VITE_APP_BASE_URL", "");

    const { API_BASE_URL, apiUrl } = await loadRuntime();

    expect(API_BASE_URL).toBe("https://trackit.somee.com");
    expect(apiUrl("/api/User/profile")).toBe(
      "https://trackit.somee.com/api/User/profile",
    );
    expect(apiUrl("api/User/login")).toBe(
      "https://trackit.somee.com/api/User/login",
    );
  });

  it("normalizes a configured API base URL", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com/");
    vi.stubEnv("VITE_APP_BASE_URL", "");

    const { API_BASE_URL, apiUrl } = await loadRuntime();

    expect(API_BASE_URL).toBe("https://api.example.com");
    expect(apiUrl("/health")).toBe("https://api.example.com/health");
  });

  it("derives callback URLs from the current browser origin by default", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "");
    vi.stubEnv("VITE_APP_BASE_URL", "");

    const { callbackUrl } = await loadRuntime();

    expect(callbackUrl("/resetear-contrasenia")).toBe(
      new URL("/resetear-contrasenia", `${window.location.origin}/`).toString(),
    );
  });

  it("honors an explicit public frontend callback base", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "");
    vi.stubEnv("VITE_APP_BASE_URL", "https://trackit.example.com/");

    const { callbackUrl } = await loadRuntime();

    expect(callbackUrl("/confirmacion-registro")).toBe(
      "https://trackit.example.com/confirmacion-registro",
    );
  });

  it("rejects non-http browser configuration", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "javascript:alert(1)");
    vi.stubEnv("VITE_APP_BASE_URL", "");

    await expect(loadRuntime()).rejects.toThrow(
      "VITE_API_BASE_URL must use http or https",
    );
  });
});
