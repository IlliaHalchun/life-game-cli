import {IRawData} from "./rawData.type";

export class RawDataManager {
    static compare(first: IRawData, second: IRawData): boolean {
        return first.every((row, y) => row.every((state, x) => state == second[y][x]))
    }
}
