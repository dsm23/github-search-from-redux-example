import { defineConfig } from "vite";
import eslint from "@nabla/vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    eslint({
      formatter: "stylish",
    }),
    tailwindcss(),
  ],
});
