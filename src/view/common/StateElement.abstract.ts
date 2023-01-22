import * as blessed from "blessed";
import {IPosition} from "../../common/position.type";
import { IScreen } from "../screen.view";
import { IBinding } from "./binding.interface";

export abstract class StateElement {
    protected origin: IScreen;
    private readonly _element: blessed.Widgets.BoxElement;
    private readonly settings: blessed.Widgets.BoxOptions = {
        top: "center",
        left: "center",
        width: "90%",
        height: "95%",
        tags: true,
        border: {
            type: "line",
        },
        style: {
            fg: "white",
            border: {
                fg: "#f0f0f0",
            },
        },
    };

    constructor(origin: IScreen) {
        this.origin = origin;
        this._element = blessed.box(this.settings);
    }

    render() {
        this._element.render();
    }

    getElementSize(): IPosition {
        return { x: +this._element.width - 2, y: +this._element.height - 2 }
    }

    abstract bootstrap(): void;

    get element() {
        return this._element;
    }

    protected bind(bindings: IBinding[]) {
        for (const binding of bindings) {
            this._element.key(binding.keys, binding.callback.bind(this));
        }
    }
}
