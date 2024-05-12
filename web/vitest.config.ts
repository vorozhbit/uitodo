import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: "src",
  test: {
    globals: true,
    environment: "jsdom",
    clearMocks: true,
    setupFiles: ["./test/setup.ts"],
    coverage: {
      all: true,
    },
  },
  plugins: [tsconfigPaths()],
});
