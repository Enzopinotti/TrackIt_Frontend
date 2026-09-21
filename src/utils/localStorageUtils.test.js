import { describe, expect, it, vi } from "vitest";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./localStorageUtils.js";

describe("localStorage helpers", () => {
  it("returns the provided default when a key is missing", () => {
    expect(loadFromLocalStorage("missing", ["fallback"])).toEqual(["fallback"]);
  });

  it("serializes and restores JSON data", () => {
    const value = { id: "type1", nested: ["cat1"] };

    saveToLocalStorage("demo", value);

    expect(localStorage.getItem("demo")).toBe(JSON.stringify(value));
    expect(loadFromLocalStorage("demo", null)).toEqual(value);
  });

  it("returns the default when stored JSON is malformed", () => {
    localStorage.setItem("broken", "{not-json");
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(loadFromLocalStorage("broken", "safe")).toBe("safe");
  });
});
