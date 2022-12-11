import { Router } from "express";

import { AuthMiddleware } from "../middlewares/auth";
import { UploadMiddleware } from "../middlewares/upload";
import { ContentController } from "../controllers/content";

export class ContentRoute {
    authMiddleware: AuthMiddleware;
    uploadMiddleware: UploadMiddleware;
    contentController: ContentController;

    constructor() {
        this.authMiddleware = new AuthMiddleware();
        this.uploadMiddleware = new UploadMiddleware();
        this.contentController = new ContentController();
    }

    getRoute() {
        return Router()
            .get("/:filename", this.contentController.render())
            .post(
                "/",
                this.authMiddleware.authenticate(),
                this.uploadMiddleware.upload("file"),
                this.contentController.upload()
            );
    }
}
