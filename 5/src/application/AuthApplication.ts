import jwt from "jsonwebtoken";

const JWT_KEY: string = process.env.JWT_SECRET || "avocado";

export class AuthApplication {

    static generateToken (payload: object): string {
        return jwt.sign(payload, JWT_KEY, {expiresIn: "1h"});
    }

    static verifyToken(token: string): jwt.JwtPayload | string {
        return jwt.verify(token, JWT_KEY);
    }
}