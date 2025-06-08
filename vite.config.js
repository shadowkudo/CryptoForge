import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [reactRouter(), tailwindcss()],
    server: {
      port: 2705,
    },
    ...(isDev && {
      optimizeDeps: {
        include: ['@xterm/xterm']
      },
      resolve: {
        alias: {
          '@xterm/xterm': '@xterm/xterm/lib/xterm.js'
        }
      }
    })
  };
});