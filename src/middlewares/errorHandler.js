import { AppError, notFound } from "../utils/AppError.js";

/** Middleware para rutas inexistentes. */
export function notFoundHandler(req, res, next) {
    next(notFound(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

/**
 * Middleware final de errores: responde { error: { code, message } }.
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ error: { code: "BAD_REQUEST", message: "El cuerpo de la petición no es JSON válido." } });
    }

    if (err instanceof AppError) {
        return res.status(err.status).json({ error: { code: err.code, message: err.message } });
    }

    console.error(err);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Error interno del servidor." } });
}
