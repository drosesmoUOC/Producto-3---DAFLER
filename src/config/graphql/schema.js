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
`;

/** Esquema ejecutable. */
export const schema = buildSchema(typeDefs);
