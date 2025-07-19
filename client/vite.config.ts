import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/w
const _plugins = [react()];
export default defineConfig({
    plugins: _plugins,
    server: {
        proxy: {
            "/api": "http://localhost:3000",
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
