import "reflect-metadata";

import { debug } from "node:console";
import compression from "compression";
import cors from "cors";
import errorHandler from "error-handler";
import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "../swagger.json";
import logger, { morganMiddleware } from "./shared/winston";
import "dotenv/config";
import helmet from "helmet";
import "./shared/db";
import bodyParser from "body-parser";
import apiRoutes from "./routes";

// TODO: change biome config to use single quoutes
// TODO: validate env file
const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(cors());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(compression());
app.use(morganMiddleware);

if (process.env.NODE_ENV === "development") {
	// only use in development
	app.use(errorHandler);
}

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDoc));
app.use("/api", apiRoutes);

// custom 404
app.use((req, res, next) => {
	res.status(404).send("Sorry can't find that!");
});

// custom error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

const server = app.listen(port, () => {
	return logger.info(`Express is listening at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
	debug("SIGTERM signal received: closing HTTP server");
	server.close(() => {
		debug("HTTP server closed");
	});
});
