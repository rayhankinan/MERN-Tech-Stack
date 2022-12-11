import express, { Express } from "express";
import mongoose from "mongoose";
import http from "http";

import { ContentRoute } from "./routes/content";
import { serverConfig } from "./config/server";
import { dataConfig } from "./config/data";

export class App {
    app: Express;

    constructor() {
        const contentRoute = new ContentRoute();

        this.app = express();
        this.app.use(
            express.json(),
            express.urlencoded({ extended: true }),
            contentRoute.getRoute()
        );
    }

    async run() {
        await mongoose.connect(
            `mongodb://${dataConfig.host}:${dataConfig.port}/${dataConfig.database}`
        );

        const httpServer = http.createServer(this.app);

        httpServer.listen(serverConfig.port, () => {
            console.log(`Server is running on port: ${serverConfig.port}`);
        });
    }
}
