import { BaseRoutes } from '~/Routes/BaseRoutes';
import express from 'express';

export class DefaultRoutes extends BaseRoutes {
    constructor(app: express.Application) {
        super(app, 'DefaultRoutes');
    }

    configureRoutes() {
        this.app.get('/health-check', (req, res) => res.send('OK'));
        this.app.all('*', function (req: express.Request, res: express.Response) {
            res.status(404).send('Page not found');
            //res.status(301).redirect('/not-found');
        });
        return this.app;
    }
}
