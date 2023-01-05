import * as blessed from "blessed";

export interface IBinding {
    keys: string[];
    callback: (ch: any, key: blessed.Widgets.Events.IKeyEventArg) => void;
}
