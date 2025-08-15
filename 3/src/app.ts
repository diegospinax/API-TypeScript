import express, { Request, Response } from "express";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.routes();
  }

  private routes = (): void => {
    this.app.get("/", (resquest: Request, response: Response) => {
      response.send("Hola");
    });

    this.app.get("/check", (resquest: Request, response: Response) => {
      response.send("I'm listening.");
    });
  };

  public getApp() {
    return this.app;
  }
}

export default new App().getApp();
