import { StateElement } from "./common/StateElement.abstract";
import { IScreen } from "./screen.view";
import { IBinding } from "./common/binding.interface";
import "reflect-metadata";
import { IRawData } from "../common/rawData.type";
import { IEngineController } from "../engine/engine.controller";
import { unmanaged } from "inversify";

export interface IGameState extends StateElement {}

export class GameState extends StateElement implements IGameState {
    private EngineController: IEngineController;
    private _bindings: IBinding[];
    private _origin: IScreen;

    constructor(origin: IScreen, EngineController: IEngineController) {
        super(origin);

        this.EngineController = EngineController;
        this._origin = origin;
        this._bindings = [{ keys: ["l"], callback: () => {} }];
        this.bind(this._bindings);

        const startData = this.EngineController.build(
            this.element.width as number,
            this.element.height as number
        );
        this.showField(this.serrializeData(startData));
    }

    private showField(serrialized: string): void {
        this.element.setText(serrialized);
        this._origin.render();
    }

    private serrializeData(data: IRawData): string {
        const serrialized = [];

        for (const row of data) {
            for (const char of row) {
                serrialized.push(char ? "█" : " ");
            }
        }

        return serrialized.join("");
    }
}
