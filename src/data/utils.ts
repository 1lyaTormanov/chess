import {CellI, ColorType, FigureI, Position} from "../types";

export const isAvailableVertical = (current: FigureI, target:CellI, array: CellI[]) => {
    const min = Math.min(current.position.y, target.position.y);
    const max = Math.max(current.position.y, target.position.y);

    if(current.position.x !== target.position.x){
        return false
    }

    for(let i = min + 1 ; i < max; i++){
        if(array.find(el => el.position.x === current.position.x && el.position.y === i)?.figure){
            return false
        }
    }
    return true
}

export const isAvailableHorizontal = (current: FigureI, target:CellI, array: CellI[]) => {
    const min = Math.min(current.position.x, target.position.x);
    const max = Math.max(current.position.x, target.position.x);
    if(current.position.y !== target.position.y){
        return false
    }

    for(let i = min; i < max; i++){
        if(array.find(el => el.position.y === current.position.y && el.position.x === i)?.figure){
            return false
        }
    }
    return true
}

export const isAvailableDiagonal = (current: FigureI, target: CellI) => {
    const module = getModule(current.position, target.position);

    return (module.x === module.y)
}


export const makeBy = (count: number, callback: (i: number) => any) => {
    const res = [];
    for(let i = 0; i < count; i++){
        res.push(callback(i));
    }

    return res;
}


export const getModule = (curr: Position, target: Position) => {
    return {
        x: Math.abs(curr.x - target.x),
        y: Math.abs(curr.y - target.y),
    }
}

export const findPosition = (x: number, y: number) => {
    if(( x % 2 === 0  && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
        return ColorType.BLACK
    }
    else{
        return ColorType.WHITE
    }
}

export const isBlack = (type: ColorType) => type === ColorType.BLACK

export const isXEquals = (curr: Position, target:Position) => {
    return curr.x === target.x;

}

export const hasAllyFigure = (curr: FigureI, target: CellI) => {
    return curr.color === target.figure?.color;

}

export const isYEquals = (curr: Position, target:Position) => {
    return curr.y === target.y;

}

export const isXYEqual = (curr: Position, target: Position) => {
    return isXEquals(curr, target) && isYEquals(curr, target)
}