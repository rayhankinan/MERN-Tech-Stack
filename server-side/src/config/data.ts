export const dataConfig: {
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
    bucket: string;
} = {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    port: +process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE,
    bucket: process.env.GRIDFS_BUCKET,
};
