import app from "./infrastructure/web/app";
import { ServerBootstrap } from "./infrastructure/bootstrap/server.bootstrap";
import { connection } from "./infrastructure/config/db-connection";

const server = new ServerBootstrap(app);

(async () => {
  try {
    await connection();
    const instances = [server.init()];
    await Promise.all(instances);
  } catch (err) {
    console.error("Error starting server.", err);
  }
})();
