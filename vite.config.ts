import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/codex-game-operator-v7/" : "/",
  plugins: [react()],
  test: {
    globals: true,
  },
});
