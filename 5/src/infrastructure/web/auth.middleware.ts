import { NextFunction, Request, Response } from "express";
import { AuthApplication } from "../../application/AuthApplication";

export const authenticationToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        response.status(401).json();
        return;
    }

    try {
        const payload = AuthApplication.verifyToken(token!);
        (request as any).user = payload;
        next();
    } catch(error) {
        response.status(401).json();
        return;
    }
}