import express from 'express';
import Logger from '~/middlewares/logger';

export class RegisterController {
    async index(req: express.Request, res: express.Response) {
        try {
            Logger.info(req.body);
        } catch (error) {}
    }
}
