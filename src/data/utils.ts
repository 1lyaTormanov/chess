import {CellI, ColorType, FigureI, FigureType, Position} from "../types";

export const isKing = (current: FigureI, target:CellI) => {
    return !!(target.figure && target.figure.type === FigureType.KING);

}

export const  isTurnRepeat = (current: FigureI, target:CellI) => {
    return current.steps.find(i => isXYEqual(i, target.position))
}

export const isInitialPosition = (current:FigureI) => {
    return isXYEqual(current.position , current.steps[0]);
}

export const isAvailableVertical = (current: FigureI, target:Position, array: CellI[]) => {
    const min = Math.min(current.position.y, target.y);
    const max = Math.max(current.position.y, target.y);

    if(current.position.x !== target.x){
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
    for(let i = min + 1 ; i < max; i++){
        if(array.find(el => el.position.y === current.position.y && el.position.x === i)?.figure){
            return false
        }
    }
    return true
}

export const isAvailableDiagonal = (current: FigureI, target: CellI, array: CellI[]) => {
    const module = getModule(current.position, target.position);
    if(module.x !== module.y){
        return false
    }
    const dy = current.position.y < target.position.y ? 1 : - 1;
    const dx = current.position.x < target.position.x ? 1 : - 1;

    for( let i = 0; i < module.y; i++){
        if(array.find(el => {
            return  (el.position.x === current.position.x + dx * i && el.position.y === current.position.y + dy * i)
                && !isXYEqual(current.position, el.position)
        })?.figure){
            return false
        }
    }
    return true
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