import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

const jsxInJs = {
  name: "trackit-jsx-in-js",
  enforce: "pre",
  async transform(code, id) {
    if (!id.includes("/src/") || !id.endsWith(".js")) {
      return null;
    }

    return transformWithOxc(code, id, {
      lang: "jsx",
      jsx: {
        runtime: "automatic",
      },
    });
  },
};

export default defineConfig({
  plugins: [
    jsxInJs,
    react({
      include: /\.[jt]sx?$/,
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    passWithNoTests: false,
  },
});
