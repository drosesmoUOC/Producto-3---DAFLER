import config from "./config/index.js";
import { createApp } from "./app.js";

const app = createApp();

const server = app.listen(config.port, config.host, () => {
    console.log(`Servidor en http://${config.host}:${config.port}`);
});
