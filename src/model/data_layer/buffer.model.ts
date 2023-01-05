import { inject, injectable } from "inversify";
import { IRawData } from "../../common/rawData.type";
import "reflect-metadata";

export interface IBufferModel {
    pop(): IRawData | null;
    push(data: IRawData): void;
    clear(): void;
    getBuffer(): IRawData[] | null;
}

@injectable()
export class BufferModel implements IBufferModel {
    private _buffer: IRawData[] = [];

    constructor() {}

    pop(): IRawData | null {
        const data = this._buffer.pop();
        return data ?? null;
    }
    push(data: IRawData): void {
        this._buffer.push();
    }
    clear(): void {
        this._buffer = [];
    }
    getBuffer(): IRawData[] | null {
        return this._buffer;
    }
}
