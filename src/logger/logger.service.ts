import { injectable } from "inversify";
import "reflect-metadata";

export interface ILogger {
    log(...message: unknown[]): void;
    error(...message: unknown[]): void;
    warn(...message: unknown[]): void;
}

@injectable()
export class NullLogger implements ILogger {
    log(...message: unknown[]): void {}
    error(...message: unknown[]): void {}
    warn(...message: unknown[]): void {}
}
