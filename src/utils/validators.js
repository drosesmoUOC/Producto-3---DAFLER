import { langs, levels, types, services } from "../data/sampleData.js";
import { badRequest } from "./AppError.js";

/**
 * @typedef {object} Rule
 * @property {boolean} [required] El campo es obligatorio al crear.
 * @property {string[]} [oneOf] Valores permitidos.
 * @property {RegExp} [pattern] Formato que debe cumplir.
 * @property {number} [minLength] Longitud mínima (tras quitar espacios).
 */

/** Reglas de un usuario. @type {Record<string, Rule>} */
export const userRules = {
    name: { required: true, minLength: 2 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 4 },
    nativeLang: { required: true, oneOf: langs },
    city: { minLength: 2 }
};

/** Reglas de un intercambio. @type {Record<string, Rule>} */
export const exchangeRules = {
    service: { required: true, oneOf: services },
    lang: { required: true, oneOf: langs },
    level: { required: true, oneOf: levels },
    type: { required: true, oneOf: types },
    user: { required: true, minLength: 2 },
    title: { required: true, minLength: 3 },
    description: { required: true, minLength: 3 },
    date: { pattern: /^\d{2}-\d{2}-\d{2}$/ }
};

/**
 * Valida los datos y devuelve solo los campos conocidos, con los textos recortados.
 * @param {object} data Datos de entrada.
 * @param {Record<string, Rule>} rules Reglas por campo.
 * @param {{ partial?: boolean }} [options] partial: no exige los obligatorios (actualizaciones).
 * @returns {object} Datos limpios.
 * @throws {import("./AppError.js").AppError} 400 con todos los errores encontrados.
 */
export function validate(data, rules, { partial = false } = {}) {
    const errors = [];
    const clean = {};

    for (const [field, rule] of Object.entries(rules)) {
        const value = typeof data[field] === "string" ? data[field].trim() : data[field];

        if (value === undefined || value === null || value === "") {
            if (rule.required && !partial) errors.push(`${field} es obligatorio`);
            continue;
        }
        if (typeof value !== "string") errors.push(`${field} debe ser texto`);
        else if (rule.oneOf && !rule.oneOf.includes(value)) errors.push(`${field} debe ser uno de: ${rule.oneOf.join(", ")}`);
        else if (rule.pattern && !rule.pattern.test(value)) errors.push(`${field} no tiene un formato válido`);
        else if (rule.minLength && value.length < rule.minLength) errors.push(`${field} debe tener al menos ${rule.minLength} caracteres`);
        else clean[field] = value;
    }

    if (errors.length) throw badRequest(`Datos no válidos: ${errors.join("; ")}.`);
    if (partial && !Object.keys(clean).length) throw badRequest("No se ha indicado ningún campo válido.");
    return clean;
}
