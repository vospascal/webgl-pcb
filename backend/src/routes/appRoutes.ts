import express from 'express';
import { BaseRoutes } from '~/routes/BaseRoutes';

import { TestController } from '~/controllers/testController';
import { LalaController } from '~/controllers/lalaController';
import { StatusController } from '~/controllers/statusController';
import { RegisterController } from '~/controllers/registerController';
export class AppRoutes extends BaseRoutes {
    constructor(app: express.Application) {
        super(app, 'AppRoutes');
    }

    configureRoutes() {
        const testController = new TestController();
        const lalaController = new LalaController();
        const statusController = new StatusController();
        const registerController = new RegisterController();

        this.app.route('/').get(testController.index);
        this.app.route('/lala').get(lalaController.index);
        this.app.route('/status').get(statusController.index);
        this.app.route('/register').post(registerController.index);

        return this.app;
    }
}
