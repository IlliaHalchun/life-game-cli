import { injectable } from "inversify";

import { IRawData } from "../../common/rawData.type";
import "reflect-metadata";

export interface IHistoryModel {
    push(data: IRawData): IRawData;
    pop(): IRawData | null;
    getLast(): IRawData | null;
    clear(): void;
}

@injectable()
export class HistoryModel implements IHistoryModel {
    private history: IRawData[] = [];
    private maxAmountOfSnapshots: number = 100;

    push(data: IRawData): IRawData {
        if(this.history.length > this.maxAmountOfSnapshots) this.history.shift();
        this.history.push(data);
        return data;
    }

    pop(): IRawData | null {
        return this.history.pop() ?? null;
    }

    getLast(): IRawData | null {
        return this.history[this.history.length - 1] ?? null;
    }

    clear(): void {
        this.history = [];
    }
}
