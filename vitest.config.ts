import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
  mergeConfig,
} from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        all: true,
        include: ["src/**/*.[jt]s?(x)"],
        exclude: [
          "src/**/*.stories.[jt]s?(x)",
          "src/test-utils/**",
          "src/mocks/**",
          "**/node_modules/**",
          "**/playwright-tests/**",
          ...coverageConfigDefaults.exclude,
        ],
        thresholds: {
          lines: 1,
          functions: 1,
          branches: 1,
          statements: 1,
        },
      },
      environment: "jsdom",
      setupFiles: ["./test-utils/vitest.setup.ts"],
      globals: false,
      logHeapUsage: true,
      watch: false,
      projects: [
        {
          extends: true,
          test: {
            name: "unit",
            include: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
            exclude: [...defaultExclude, "**/playwright-tests/**"],
          },
        },
      ],
    },
  }),
);
