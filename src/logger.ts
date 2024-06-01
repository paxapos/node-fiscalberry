import { dummyLogger, Logger } from "ts-log";
import * as fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const path = process.env.LOG_PATH;

// example custom logger that logs to a file
class FileLogger implements Logger {
	private readonly fd: number;

	public constructor(filename: string) {
		this.fd = fs.openSync(filename, "a");
	}

	public trace(message?: any, ...optionalParams: any[]): void {
		this.append("TRACE", `${message} ${JSON.stringify(optionalParams)}`);
	}

	public debug(message?: any, ...optionalParams: any[]): void {
		this.append("DEBUG", `${message} ${JSON.stringify(optionalParams)}`);
	}

	public info(message?: any, ...optionalParams: any[]): void {
		this.append("INFO ", `${message} ${JSON.stringify(optionalParams)}`);
	}

	public warn(message?: any, ...optionalParams: any[]): void {
		this.append("WARN ", `${message} ${JSON.stringify(optionalParams)}`);
	}

	public error(message?: any, ...optionalParams: any[]): void {
		this.append("ERROR", `${message} ${JSON.stringify(optionalParams)}`);
	}

	private append(type: string, message: string) {
		fs.writeSync(
			this.fd,
			`${new Date().toISOString()} ${type} ${message}\n`
		);
	}
}

// example custom logger that logs to a file
class ConsoleLogger implements Logger {
	public trace(message?: any, ...optionalParams: any[]): void {
		console.trace(`${message} ${JSON.stringify(optionalParams)}`);
	}

	public debug(message?: any, ...optionalParams: any[]): void {
		console.debug(`${message} ${JSON.stringify(optionalParams)}`);
	}

	public info(message?: any, ...optionalParams: any[]): void {
		console.info(`${message} ${JSON.stringify(optionalParams)}`);
	}

	public warn(message?: any, ...optionalParams: any[]): void {
		console.warn(`${message} ${JSON.stringify(optionalParams)}`);
	}

	public error(message?: any, ...optionalParams: any[]): void {
		console.error(`${message} ${JSON.stringify(optionalParams)}`);
	}
}

export const logger =
	path !== undefined ? new FileLogger(path) : new ConsoleLogger();
