import {CellI, CellType, FigureI, FigureType, Position} from "./types";
import black_horse_img from "./assets/horse_black.png"
import white_horse_img from "./assets/horse_white.png";


const isXEquals = (curr: Position, target:Position) => {
    if(curr.x === target.x){
        return true
    }
}

const hasAllyFigure = (curr: FigureI, target: CellI) => {
    if(curr.color === target.figure?.color){
        return true
    }
}

const isYEquals = (curr: Position, target:Position) => {
    if(curr.y === target.y){
        return true
    }
}

export const horseStrategy = (current: FigureI, target: CellI): Position[] => {
    const availablePos: Position[] = []
    if(!isYEquals(current.position, target.position) && !hasAllyFigure(current, target) && !isXEquals(current.position, target.position)){
        if(current.position.x - target.position.x === 2 || current.position.x - target.position.x === -2){
                availablePos.push({...target.position, y: target.position.y + 1}, {...target.position, y: target.position.y - 1})
        }
        if(current.position.y - target.position.y === 2 || current.position.y - target.position.y === -2){
            availablePos.push({...target.position, x: target.position.x + 1}, {...target.position, x: target.position.x - 1})
        }
    }
    return availablePos
}

export const Horse = (): FigureI => {
    return {
        color: CellType.BLACK,
        img: white_horse_img,
        id: new Date().getSeconds(),
        position: {
            x: 1,
            y: 0
        },
        steps: [{
            x: 1,
            y: 0
        }],
        strategy: horseStrategy,
        type: FigureType.HORSE
    }
}