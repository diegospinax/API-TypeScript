import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

export class ServerBootstrap {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  public init = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      const PORT = process.env.PORT || 4000;

      server
        .listen(PORT)
        .on("listening", () => {
          console.log(`Server on port ${PORT}`);
          resolve(true);
        })
        .on("error", (err) => {
            console.error(`Error starting server on port ${PORT}`)
            reject(false);
        });
    });
  };
}
