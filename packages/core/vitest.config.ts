import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      all: true,
      provider: "istanbul",
      reporter: ["lcov", "html"],
      reportOnFailure: true,
      allowExternal: true,
      exclude: [...coverageConfigDefaults.exclude],
    },
  },
});
