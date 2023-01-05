import { inject, injectable } from "inversify";
import { IRawData } from "../../common/rawData.type";
import "reflect-metadata";

export interface IStateModel {
    setState(state: IRawData): void;
    getState(): IRawData;
}

@injectable()
export class StateModel implements IStateModel {
    private _state: IRawData;

    constructor() {}

    setState(state: IRawData): void {
        this._state = state;
    }
    getState(): IRawData {
        return this._state;
    }
}
