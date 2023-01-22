import { inject, injectable } from "inversify";
import { StateElement } from "./common/StateElement.abstract";
import * as blessed from "blessed";
import "reflect-metadata";
import { IBinding } from "./common/binding.interface";
import { ENGINE_TYPES, MAIN_TYPES } from "../types";
import { IEngineController } from "../engine/engine.controller";
import { GameState } from "./states/game-state/game.state";
import {ILogger} from "../logger/logger.service";
import {IPosition} from "../common/position.type";

export interface IScreen {
    render(): void;
    bind(bindings: IBinding[]): void;
    changeState(state: StateElement): void;
    getScreenSize(): IPosition;
}

@injectable()
export class Screen implements IScreen {
    private state: StateElement | null;
    private screen: blessed.Widgets.Screen;
    private bindings: IBinding[];

    constructor(
        @inject(ENGINE_TYPES.EngineController)
        private EngineController: IEngineController,
        @inject(MAIN_TYPES.Logger) private Logger: ILogger
    ) {
        this.screen = blessed.screen({
            smartCSR: true,
            resizeTimeout: 10
        });
        this.changeState(new GameState(this, this.EngineController));
        this.bindings = [{ keys: ["C-c"], callback: () => process.exit(0)}];
        this.bind(this.bindings);

        this.screen.on("resize", this.onResize.bind(this))

        this.render()
   }

   getScreenSize(): IPosition {
        return {
            x: +this.screen.width,
            y: +this.screen.height
        }
   }

    changeState(state: StateElement): void {
            this.removeState();
            this.setState(state);
    }

    render() {
        this.screen.render();
    }

    bind(bindings: IBinding[]) {
        for (const binding of this.bindings) {
            this.screen.key(binding.keys, binding.callback);
        }
    }

    private removeState() {
        if (this.state) this.state.element.remove(this.state.element);
        this.state = null;
    }

    private setState(state: StateElement) {
        this.state = state;
        this.screen.append(state.element);
        this.state?.bootstrap();
    }

    private onResize() {
        this.state?.bootstrap(); 
        this.render()
    }
}
