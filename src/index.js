import config from "./config/index.js";
import { createApp } from "./app.js";

const app = createApp();

const server = app.listen(config.port, config.host, () => {
    console.log(`Servidor en http://${config.host}:${config.port}`);
});

/** Cierra el servidor HTTP de forma ordenada. */
function shutdown() {
    server.close(() => process.exit(0));
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

// En modo dev (vite-node --watch) el módulo se vuelve a ejecutar: se libera el puerto antes de recargar.
import.meta.hot?.dispose(() => {
    process.off("SIGINT", shutdown);
    process.off("SIGTERM", shutdown);
    return new Promise((resolve) => server.close(resolve));
});
