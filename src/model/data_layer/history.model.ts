import { injectable } from "inversify";
import { IRawData } from "../../common/rawData.type";
import "reflect-metadata";

export interface IHistoryModel {
    push(data: IRawData): boolean;
    pop(): IRawData | null;
    clear(): void;
}

@injectable()
export class HistoryModel implements IHistoryModel {
    private _history: IRawData[] = [];

    push(data: IRawData): boolean {
        this._history.push(data);
        return true;
    }

    pop(): IRawData | null {
        return this._history.pop() ?? null;
    }

    clear(): void {
        this._history = [];
    }
}
