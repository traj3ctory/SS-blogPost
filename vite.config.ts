import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@": path.resolve(new URL("./src", import.meta.url).pathname),
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
