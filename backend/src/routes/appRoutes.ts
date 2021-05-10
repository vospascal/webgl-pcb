import {BaseRoutes} from './BaseRoutes';
import express from 'express';
import { TestController } from '../controllers/testController';
import { LalaController } from '../controllers/lalaController';

export class AppRoutes extends BaseRoutes {
    constructor(app: express.Application) {
        super(app, 'AppRoutes');
    }

    configureRoutes() {
        const testController = new TestController();
        const lalaController = new LalaController();

        this.app.route('/').get(testController.index);
        this.app.route('/lala').get(lalaController.index);
        
        return this.app;
    }
}