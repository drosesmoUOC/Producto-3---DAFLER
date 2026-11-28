import { GraphQLError } from "graphql";
import * as users from "../controllers/userController.js";
import * as exchanges from "../controllers/exchangeController.js";
import * as selections from "../controllers/selectionController.js";
import { AppError, badRequest } from "../utils/AppError.js";

/**
 * Envuelve un resolver para traducir los errores al formato GraphQL.
 * @param {(args: object, context: object) => Promise<any>} fn
 */
function resolver(fn) {
    return async (args, context) => {
        try {
            return await fn(args, context);
        } catch (err) {
            if (err instanceof AppError) {
                throw new GraphQLError(err.message, { extensions: { code: err.code, status: err.status } });
            }
            console.error(err);
            throw new GraphQLError("Error interno del servidor.", { extensions: { code: "INTERNAL_SERVER_ERROR", status: 500 } });
        }
    };
}

/** Email indicado o, si no hay, el del usuario autenticado. */
function emailOrActive(email, context) {
    const value = email ?? context.user?.email;
    if (!value) throw badRequest("Indica el email del usuario.");
    return value.trim().toLowerCase();
}

/** Resolvers raíz (rootValue): un campo por cada Query y Mutation del esquema. */
export const rootValue = {
    // Query
    users: resolver(() => users.getUsers()),
    user: resolver(({ id }) => users.getUserById(id)),
    userByEmail: resolver(({ email }) => users.getUserByEmail(email)),
    me: resolver((args, context) => (context.user ? users.getUserById(context.user.id) : null)),
    exchanges: resolver(({ filter }) => exchanges.getExchanges(filter ?? {})),
    exchange: resolver(({ id }) => exchanges.getExchangeById(id)),
    selection: resolver(({ email }, context) => selections.getSelection(emailOrActive(email, context))),

    // Mutation
    createUser: resolver(({ input }) => users.createUser(input)),
    updateUser: resolver(({ id, input }) => users.updateUser(id, input)),
    removeUser: resolver(({ id }) => users.removeUser(id)),
    createExchange: resolver(({ input }) => exchanges.createExchange(input)),
    updateExchange: resolver(({ id, input }) => exchanges.updateExchange(id, input)),
    removeExchange: resolver(({ id }) => exchanges.removeExchange(id)),
    setSelection: resolver(({ exchangeIds, email }, context) => selections.setSelection(emailOrActive(email, context), exchangeIds))
};
