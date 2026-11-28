import { buildSchema } from "graphql";

/** Definición SDL del esquema GraphQL. */
export const typeDefs = /* GraphQL */ `
    "Usuario de la plataforma (la contraseña nunca se expone)."
    type User {
        id: ID!
        name: String!
        email: String!
        nativeLang: String!
        city: String
    }

    "Oferta o petición de intercambio de idioma."
    type Exchange {
        id: ID!
        "Oferta | Petición"
        service: String!
        lang: String!
        level: String!
        "Presencial | En línia"
        type: String!
        "Nombre del usuario que lo publica."
        user: String!
        title: String!
        description: String!
        "Fecha en formato dd-mm-aa."
        date: String!
    }

    "Intercambios que un usuario ha arrastrado a su dashboard."
    type Selection {
        email: String!
        exchanges: [Exchange!]!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
        nativeLang: String!
        city: String
    }

    input UserUpdateInput {
        name: String
        email: String
        password: String
        nativeLang: String
        city: String
    }

    input ExchangeInput {
        service: String!
        lang: String!
        level: String!
        type: String!
        user: String!
        title: String!
        description: String!
        date: String
    }

    input ExchangeUpdateInput {
        service: String
        lang: String
        level: String
        type: String
        user: String
        title: String
        description: String
        date: String
    }

    input ExchangeFilter {
        service: String
        lang: String
        level: String
        type: String
        user: String
    }

    type Query {
        "Todos los usuarios (getUsers)."
        users: [User!]!
        "Usuario por id (getUserById)."
        user(id: ID!): User
        "Usuario por email (getUserByEmail)."
        userByEmail(email: String!): User
        "Usuario que ha iniciado sesión (getActiveUser)."
        me: User
        "Intercambios, con filtros opcionales (obtainExchanges)."
        exchanges(filter: ExchangeFilter): [Exchange!]!
        "Intercambio por id."
        exchange(id: ID!): Exchange
        "Selección del dashboard; sin email, la del usuario de la sesión."
        selection(email: String): Selection!
    }

    type Mutation {
        "Crea un usuario (setUser)."
        createUser(input: UserInput!): User!
        "Actualiza los campos indicados de un usuario."
        updateUser(id: ID!, input: UserUpdateInput!): User!
        "Borra un usuario (removeUserById)."
        removeUser(id: ID!): Boolean!
        "Crea un intercambio (createExchange)."
        createExchange(input: ExchangeInput!): Exchange!
        "Actualiza los campos indicados de un intercambio."
        updateExchange(id: ID!, input: ExchangeUpdateInput!): Exchange!
        "Borra un intercambio (removeExchange)."
        removeExchange(id: ID!): Boolean!
        "Guarda la selección del dashboard; sin email, la del usuario de la sesión."
        setSelection(exchangeIds: [ID!]!, email: String): Selection!
    }
`;

/** Esquema ejecutable. */
export const schema = buildSchema(typeDefs);
