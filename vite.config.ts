/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // vitestの設定を書くところ
    globals: true,
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
  },
});
