import * as Selection from "../models/selectionModel.js";
import * as Exchange from "../models/exchangeModel.js";
import { badRequest } from "../utils/AppError.js";

/** @param {string} email @returns {Promise<{email: string, exchanges: object[]}>} Selección con los intercambios completos. */
export async function getSelection(email) {
    const selection = await Selection.findByEmail(email);
    const items = await Promise.all(selection.exchanges.map((id) => Exchange.findById(id)));
    return { email, exchanges: items.filter(Boolean) };
}

/**
 * Sustituye la selección del usuario.
 * @param {string} email
 * @param {string[]} exchangeIds Ids de los intercambios seleccionados.
 * @returns {Promise<{email: string, exchanges: object[]}>}
 * @throws 400 si algún intercambio no existe.
 */
export async function setSelection(email, exchangeIds) {
    const ids = [...new Set(exchangeIds)];
    const items = await Promise.all(ids.map((id) => Exchange.findById(id)));
    const missing = ids.filter((id, i) => !items[i]);
    if (missing.length) throw badRequest(`No existen los intercambios: ${missing.join(", ")}.`);
    await Selection.save(email, ids);
    return { email, exchanges: items };
}
