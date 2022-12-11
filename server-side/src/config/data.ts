export const dataConfig: {
    host: string;
    port: number;
    database: string;
} = {
    host: process.env.MONGO_HOST,
    port: +process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE,
};
