import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://nissmart-engine-ledger.vercel.app",
        changeOrigin: true,
      },
    },
  },

  plugins: [react(), eslint()],
    base: '/',

});
