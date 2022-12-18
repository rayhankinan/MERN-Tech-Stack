export const cacheConfig: {
    host: string;
    port: number;
} = {
    host: process.env.ELASTIC_HOST,
    port: +process.env.ELASTIC_PORT,
};
