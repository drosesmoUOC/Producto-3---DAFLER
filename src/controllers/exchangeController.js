import * as Exchange from "../models/exchangeModel.js";
import * as Selection from "../models/selectionModel.js";
import { validate, exchangeRules } from "../utils/validators.js";
import { notFound } from "../utils/AppError.js";

/** Fecha de hoy en formato dd-mm-aa, como en el producto 2. */
function today() {
    const d = new Date();
    return [d.getDate(), d.getMonth() + 1, d.getFullYear() % 100].map((n) => String(n).padStart(2, "0")).join("-");
}

/**
 * @param {object} [filter] Filtros opcionales: service, lang, level, type, user.
 * @returns {Promise<object[]>}
 */
export async function getExchanges(filter = {}) {
    const given = Object.fromEntries(Object.entries(filter).filter(([, value]) => value != null));
    return Exchange.findAll(Object.keys(given).length ? validate(given, exchangeRules, { partial: true }) : {});
}

/** @param {string} id @returns {Promise<object>} @throws 404 si no existe. */
export async function getExchangeById(id) {
    const item = await Exchange.findById(id);
    if (!item) throw notFound(`No existe el intercambio ${id}.`);
    return item;
}

/** @param {object} input Datos del intercambio. @returns {Promise<object>} Intercambio creado. */
export async function createExchange(input) {
    const data = validate(input, exchangeRules);
    data.date ??= today();
    return Exchange.create(data);
}

/** @param {string} id @param {object} input Campos a cambiar. @returns {Promise<object>} @throws 404 si no existe. */
export async function updateExchange(id, input) {
    const item = await Exchange.update(id, validate(input, exchangeRules, { partial: true }));
    if (!item) throw notFound(`No existe el intercambio ${id}.`);
    return item;
}

/** @param {string} id @returns {Promise<boolean>} @throws 404 si no existe. */
export async function removeExchange(id) {
    if (!(await Exchange.remove(id))) throw notFound(`No existe el intercambio ${id}.`);
    await Selection.removeExchange(id);
    return true;
}
