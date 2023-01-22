import {RawDataManager} from "./raw-data.manager";

describe("Data Manager", () => {
    it("Compares simple arrays", () => {
        const first = [[1], [2], [3]];
        const second = [[1], [2], [3]];

        expect(RawDataManager.compare(first, second)).toBe(true)
    })

    it("Compares long arrays", () => {
        const row = new Array(25).fill(Math.random());
        const first = new Array(10).fill(row);
        const second = new Array(10).fill(row);

        expect(RawDataManager.compare(first, second)).toBe(true)
    })

    it("Doesent compare different arrays", () => {
        const first = [[1], [4], [12]];
        const second = [[2], [12], [42]];

        expect(RawDataManager.compare(first, second)).toBe(false)

    })
})
