import morgan from "morgan";
import winston from "winston";
import "winston-daily-rotate-file";
import { inspect } from "node:util";

const { combine, timestamp, printf, colorize, align, json, errors } =
	winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
	filename: "combined-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxFiles: "14d",
});

const errorFilter = winston.format((info, opts) => {
	return info.level === "error" ? info : false;
});

const infoFilter = winston.format((info, opts) => {
	return info.level === "info" ? info : false;
});

const httpFilter = winston.format((info, opts) => {
	return info.level === "info" ? info : false;
});


const logger = winston.createLogger({
	exitOnError: false,
	level: process.env.LOG_LEVEL || "info",
	format: combine(
		errors({ stack: true }),
		colorize({ all: true }),
		timestamp({
			format: "YYYY-MM-DD hh:mm:ss",
		}),
		printf((info) => {
			const baseLog = `[${info.timestamp}] ${info.level}: ${info.message}\n${info.stack}`;
			const queryLog = info.query ? `\nquery:${info.query}` : "";
			return `${baseLog}${queryLog}`;
		}),
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "logs/combined.log",
		}),
		new winston.transports.File({
			filename: "logs/app-error.log",
			level: "error",
			format: combine(errorFilter(), timestamp(), json()),
		}),
		new winston.transports.File({
			filename: "logs/app-info.log",
			level: "info",
			format: combine(infoFilter(), timestamp(), json()),
		}),
		new winston.transports.File({ filename: "logs/http.log" }),
		fileRotateTransport,
	],
	exceptionHandlers: [
		new winston.transports.File({
			filename: "logs/exceptions.log",
			level: "http",
			format: combine(httpFilter()),
		}),
	],
});

export const morganMiddleware = morgan("combined", {
	stream: {
		// Configure Morgan to use our custom logger with the http severity
		write: (message) => logger.http(message.trim()),
	},
});

export default logger;
