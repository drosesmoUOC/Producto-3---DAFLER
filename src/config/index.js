import "dotenv/config";

/**
 * Configuración central de la aplicación.
 * Cada valor se lee del archivo .env (o del entorno) y, si no existe, se usa el valor por defecto.
 * @type {{
 *   host: string, port: number,
 *   mongo: { uri: string, dbName: string },
 *   jwt: { secret: string, expiresIn: string }
 * }}
 */
const config = {
    host: process.env.HOST ?? "localhost",
    port: Number(process.env.PORT ?? 4000),
    mongo: {
        uri: process.env.MONGO_URI ?? "mongodb://localhost:27017",
        dbName: process.env.MONGO_DB_NAME ?? "tandemDafler"
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? "dafler-secreto-desarrollo",
        expiresIn: process.env.JWT_EXPIRES_IN ?? "2h"
    }
};

if (!process.env.JWT_SECRET) {
    console.warn("JWT_SECRET no definido: se usa el secreto por defecto (solo para desarrollo).");
}

export default config;
