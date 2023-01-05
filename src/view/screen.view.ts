import { inject, injectable } from "inversify";
import { StateElement } from "./common/StateElement.abstract";
import * as blessed from "blessed";
import "reflect-metadata";
import { IBinding } from "./common/binding.interface";
import { ENGINE_TYPES } from "../types";
import { IEngineController } from "../engine/engine.controller";

export interface IScreen {
    render(): void;
    bind(bindings: IBinding[]): void;
    changeState(state: StateElement): void;
}

@injectable()
export class Screen implements IScreen {
    private _state: StateElement;
    private _screen: blessed.Widgets.Screen;
    private _bindings: IBinding[];

    constructor(
        @inject(ENGINE_TYPES.EngineController)
        private EngineController: IEngineController
    ) {
        this._screen = blessed.screen({
            smartCSR: true,
        });
        // this.changeState(new GameState(this, this.EngineController));
        this._bindings = [{ keys: ["C-c"], callback: () => process.exit(0) }];
        this.bind(this._bindings);
    }

    changeState(state: StateElement): void {
        this._state = state;
        this._screen.remove(this._state.element);
        this._screen.append(state.element);
    }

    render() {
        this._screen.render();
    }

    bind(bindings: IBinding[]) {
        for (const binding of this._bindings) {
            this._screen.key(binding.keys, binding.callback);
        }
    }
}
