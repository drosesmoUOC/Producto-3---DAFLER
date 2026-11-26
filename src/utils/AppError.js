/** Error controlado de la aplicación: lleva el código HTTP y un código legible. */
export class AppError extends Error {
    /**
     * @param {string} message Mensaje para el cliente.
     * @param {number} [status=500] Código HTTP.
     * @param {string} [code="INTERNAL_SERVER_ERROR"] Código legible.
     */
    constructor(message, status = 500, code = "INTERNAL_SERVER_ERROR") {
        super(message);
        this.name = "AppError";
        this.status = status;
        this.code = code;
    }
}

/** @param {string} message */
export const badRequest = (message) => new AppError(message, 400, "BAD_REQUEST");
/** @param {string} message */
export const unauthorized = (message) => new AppError(message, 401, "UNAUTHENTICATED");
/** @param {string} message */
export const notFound = (message) => new AppError(message, 404, "NOT_FOUND");
/** @param {string} message */
export const conflict = (message) => new AppError(message, 409, "CONFLICT");
