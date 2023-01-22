import { injectable } from "inversify";
import "reflect-metadata";
import {Writable} from "stream";
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import os from "os"
import { black, bold, underline, bgRed, bgBlue, blue, white, bgYellow } from "colorette";

export interface ILogger {
    log(...messages: unknown[]): void;
    error(...messages: unknown[]): void;
    warn(...messagse: unknown[]): void;
}

@injectable()
export class NullLogger implements ILogger {
    log(...messages: unknown[]): void {}
    error(...messages: unknown[]): void {}
    warn(...messages: unknown[]): void {}
}

@injectable()
export class DebugLogger implements ILogger{
    private write_stream: Writable

    constructor() {
        const argv = yargs(hideBin(process.argv)).argv;
        //@ts-ignore
        this.write_stream = fs.createWriteStream(argv.debug)
        this.write_stream.write(os.EOL)
    }

    log(...messages: unknown[]): void {
        messages.forEach((msg) => {
            const message = `\t${bold(white(bgBlue(" LOG ")))} : ${white(msg as string)}${os.EOL}`
            this.write_stream.write(message)
        })
    }

    error(...messages: unknown[]): void {
            messages.forEach((msg) => {
                const message = `\t${bold(white(bgRed(" ERROR ")))} : ${white(msg as string)}${os.EOL}`
                this.write_stream.write(message)
            })
    }

    warn(...messages: unknown[]): void {
            messages.forEach((msg) => {
                const message = `\t${bold(black(bgYellow(" WARN ")))} : ${white(msg as string)}${os.EOL}`
                this.write_stream.write(message)
            })
    }
}



