import { inject, injectable } from "inversify";
import { IRawData } from "../common/rawData.type";

import { ENGINE_TYPES, MAIN_TYPES } from "../types";
import { IEngineService } from "./engine.service";
import "reflect-metadata";
import {ILogger} from "../logger/logger.service";
import {IPosition} from "../common/position.type";

export interface IEngineController {
    bootstrap(sizes: IPosition): IRawData;
    nextFrame(): IRawData | null;
    prevFrame(): IRawData | null;
    getCurrentData(): IRawData;
    setRandomField(): IRawData;
    setEmptyField(): IRawData;
    toggleChangeState(x: number, y: number): IRawData;
}

@injectable()
export class EngineController implements IEngineController {
    constructor(
        @inject(ENGINE_TYPES.EngineService)
        private EngineService: IEngineService,
        @inject(MAIN_TYPES.Logger) private Logger: ILogger
    ) {
        this.Logger.log("Engine Controller started")
    }

    bootstrap(sizes: IPosition): IRawData {
        this.EngineService.setSize(sizes);
        return this.EngineService.bootstrap();
    }

    nextFrame(): IRawData | null{
        const result = this.EngineService.nextTick();
        return result;
    }

    prevFrame(): IRawData | null {
        const result = this.EngineService.prevTick();
        return result;
    }

    getCurrentData(): IRawData {
        return this.EngineService.getCurrentData();
    }

    toggleChangeState(x: number, y: number): IRawData {
        return this.EngineService.toggleChangeState(x, y);
    }

    setRandomField(): IRawData {
        return this.EngineService.setRandomData();
    }

    setEmptyField(): IRawData {
        return this.EngineService.setBaseData();
    }
}
