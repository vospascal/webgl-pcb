import express from 'express';

export class StatusController {
    async index(req: express.Request, res: express.Response) {
        res.send('OK');
    }
}