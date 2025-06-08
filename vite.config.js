import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  server: {
    port: 2705,
  },
  optimizeDeps: { // to comment for prod
    include: ['@xterm/xterm']
  },
  resolve: { // to comment for prod
    alias: {
      '@xterm/xterm': '@xterm/xterm/lib/xterm.js', // force the ESM entry
    }
  },
});
