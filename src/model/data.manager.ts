import { inject, injectable } from "inversify";
import { IRawData } from "../common/rawData.type";
import "reflect-metadata";
import { MODEL_TYPES, MAIN_TYPES } from "../types";
import { IHistoryModel } from "../model/data_layer/history.model";
import { ILogger } from "../logger/logger.service";
import { IStateModel } from "../model/data_layer/state.model";

export interface IDataManager {
    setState(data: IRawData): IRawData;
    getState(): IRawData;
    pushToHistory(data: IRawData): IRawData;
    popFromHistory(): IRawData | null;
    getFromHistory(): IRawData | null;
    clear(): void;
}

@injectable()
export class DataManager implements IDataManager {
    constructor(
        @inject(MODEL_TYPES.HistoryModel) private HistoryModel: IHistoryModel,
        @inject(MODEL_TYPES.StateModel) private StateModel: IStateModel,
        @inject(MAIN_TYPES.Logger) private Logger: ILogger
    ) {
        this.Logger.log("Model Manager started")
    }

    pushToHistory(data: IRawData): IRawData {
        return this.HistoryModel.push(data);
    }

    popFromHistory(): IRawData | null {
        return this.HistoryModel.pop() ?? null;
    }

    getFromHistory(): IRawData | null {
        return this.HistoryModel.getLast();
    }

    setState(data: IRawData): IRawData {
        this.StateModel.setState(data);
        return data;
    }

    getState(): IRawData {
        const data = this.StateModel.getState();
        if(data === null) throw new Error("Data was not bootstrapped");
        return data;
    }

    clear(): void {
        this.HistoryModel.clear();
    }
}
