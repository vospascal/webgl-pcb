import 'module-alias/register'; //allow useage of a alias
import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    '~': __dirname,
});

import path from 'path';
import express from 'express';
import * as http from 'http';
import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';

import Logger from '~/middlewares/logger';
import morganMiddleware from '~/middlewares/morganMiddleware';

import { BaseRoutes } from '~/routes/BaseRoutes';
import { AppRoutes } from '~/routes/appRoutes';
import { DefaultRoutes } from '~/routes/defaultRoutes';
import cors from '~/middlewares/cors';

//getting environment config
const envFileName = `.env.${process.env.NODE_ENV}`;
const envFilePath = path.resolve(process.cwd(), envFileName);
const envFilePathDefault = path.resolve(process.cwd(), `.env.defaults`);
dotenv.config({ path: envFilePath ? envFilePath : envFilePathDefault });

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;

// adding middlewares
app.use(compress()); // gzip compression
app.use(helmet()); // making it all secure by setting various HTTP headers
app.use(json()); // json parsing requests and attache them to req.body
app.use(urlencoded({ extended: true })); // parses urlencoded bodies like forms and attache them to req.body
app.use(cors); // allowing cors origin
app.use(morganMiddleware); // added logging

// here we are adding the AppRoutes to our array,
const routes: Array<BaseRoutes> = [];
routes.push(new AppRoutes(app));
routes.push(new DefaultRoutes(app));

// start server on configurated port
server
    .listen(port, () => {
        Logger.info(`⚡⚡ Server running at http://localhost:${port} ⚡⚡`);
        routes.forEach((route: BaseRoutes) => {
            Logger.info(`Routes configured for ${route.getName()}`);
        });
    })
    .once('error', (error: any) => {
        if (error?.code === 'EADDRINUSE') {
            Logger.error(`Port ${port} is already in use`);
            process.exit(1);
        } else {
            Logger.error(`Error: ${error}`);
        }
    });
