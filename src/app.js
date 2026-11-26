import express from "express";
import healthRoutes from "./routes/healthRoutes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

/**
 * Crea y configura la aplicación Express (middlewares y rutas).
 * @returns {import("express").Express} Aplicación lista para escuchar.
 */
export function createApp() {
    const app = express();

    app.use(express.json());
    app.use("/api/health", healthRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}
