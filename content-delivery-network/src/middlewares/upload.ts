import { GridFsStorage } from "multer-gridfs-storage";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import multer from "multer";

import { dataConfig } from "../config/data";
import { AuthRequest } from "./auth";

export class UploadMiddleware {
    upload(filename: string) {
        const storage = new GridFsStorage({
            url: `mongodb://${dataConfig.username}:${dataConfig.password}@${dataConfig.host}:${dataConfig.port}/${dataConfig.database}`,
            file: (req: Request, file: Express.Multer.File) => {
                return new Promise((resolve, reject) => {
                    const { token } = req as AuthRequest;
                    if (!token) {
                        reject(new Error("Unauthorized!"));
                        return;
                    }

                    const fileMimeTypes = /jpeg|jpg|png|gif/;
                    const mimeType = fileMimeTypes.test(file.mimetype);

                    if (!mimeType) {
                        reject(new Error("File type not supported!"));
                        return;
                    }

                    const uniqueSuffix = uuidv4();
                    const fileInfo = {
                        filename: uniqueSuffix,
                        bucketName: dataConfig.bucket,
                    };

                    resolve(fileInfo);
                });
            },
        });

        const upload = multer({ storage });

        return upload.array(filename);
    }
}
