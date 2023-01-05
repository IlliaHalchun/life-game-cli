import { inject, injectable } from "inversify";
import { IApp } from "./app.interface";
import "reflect-metadata";
import { VIEW_TYPES } from "./types";
import { IScreen, Screen } from "./view/screen.view";
import { GameState } from "./view/game.state";

@injectable()
export class App implements IApp {
    constructor(@inject(VIEW_TYPES.Screen) private _screen: IScreen) {}

    init(): void {
        this._screen.render();
    }
}
