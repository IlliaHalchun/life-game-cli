import {IPosition} from "../../../common/position.type";

export interface ICursorManager {
    getPosition(): IPosition;
    setPosition(pos: IPosition): IPosition;
    moveX(dif: number): IPosition;
    moveY(dif: number): IPosition;
}

export class CursorManager implements ICursorManager {
    private position: IPosition;
    private boundaries: IPosition;
    
    constructor(boundaries: IPosition) {
        this.boundaries = boundaries;
        this.position = {x: 0, y: 0}
    }

    getPosition(): IPosition {
       return this.position; 
    }

    setPosition(pos: IPosition): IPosition {
        this.position = this.position;
        return this.position;
    }

    moveX(dif: number): IPosition {
        if(this.position.x + dif < 0) {
            const position = { x: this.boundaries.x - 1, y: this.position.y};
            this.position = position;
        } else if(this.position.x + dif >= this.boundaries.x) {
            const position = { x: 0, y: this.position.y};
            this.position = position;
        } else {
            this.position = {x: this.position.x + dif, y: this.position.y} 
        }

        return this.position
    }

    moveY(dif: number): IPosition {
        if(this.position.y + dif < 0) {
            const position = { x: this.position.x, y: this.boundaries.y - 1};
            this.position = position;
        } else if(this.position.y + dif >= this.boundaries.y) {
            const position = { x: this.position.x, y: 0};
            this.position = position;
        } else {
            this.position = {x: this.position.x, y: this.position.y + dif} 
        }
  
        return this.position
    }
}
