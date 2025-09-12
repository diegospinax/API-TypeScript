import express, { Request, Response } from "express";
import userRoutes from "../routes/UserRoutes";
import cors from "cors";

class App {
  private app: express.Application;

  private middleware = () => {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes = (): void => {
    this.app.use("/api", userRoutes)
  };

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  public getApp() {
    return this.app;
  }
}

export default new App().getApp();
