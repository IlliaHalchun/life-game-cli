import { inject, injectable } from "inversify";
import { IRawData } from "../common/rawData.type";
import { ENGINE_TYPES } from "../types";
import { IEngineService } from "./engine.service";
import "reflect-metadata";

export interface IEngineController {
    nextFrame(): IRawData;
    prevFrame(): IRawData | null;
    build(x: number, y: number): IRawData;
}

@injectable()
export class EngineController implements IEngineController {
    constructor(
        @inject(ENGINE_TYPES.EngineService)
        private EngineService: IEngineService
    ) {}

    nextFrame(): IRawData {
        return this.EngineService.nextTick();
    }

    prevFrame(): IRawData | null {
        return this.EngineService.prevTick();
    }

    build(x: number, y: number): IRawData {
        this.EngineService.setSize(x, y);
        return this.EngineService.setBaseData();
    }
}
