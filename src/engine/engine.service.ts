import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IRawData } from "../common/rawData.type";
import { IDataManager } from "../model/data.manager";
import { MODEL_TYPES } from "../types";

export interface IEngineService {
    nextTick(): IRawData;
    prevTick(): IRawData | null;
    toggleState(x: number, y: number): IRawData;
    setSize(width: number, height: number): void;
    setBaseData(): IRawData;
}

@injectable()
export class EngineService implements IEngineService {
    constructor(
        @inject(MODEL_TYPES.DataManager)
        private DataManager: IDataManager,
        private _sizes: [x: number, y: number]
    ) {}

    setBaseData(): IRawData {
        const baseRow = new Array(this._sizes[0]).fill(0);
        const baseData = new Array(this._sizes[1]).fill(baseRow);

        return this.DataManager.setState(baseData);
    }

    private getCellsNearby(x: number, y: number, state: IRawData): number {
        const cellsNearby: [x: number, y: number][] = [
            [x - 1, y],
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
            [x, y + 1],
            [x - 1, y + 1],
        ];

        const result = cellsNearby.reduce((prev, current, index) => {
            const x = cellsNearby[index][0];
            const y = cellsNearby[index][1];

            if (
                x < 0 ||
                x > this._sizes[0] - 1 ||
                y < 0 ||
                y > this._sizes[1] - 1
            )
                return prev;

            const cell = state[y][x];
            return prev + cell;
        }, 0);

        return result;
    }

    private isBorn(x: number, y: number, state: IRawData): boolean {
        const cellsNearby = this.getCellsNearby(x, y, state);

        // TODO Config Service
        return cellsNearby >= 3;
    }

    private isDie(x: number, y: number, state: IRawData) {
        const cellsNearby = this.getCellsNearby(x, y, state);

        // TODO Config Service
        return cellsNearby < 2 || cellsNearby > 3;
    }

    setSize(width: number, height: number): void {
        this._sizes = [width, height];
    }

    nextTick(): IRawData {
        const currentState = this.DataManager.getState();
        const nextFrame: IRawData = JSON.parse(JSON.stringify(currentState));

        for (let y = 0; y < currentState.length; y++) {
            for (let x = 0; x < currentState[y].length; x++)
                if (currentState[y][x] === 0 && this.isBorn(x, y, currentState))
                    nextFrame[y][x] = 1;
                else if (
                    currentState[y][x] === 1 &&
                    this.isDie(x, y, currentState)
                )
                    nextFrame[y][x] = 0;
                else nextFrame[y][x] = currentState[y][x];
        }

        this.DataManager.setState(nextFrame);
        return nextFrame;
    }

    prevTick(): IRawData | null {
        return this.DataManager.getPrevState();
    }

    toggleState(x: number, y: number): IRawData {
        const currentState = this.DataManager.getState();
        const modifiedState = JSON.parse(JSON.stringify(currentState));

        modifiedState[y][x] = modifiedState[y][x] === 0 ? 1 : 0;

        this.DataManager.setState(modifiedState);

        return modifiedState;
    }
}
