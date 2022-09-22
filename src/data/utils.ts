import {CellI, ColorType, FigureI, Position} from "../types";

export const makeBy = (count: number, callback: (i: number) => any) => {
    const res = [];
    for(let i = 0; i < count; i++){
        res.push(callback(i));
    }

    return res;
}


export const isAvailableDiagonal = (current: FigureI, target: CellI) => {
    const module = getModule(current.position, target.position);

    return (module.x === module.y)
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