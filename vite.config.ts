import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  server: {
    host: true,
    port: 8080,
    strictPort: false,
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
      server: { entry: "server" },
    }),
    react(),
    // Wrap the SSR bundle into a deployable server during `vite build`.
    // Preset is resolved from NITRO_PRESET (e.g. "netlify" on Netlify); falls back to node-server.
    ...(command === "build" ? [nitro({ defaultPreset: "node-server" })] : []),
  ],
}));
