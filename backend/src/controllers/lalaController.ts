import express from 'express';

export class LalaController {
    async index(req: express.Request, res: express.Response) {
        res.status(200).send('Lalaland');
    }
}