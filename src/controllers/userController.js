import * as User from "../models/userModel.js";
import { validate, userRules } from "../utils/validators.js";
import { notFound, conflict } from "../utils/AppError.js";

/** Quita la contraseña antes de devolver un usuario. @param {object} user */
export function toPublic({ password, ...user }) {
    return user;
}

/** @returns {Promise<object[]>} Todos los usuarios. */
export async function getUsers() {
    return (await User.findAll()).map(toPublic);
}

/** @param {string} id @returns {Promise<object>} @throws 404 si no existe. */
export async function getUserById(id) {
    const user = await User.findById(id);
    if (!user) throw notFound(`No existe el usuario ${id}.`);
    return toPublic(user);
}

/** @param {string} email @returns {Promise<object>} @throws 404 si no existe. */
export async function getUserByEmail(email) {
    const user = await User.findByEmail(email.trim().toLowerCase());
    if (!user) throw notFound(`No existe el usuario ${email}.`);
    return toPublic(user);
}

/** @param {object} input Datos del usuario. @returns {Promise<object>} Usuario creado. @throws 409 si el email existe. */
export async function createUser(input) {
    const data = validate(input, userRules);
    data.email = data.email.toLowerCase();
    if (await User.findByEmail(data.email)) throw conflict(`El email ${data.email} ya está registrado.`);
    return toPublic(await User.create(data));
}

/** @param {string} id @param {object} input Campos a cambiar. @returns {Promise<object>} */
export async function updateUser(id, input) {
    const data = validate(input, userRules, { partial: true });
    if (data.email) {
        data.email = data.email.toLowerCase();
        const other = await User.findByEmail(data.email);
        if (other && other.id !== id) throw conflict(`El email ${data.email} ya está registrado.`);
    }
    const user = await User.update(id, data);
    if (!user) throw notFound(`No existe el usuario ${id}.`);
    return toPublic(user);
}

/** @param {string} id @returns {Promise<boolean>} true si se ha borrado. @throws 404 si no existe. */
export async function removeUser(id) {
    if (!(await User.remove(id))) throw notFound(`No existe el usuario ${id}.`);
    return true;
}
