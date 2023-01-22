import { inject, injectable } from "inversify";
import { IRawData } from "../../common/rawData.type";
import "reflect-metadata";

export interface IStateModel {
    setState(state: IRawData): void;
    getState(): IRawData | null;
}

@injectable()
export class StateModel implements IStateModel {
    private _state: IRawData | null;

    constructor() {
        this._state = null;
    }

    setState(state: IRawData): void {
        this._state = state;
    
    }
    getState(): IRawData | null {
        return this._state;
    }
}
