import { users as sampleUsers } from "../data/sampleData.js";

// Persistencia temporal en memoria.
const users = new Map();
let nextId = 1;
sampleUsers.forEach((user) => users.set(String(nextId), { id: String(nextId++), ...user }));

/** @returns {Promise<object[]>} Todos los usuarios. */
export async function findAll() {
    return [...users.values()];
}

/** @param {string} id @returns {Promise<object|null>} */
export async function findById(id) {
    return users.get(id) ?? null;
}

/** @param {string} email @returns {Promise<object|null>} */
export async function findByEmail(email) {
    return [...users.values()].find((u) => u.email === email) ?? null;
}

/** @param {object} data Usuario sin id. @returns {Promise<object>} Usuario creado. */
export async function create(data) {
    const user = { id: String(nextId++), ...data };
    users.set(user.id, user);
    return user;
}

/** @param {string} id @param {object} changes @returns {Promise<object|null>} Usuario actualizado o null. */
export async function update(id, changes) {
    const user = users.get(id);
    if (!user) return null;
    Object.assign(user, changes);
    return user;
}

/** @param {string} id @returns {Promise<boolean>} true si se ha borrado. */
export async function remove(id) {
    return users.delete(id);
}
