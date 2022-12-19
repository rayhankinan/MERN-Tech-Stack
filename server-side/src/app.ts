import { graphqlHTTP, GraphQLParams } from "express-graphql";
import { buildSchema } from "type-graphql";
import express, { Express, Request, Response } from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import http from "http";

import "reflect-metadata";

import { AuthMiddleware, AuthRequest } from "./middlewares/auth";
import { UserResolver } from "./resolvers/user";
import { serverConfig } from "./config/server";
import { dataConfig } from "./config/data";

export class App {
    app: Express;

    constructor() {
        this.app = express();
    }

    async run() {
        await mongoose.connect(
            `mongodb://${dataConfig.username}:${dataConfig.password}@${dataConfig.host}:${dataConfig.port}/${dataConfig.database}`
        );

        const authMiddleware = new AuthMiddleware();
        const schema = await buildSchema({
            resolvers: [UserResolver],
            emitSchemaFile: false,
        });

        this.app.use(
            "/",
            authMiddleware.authenticate(),
            graphqlHTTP(
                (req: Request, res: Response, graphQLparams: GraphQLParams) => {
                    return {
                        schema: schema,
                        context: {
                            token: (req as AuthRequest).token,
                        },
                    };
                }
            )
        );

        const httpServer = http.createServer(this.app);
        const io = new Server(httpServer);

        // TODO: Integrate Socket.IO with GraphQL

        httpServer.listen(serverConfig.port, () => {
            console.log(`Server is running on port: ${serverConfig.port}`);
        });
    }
}
