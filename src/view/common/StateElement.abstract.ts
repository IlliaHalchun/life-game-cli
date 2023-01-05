import * as blessed from "blessed";
import { IScreen } from "../screen.view";
import { IBinding } from "./binding.interface";

export abstract class StateElement {
    private readonly _element: blessed.Widgets.BlessedElement;
    private readonly _settings: blessed.Widgets.BoxOptions = {
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
        this._element = blessed.box(this._settings);
    }

    render() {
        this._element.render();
    }

    get element() {
        return this._element;
    }

    protected bind(bindings: IBinding[]) {
        for (const binding of bindings) {
            this._element.key(binding.keys, binding.callback);
        }
    }
}
