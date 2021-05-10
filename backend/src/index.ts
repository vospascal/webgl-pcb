import path from "path";
import express from "express";
import * as http from "http";

import cors from "cors";

import Logger from "./middlewares/logger";
import morganMiddleware from "./middlewares/morganMiddleware";
import { json, urlencoded } from "body-parser";

import helmet from "helmet";
import dotenv from "dotenv";

import { BaseRoutes } from "./routes/BaseRoutes";
import { AppRoutes } from "./routes/appRoutes";

//getting environment config
const envFileName = `.env.${process.env.NODE_ENV}`;
const envFilePath = path.resolve(process.cwd(), envFileName);
const envFilePathDefault = path.resolve(process.cwd(), `.env.defaults`);
dotenv.config({ path: envFilePath ? envFilePath : envFilePathDefault });

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;
const routes: Array<BaseRoutes> = [];

// adding middlewares
app.use(helmet()); // making it all secure
app.use(json()); // json parsing requests
app.use(urlencoded({ extended: true })); // parses urlencoded bodies like forms
app.use(cors()); // allowing cors origin
app.use(morganMiddleware); // added logging

// here we are adding the AppRoutes to our array,
routes.push(new AppRoutes(app));

// start server on configed port
server.listen(port, () => {
  Logger.info(`⚡⚡ Server running at http://localhost:${port} ⚡⚡`);
  routes.forEach((route: BaseRoutes) => {
    Logger.info(`Routes configured for ${route.getName()}`);
  });
});
