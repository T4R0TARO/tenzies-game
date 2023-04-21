import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // This is the base url of your website
  base: `/tenzies-game/`,
  plugins: [react()],
});
