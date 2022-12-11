import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import express, { Express } from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import http from "http";

import "reflect-metadata";

import { serverConfig } from "./config/server";
import { dataConfig } from "./config/data";

export class App {
    app: Express;

    constructor() {
        this.app = express();
    }

    async run() {
        await mongoose.connect(
            `mongodb://${dataConfig.host}:${dataConfig.port}/${dataConfig.database}`
        );

        const httpServer = http.createServer(this.app);
        const io = new Server(httpServer);

        httpServer.listen(serverConfig.port, () => {
            console.log(`Server is running on port: ${serverConfig.port}`);
        });
    }
}
