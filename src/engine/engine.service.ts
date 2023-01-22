import { inject, injectable } from "inversify";
import "reflect-metadata";
import {IPosition} from "../common/position.type";
import {RawDataManager} from "../common/raw-data.manager";
import { IRawData } from "../common/rawData.type";
import {ILogger} from "../logger/logger.service";
import { IDataManager } from "../model/data.manager";
import { MAIN_TYPES, MODEL_TYPES } from "../types";

export interface IEngineService {
    bootstrap(): IRawData;
    nextTick(): IRawData | null;
    prevTick(): IRawData | null;
    getCurrentData(): IRawData;
    toggleChangeState(x: number, y: number): IRawData;
    setSize(sizes: IPosition): void;
    setBaseData(): IRawData;
    setRandomData(): IRawData;
}

@injectable()
export class EngineService implements IEngineService {
    private sizes: IPosition;

    constructor(
        @inject(MODEL_TYPES.DataManager)
        private DataManager: IDataManager,
        @inject(MAIN_TYPES.Logger) private Logger: ILogger
    ) {
        this.Logger.log("Engine Service Started")
    }

    bootstrap(): IRawData {
       const data = this.buildClearField();
       return this.DataManager.setState(data);
    }

    setRandomData(): IRawData {
        const data = [];

        for(let i = 0; i < this.sizes.y; i++) {
            const row = [];
            for(let o = 0; o < this.sizes.x; o++)
                row[o] = Math.random() > 0.8 ? 1 : 0;
            data.push(row)
        }

        const currentState = this.DataManager.getState();
        this.DataManager.pushToHistory(currentState)
        return this.DataManager.setState(data);
    }

    setBaseData(): IRawData {
        const data = this.buildClearField();
        const current = this.DataManager.getState();
        this.DataManager.pushToHistory(current);
        return this.DataManager.setState(data);
    }

    setSize(sizes: IPosition): void {
        this.sizes = {x: sizes.x, y: sizes.y};
    }

    nextTick(): IRawData | null {
        if(this.isGameEnd()) return null;
        const currentState = this.DataManager.getState();
        const nextFrame = JSON.parse(JSON.stringify(currentState));

        for (let y = 0; y < currentState.length; y++) {
            for (let x = 0; x < currentState[y].length; x++)
                if (this.isBorn(x, y, currentState))
                    nextFrame[y][x] = 1;
                else if (this.isDie(x, y, currentState))
                    nextFrame[y][x] = 0;
                else nextFrame[y][x] = currentState[y][x];
        }

        this.DataManager.setState(nextFrame);
        this.DataManager.pushToHistory(currentState);
        return nextFrame;
    }

    prevTick(): IRawData | null {
        const prev = this.DataManager.popFromHistory();
        if(prev) {
            this.DataManager.setState(prev);
            return prev
        }
        return null
    }

    getCurrentData(): IRawData {
       return this.DataManager.getState(); 
    }

    toggleChangeState(x: number, y: number): IRawData {
        const currentState = this.DataManager.getState();
        const nextFrame = JSON.parse(JSON.stringify(currentState));

        nextFrame[y][x] = currentState[y][x] === 0 ? 1 : 0;

        this.DataManager.setState(nextFrame);
        this.DataManager.pushToHistory(currentState);

        return nextFrame;
    }

    private buildClearField(): IRawData {
        const row = new Array(this.sizes.x).fill(0);
        const data = new Array(this.sizes.y).fill(row);
        return data;
    }

    private getCellsNearby(x: number, y: number, data: IRawData): number {

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
                x > this.sizes.x - 1 ||
                y < 0 ||
                y > this.sizes.y - 1
            )
                return prev;

            const cell = data[y][x];
            return prev + cell;
        }, 0);

        return result;
    }

    private isBorn(x: number, y: number, data: IRawData): boolean {
        const cellsNearby = this.getCellsNearby(x, y, data);
        // TODO: Config Service
        return data[y][x] === 0 && cellsNearby === 3;
    }

    private isDie(x: number, y: number, data: IRawData): boolean {
        const cellsNearby = this.getCellsNearby(x, y, data);
        // TODO: Config Service
        return data[y][x] === 1 && cellsNearby < 2 || cellsNearby > 3;
    }

    private isGameEnd() {
        const current = this.DataManager.getState();
        const prev = this.DataManager.getFromHistory();
        if(prev === null) return false;
        return RawDataManager.compare(current, prev)
    }

   }
