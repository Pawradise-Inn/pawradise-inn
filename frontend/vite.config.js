import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // ensures assets load correctly on Vercel
  server: {
    host: true,           // 0.0.0.0 so Docker can expose it
    watch: {
      usePolling: true,   // force polling so file changes are detected
      interval: 100       // optional: check every 100ms
    }
  }
});
