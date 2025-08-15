import app from "./infrastructure/web/app";
import { ServerBootstrap } from "./infrastructure/bootstrap/server.bootstrap";

const server = new ServerBootstrap(app);

(async () => {
  try {
    const instances = [server.init()];
    await Promise.all(instances);
  } catch (err) {
    console.error("Error starting server.", err);
  }
})();
