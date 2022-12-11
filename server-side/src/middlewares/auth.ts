import { Request } from "express";

export interface AuthToken {
    userID: number;
}

export interface AuthRequest extends Request {
    token: AuthToken;
}
