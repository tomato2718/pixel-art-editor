import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
