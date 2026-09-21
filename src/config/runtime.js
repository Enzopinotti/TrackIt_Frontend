const DEFAULT_API_BASE_URL = "https://trackit.somee.com";

function normalizeHttpBaseUrl(value, label) {
  const candidate = value?.trim();

  if (!candidate) {
    return "";
  }

  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error(`${label} must be an absolute http(s) URL`);
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error(`${label} must use http or https`);
  }

  return parsed.toString().replace(/\/$/, "");
}

const configuredApiBaseUrl = normalizeHttpBaseUrl(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
  "VITE_API_BASE_URL",
);

const configuredAppBaseUrl = normalizeHttpBaseUrl(
  import.meta.env.VITE_APP_BASE_URL || "",
  "VITE_APP_BASE_URL",
);

export const API_BASE_URL = configuredApiBaseUrl;

export function apiUrl(pathname = "") {
  if (!pathname) {
    return API_BASE_URL;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export function callbackUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  const browserOrigin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "";

  const baseUrl = configuredAppBaseUrl || browserOrigin;

  if (!baseUrl) {
    return normalizedPath;
  }

  return new URL(normalizedPath, `${baseUrl}/`).toString();
}
