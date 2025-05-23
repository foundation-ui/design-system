import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      all: true,
      enabled: true,
      provider: "istanbul",
      reporter: ["lcov", "html", "text", "json-summary", "json"],
      reportOnFailure: true,
      allowExternal: true,
      exclude: [...coverageConfigDefaults.exclude, "**/*.stories.*"],
    },
  },
});
