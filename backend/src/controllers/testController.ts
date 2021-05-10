import express from 'express';

export class TestController {
    async index(req: express.Request, res: express.Response) {
        res.status(200).send('Hello world');
    }
}