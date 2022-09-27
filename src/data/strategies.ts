import {CellI, FigureI, FigureType} from "../types";
import {
    getModule,
    hasAllyFigure,
    isAvailableDiagonal, isAvailableHorizontal,
    isAvailableVertical, isBlack, isInitialPosition, isKing, isTurnRepeat,
    isXEquals, isXYEqual,
    isYEquals
} from "./utils";

export const horseStrategy = (current: FigureI, target: CellI): boolean => {
    if(!isXYEqual(current.position, target.position) && !hasAllyFigure(current, target)){
        const module = getModule(current.position, target.position);
        return (module.x === 1 && module.y === 2) || (module.x === 2 && module.y === 1)
    }
    return false
}

export const rookStrategy = (current: FigureI, target: CellI, array: CellI[]): boolean => {
    return (isAvailableVertical(current, target.position, array) || isAvailableHorizontal(current, target, array))
            && !hasAllyFigure(current, target);
}

export const bishopStrategy = (current: FigureI, target: CellI, array: CellI[]): boolean => {
    if(!isXYEqual(current.position, target.position) && !hasAllyFigure(current, target)){
        return isAvailableDiagonal(current, target, array)
    }
    return false
}

export const queenStrategy = (current: FigureI, target: CellI , array: CellI[]): boolean => {
    return (
            (
            isAvailableVertical(current, target.position, array)
            || isAvailableHorizontal(current, target, array))
            || isAvailableDiagonal(current, target, array)
           )
            &&
            !hasAllyFigure(current, target)
}

export const pawnStrategy = (current: FigureI, target: CellI, array: CellI[]): boolean => {
    const module = getModule(current.position, target.position);
    if((isXEquals(current.position, target.position) && !target.figure) && !hasAllyFigure(current, target) && !isTurnRepeat(current,target) ){
        if(isInitialPosition(current)){
            return module.y <= 2
        }
        else{
            return isBlack(current.color) ? (current.position.y - target.position.y ) === -1 : (current.position.y - target.position.y ) === 1
        }
    }
    if(isAvailableDiagonal(current, target, array) && target.figure && target.figure?.color !== current.color){
       return isBlack(current.color) ? (current.position.y - target.position.y ) === -1 : (current.position.y - target.position.y ) === 1
    }
    return false
}

export const kingStrategy = (current: FigureI, target: CellI, array: CellI[]) => {
    const module = getModule(current.position, target.position);

    if((
        (
            isYEquals(current.position, target.position)
            || isXEquals(current.position, target.position))
            || isAvailableDiagonal(current, target, array)
        )
            &&
            !hasAllyFigure(current, target))
    {
        return (module.x === 1 || module.y === 1)
    }
    return false
}