import {CellI, FigureI} from "../types";
import {
    getModule,
    hasAllyFigure,
    isAvailableDiagonal, isAvailableHorizontal,
    isAvailableVertical,
    isXEquals,
    isYEquals
} from "./utils";

export const horseStrategy = (current: FigureI, target: CellI): boolean => {
    if(!isYEquals(current.position, target.position) && !hasAllyFigure(current, target) && !isXEquals(current.position, target.position)){
        const module = getModule(current.position, target.position);
        return (module.x === 1 && module.y === 2) || (module.x === 2 && module.y === 1)
    }
    return false
}

export const rookStrategy = (current: FigureI, target: CellI, array: CellI[]): boolean => {

    return (isAvailableVertical(current, target, array)
        || isAvailableHorizontal(current, target, array)
    ) && !hasAllyFigure(current, target)  ;
}

export const bishopStrategy = (current: FigureI, target: CellI, array: CellI[]): boolean => {
    if(!isYEquals(current.position, target.position) && !hasAllyFigure(current, target) && !isXEquals(current.position, target.position)){
        return isAvailableDiagonal(current, target, array)
    }
    return false
}

export const queenStrategy = (current: FigureI, target: CellI , array: CellI[]): boolean => {
    return (
            (isAvailableVertical(current, target, array)
                || isAvailableHorizontal(current, target, array))
            || isAvailableDiagonal(current, target, array)
           )
            &&
            !hasAllyFigure(current, target)
}

export const pawnStrategy = (current: FigureI, target: CellI): boolean => {
    if(isXEquals(current.position, target.position) && !hasAllyFigure(current, target)){
        return current.position.y - target.position.y === 1
    }
    return false
}

export const kingStrategy = (current: FigureI, target: CellI, array: CellI[]) => {
    if((
        (isYEquals(current.position, target.position)
            || isXEquals(current.position, target.position))
            || isAvailableDiagonal(current, target, array))
            &&
            !hasAllyFigure(current, target))
    {
        const module = getModule(current.position, target.position);
        return (module.x === 1 || module.y === 1)
    }
    return false
}