
// Persistencia temporal en memoria: email -> { email, exchanges: [ids] }.
const selections = new Map();

/** @param {string} email @returns {Promise<{email: string, exchanges: string[]}>} */
export async function findByEmail(email) {
    return selections.get(email) ?? { email, exchanges: [] };
}

/** @param {string} email @param {string[]} exchangeIds @returns {Promise<{email: string, exchanges: string[]}>} */
export async function save(email, exchangeIds) {
    const selection = { email, exchanges: exchangeIds };
    selections.set(email, selection);
    return selection;
}

/** Quita un intercambio de todas las selecciones (al borrarlo). @param {string} exchangeId */
export async function removeExchange(exchangeId) {
    selections.forEach((s) => { s.exchanges = s.exchanges.filter((id) => id !== exchangeId); });
}
