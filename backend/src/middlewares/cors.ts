import cors from 'cors';
import { RequestHandler } from 'express';

let corsMiddleware: RequestHandler = (req, res, next) => next();

declare var process: {
    env: {
        CORS_ENABLED: Boolean;
        CORS_ORIGIN: any;
        CORS_METHODS: string;
    };
};

if (process.env.CORS_ENABLED === true) {
    corsMiddleware = cors({
        origin: process.env.CORS_ORIGIN || true,
        methods: process.env.CORS_METHODS || 'GET,POST,PATCH,DELETE',
    });
}

export default corsMiddleware;
