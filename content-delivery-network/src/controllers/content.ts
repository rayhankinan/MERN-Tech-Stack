import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Request, Response } from "express";
import mongoose from "mongoose";

import { AuthRequest } from "../middlewares/auth";
import { dataConfig } from "../config/data";

export class ContentController {
    render() {
        return async (req: Request, res: Response) => {
            const { filename } = req.params;

            const { db } = mongoose.connection;
            const bucket = new mongoose.mongo.GridFSBucket(db, {
                bucketName: dataConfig.bucket,
            });

            const files = await bucket.find({ filename }).toArray();
            if (files.length === 0) {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: ReasonPhrases.NOT_FOUND,
                });
                return;
            }

            res.status(StatusCodes.OK);
            bucket.openDownloadStreamByName(filename).pipe(res);
        };
    }

    upload() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }

            const { filename, destination } = req.file;
            const fileInfo = {
                filename,
                destination,
            };

            res.status(StatusCodes.CREATED).json({
                message: ReasonPhrases.CREATED,
                data: fileInfo,
            });
        };
    }
}
