import {makeBy} from "./utils";
import {PAWN_AMOUNT} from "./consts";
import {Bishop, King, Knight, Pawn, Queen, Rook} from "./models";
import {ColorType, FigureI} from "../types";


export const generateWhitePawns = makeBy(PAWN_AMOUNT, (index) => {
        return Pawn(ColorType.WHITE,`x${index}y${6}`, {x: index, y: 6}, [{x: index, y: 6}] )
} )
export const generateBlackPawns = makeBy(PAWN_AMOUNT, (index) => {
    return Pawn(ColorType.BLACK,`x${index}y${1}`, {x: index, y: 1}, [{x: index, y: 1}] )
} )


export const initFigures = (): FigureI[] => {
    return [
        ...generateWhitePawns,
        ...generateBlackPawns,
        Knight(ColorType.WHITE, `x${1}y${7}`, {x: 1, y: 7}, [{x: 1, y: 7}]),
        Knight(ColorType.WHITE, `x${6}y${7}`, {x: 6, y: 7}, [{x: 6, y: 7}]),
        Knight(ColorType.BLACK, `x${1}y${0}`, {x: 1, y: 0}, [{x: 1, y: 0}]),
        Knight(ColorType.BLACK, `x${6}y${0}`, {x: 6, y: 0}, [{x: 6, y: 0}]),
        Rook(ColorType.WHITE, `x${0}y${7}`, {x: 0, y: 7}, [{x: 0, y: 7}]),
        Rook(ColorType.WHITE, `x${7}y${7}`, {x: 7, y: 7}, [{x: 7, y: 7}]),
        Rook(ColorType.BLACK, `x${0}y${0}`, {x: 0, y: 0},[{x: 0, y: 0}]),
        Rook(ColorType.BLACK, `x${7}y${0}`, {x: 7, y: 0}, [{x: 7, y: 0}]),
        Bishop(ColorType.WHITE, `x${2}y${7}`, {x: 2, y: 7}, [{x: 2, y: 7}]),
        Bishop(ColorType.WHITE, `x${5}y${7}`, {x: 5, y: 7}, [{x: 5, y: 7}]),
        Bishop(ColorType.BLACK, `x${2}y${0}`, {x: 2, y: 0}, [{x: 2, y: 0}]),
        Bishop(ColorType.BLACK, `x${5}y${0}`, {x: 5, y: 0}, [{x: 5, y: 0}]),
        Queen(ColorType.WHITE, `x${3}y${7}`, {x: 3, y: 7}, [{x: 3, y: 7}]),
        Queen(ColorType.BLACK, `x${3}y${0}`, {x: 3, y: 0}, [{x: 3, y: 0}]),
        King(ColorType.WHITE, `x${4}y${7}`, {x: 4, y: 7}, [{x: 4, y: 7}]),
        King(ColorType.BLACK, `x${4}y${0}`, {x: 4, y: 0}, [{x: 4, y: 0}]),
    ]

}