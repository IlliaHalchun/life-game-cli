import { inject, injectable } from "inversify";
import { IApp } from "./app.interface";
import "reflect-metadata";
import { MAIN_TYPES, VIEW_TYPES } from "./types";
import { IScreen, Screen } from "./view/screen.view";
import {ILogger} from "./logger/logger.service";

@injectable()
export class App implements IApp {
    constructor(
        @inject(VIEW_TYPES.Screen) private _screen: IScreen,
        @inject(MAIN_TYPES.Logger) private Logger: ILogger
               ) {}

    init(): void {
        this.Logger.log("App started")
    }
}
