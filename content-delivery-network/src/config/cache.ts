export const cacheConfig: {
    host: string;
    port: number;
} = {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
};
