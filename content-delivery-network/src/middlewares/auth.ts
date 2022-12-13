import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/jwt";

export interface AuthToken {
    userID: number;
}

export interface AuthRequest extends Request {
    token: AuthToken;
}

export class AuthMiddleware {
    authenticate() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req
                    .header("Authorization")
                    .replace("Bearer ", "");

                if (!token) {
                    res.status(StatusCodes.UNAUTHORIZED).json({
                        message: ReasonPhrases.UNAUTHORIZED,
                    });
                    return;
                }

                (req as AuthRequest).token = jwt.verify(
                    token,
                    jwtConfig.secret
                ) as AuthToken;

                next();
            } catch (error) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
            }
        };
    }
}
