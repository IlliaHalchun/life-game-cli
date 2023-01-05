import { inject, injectable } from "inversify";
import { IRawData } from "../common/rawData.type";
import "reflect-metadata";
import { MODEL_TYPES, MAIN_TYPES } from "../types";
import { IHistoryModel } from "../model/data_layer/history.model";
import { ILogger } from "../logger/logger.service";
import { IStateModel } from "../model/data_layer/state.model";
import { IBufferModel } from "../model/data_layer/buffer.model";

export interface IDataManager {
    setState(data: IRawData): IRawData;
    getState(): IRawData;
    getPrevState(): IRawData | null;
    clear(): void;
}

@injectable()
export class DataManager implements IDataManager {
    constructor(
        @inject(MODEL_TYPES.HistoryModel) private HistoryModel: IHistoryModel,
        @inject(MODEL_TYPES.StateModel) private StateModel: IStateModel,
        @inject(MODEL_TYPES.BufferModel) private BufferModel: IBufferModel,
        @inject(MAIN_TYPES.Logger) private Logger: ILogger
    ) {}

    setState(data: IRawData): IRawData {
        const currentState = this.StateModel.getState();
        this.HistoryModel.push(currentState);
        this.StateModel.setState(data);
        return data;
    }

    getState(): IRawData {
        return this.StateModel.getState();
    }

    getPrevState(): IRawData | null {
        const prevState = this.HistoryModel.pop() ?? null;
        if (prevState) this.BufferModel.push(prevState);
        return prevState;
    }

    clear(): void {
        this.HistoryModel.clear();
    }
}
