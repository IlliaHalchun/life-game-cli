import {IEngineController} from "../../../engine/engine.controller";
import {StateElement} from "../../common/StateElement.abstract";
import {IScreen} from "../../screen.view";

export interface IOptionsState extends StateElement {};

export class OptionsState extends StateElement implements IOptionsState {
    private EngineController: IEngineController;

    constructor(
        origin: IScreen, EngineController: IEngineController
    ) {
        super(origin);
        this.EngineController = EngineController;
    }
    
    bootstrap(): void {
        
    }
}
