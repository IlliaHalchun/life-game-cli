import { StateElement } from "../../common/StateElement.abstract";
import { IScreen } from "../../screen.view";
import { IBinding } from "../../common/binding.interface";
import "reflect-metadata";
import { IRawData } from "../../../common/rawData.type";
import { IEngineController } from "../../../engine/engine.controller";
import { ICursorManager, CursorManager } from "./cursor.manager";

export interface IGameState extends StateElement {}

export class GameState extends StateElement implements IGameState {
    private EngineController: IEngineController;
    private CursorManager: ICursorManager;
    private isGameStarted: boolean;
    private gameIntervalId: NodeJS.Timer;
    private bindings: IBinding[];

    constructor(
        origin: IScreen, EngineController: IEngineController
    ) {
        super(origin);

        this.EngineController = EngineController;
        this.bindings = [
            {
                keys: ["space"],
                callback: this.toggleStart
            },
            {
                keys: ["k"],
                callback: this.moveCursorUp
            },
            {
                keys: ["j"],
                callback: this.moveCursorDown
            },
            {
                keys: ["h"],
                callback: this.moveCursorLeft
            },
            {
                keys: ["l"],
                callback: this.moveCursorRight
            },            
            {
                keys: ["r"],
                callback: () => {
                    if(this.isGameStarted) return;
                    this.setRandomData();
                }
            },
            {
                keys: ["c"],
                callback: () => {
                    if(this.isGameStarted) return;
                    this.setEmptyData();
                }
            },
            {
                keys: ["p"],
                callback: () => {
                    if(this.isGameStarted) return;
                    this.setPrevFrame();
                }
            },
            {
                keys: ["n"],
                callback: () => {
                    if(this.isGameStarted) return;
                    this.setNextFrame();
                }
            },
            {
                keys: ["o", "enter"],
                callback: this.toggleChangeState
            }
        ];
        this.bind(this.bindings);
        this.origin.render()


    }

    bootstrap(): void {
        this.CursorManager = new CursorManager(this.getElementSize());
        const data = this.EngineController.bootstrap(this.getElementSize());
        this.fillField(this.serializeData(data))
    } 

    private setRandomData() {
        const data = this.EngineController.setRandomField();
        this.updateView(data);
    }

    private setEmptyData() {
        const data = this.EngineController.setEmptyField();
        this.updateView(data);
    }

    private toggleStart(): void {
        if(!this.isGameStarted) {
            this.isGameStarted = true;
            // TODO: UI Options with delay
            this.gameIntervalId = setInterval(this.setNextFrame.bind(this), 100)
        } else {
            clearInterval(this.gameIntervalId)
            this.isGameStarted = false;
        }
        this.updateView(this.EngineController.getCurrentData());
    }

    private updateView(data: IRawData): void {
        const serialized = this.serializeData(data)
        this.fillField(serialized);
        this.origin.render()
    }

    private setPrevFrame(): void {
        const data = this.EngineController.prevFrame();
        if(data)
            this.fillField(this.serializeData(data))
            this.origin.render()
    }

    private setNextFrame(): void {
        const data = this.EngineController.nextFrame();
        if(data === null) return this.toggleStart();
        this.fillField(this.serializeData(data));
        this.origin.render()
    }

    private moveCursorLeft(): void {
        this.CursorManager.moveX(-1);
        const currentState = this.EngineController.getCurrentData();
        this.updateView(currentState);
    }

    private moveCursorRight(): void {
        this.CursorManager.moveX(1);
        const currentState = this.EngineController.getCurrentData();
        this.updateView(currentState);
    }

    private moveCursorDown(): void {
        this.CursorManager.moveY(1);
        const currentState = this.EngineController.getCurrentData();
        this.updateView(currentState);
    }

    private moveCursorUp(): void {
        this.CursorManager.moveY(-1);
        const currentState = this.EngineController.getCurrentData();
        this.updateView(currentState);
    }

    private toggleChangeState(): void {
        const position = this.CursorManager.getPosition();
        const data = this.EngineController.toggleChangeState(position.x, position.y); 
        this.updateView(data);
    }

    private fillField(serialized: string[]): void {
            for(let i = 0; i < serialized.length; i++)
                this.element.setLine(i, serialized[i]);
    }

    private serializeWithoutCursor(data: IRawData): string[] {
        const serialized = data.map((row) => {
            const serializedRow = row.map((value) => value === 1 ? "█" : " ");
            const serializedString = serializedRow.join("");
            return serializedString;
        });
    
        return serialized;
    }

    private serializeWithCursor(data: IRawData): string[] {
        const {x, y} = this.CursorManager.getPosition();
        const serialized = data.map((row, index) => {
            const serializedRow = row.map((value) => value === 1 ? "█" : " ") as string[];
            if(y === index) serializedRow[x] = data[y][x] === 1 ? "█" : "▂";
            const serializedString = serializedRow.join("");
            return serializedString;
        });

        return serialized;
    }

    private serializeData(data: IRawData): string[] {
        if(this.isGameStarted)
            return this.serializeWithoutCursor(data);
        else
            return this.serializeWithCursor(data);
    }
}
