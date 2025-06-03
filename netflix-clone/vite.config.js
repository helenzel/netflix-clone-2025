import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({mode})=> {
  return{
    plugins: [react()],
    base:"/netflix-clone-2025/",
  };
});
