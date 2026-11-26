import { defineConfig } from "vite";

export default defineConfig({
    build: {
        ssr: "src/index.js",
        outDir: "dist",
        target: "node20",
        emptyOutDir: true
    }
});
