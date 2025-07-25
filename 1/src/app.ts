import express, {Request, Response} from 'express';


const app = express();

app.get("/", (resquest: Request, response: Response) => {
    response.send("Hola");
});

app.get("/check", (resquest: Request, response: Response) => {
    response.send("I'm listening.");
});

export default app;