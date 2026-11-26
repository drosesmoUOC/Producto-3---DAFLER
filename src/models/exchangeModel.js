import { exchanges as sampleExchanges } from "../data/sampleData.js";

// Persistencia temporal en memoria.
const exchanges = new Map();
let nextId = 1;
sampleExchanges.forEach((item) => exchanges.set(String(nextId), { id: String(nextId++), ...item }));

/**
 * @param {object} [filter={}] Campos que deben coincidir exactamente (service, lang, level, type, user).
 * @returns {Promise<object[]>}
 */
export async function findAll(filter = {}) {
    return [...exchanges.values()].filter((item) => Object.entries(filter).every(([key, value]) => item[key] === value));
}

/** @param {string} id @returns {Promise<object|null>} */
export async function findById(id) {
    return exchanges.get(id) ?? null;
}

/** @param {object} data Intercambio sin id. @returns {Promise<object>} */
export async function create(data) {
    const item = { id: String(nextId++), ...data };
    exchanges.set(item.id, item);
    return item;
}

/** @param {string} id @param {object} changes @returns {Promise<object|null>} */
export async function update(id, changes) {
    const item = exchanges.get(id);
    if (!item) return null;
    Object.assign(item, changes);
    return item;
}

/** @param {string} id @returns {Promise<boolean>} */
export async function remove(id) {
    return exchanges.delete(id);
}
