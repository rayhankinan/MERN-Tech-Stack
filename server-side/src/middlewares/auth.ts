import { Request, Response, RequestHandler, NextFunction } from "express";
import { AuthChecker } from "type-graphql";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";

import { UserModel } from "../entities/user";
import { jwtConfig } from "../config/jwt";

export interface AuthToken {
    userID: ObjectId;
}

export interface AuthRequest extends Request {
    token: AuthToken;
}

export interface AuthContext {
    token: AuthToken;
}

export class AuthMiddleware {
    authenticate(): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req
                    .header("Authorization")
                    .replace("Bearer ", "");

                (req as AuthRequest).token = jwt.verify(
                    token,
                    jwtConfig.secret
                ) as AuthToken;
            } catch (error) {
                (req as AuthRequest).token = null;
            } finally {
                next();
            }
        };
    }

    checker(): AuthChecker<AuthContext> {
        return async ({ context: { token } }, roles) => {
            if (roles.length === 0) {
                return token !== undefined;
            }

            if (!token) {
                return false;
            }

            const user = await UserModel.findById(token.userID);

            return false;
        };
    }
}
