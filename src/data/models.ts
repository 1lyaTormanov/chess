import {ColorType, FigureI, FigureType, Position} from "../types";
import white_knight_img from "../assets/knight_white.png";
import black_knight_img from "../assets/knight_black.png";
import black_bishop_img from "../assets/bishop_black.png";
import white_bishop_img from "../assets/bishop_white.png";
import black_queen_img from "../assets/queen_black.png";
import white_queen_img from "../assets/queen_white.png";
import black_king_img from "../assets/king_black.png";
import white_king_img from "../assets/king_white.png";
import black_pawn_img from "../assets/black_pawn.png";
import white_pawn_img from "../assets/white_pawn.png";
import black_rook_img from "../assets/rook_black.png";
import white_rook_img from "../assets/rook_white.png";
import {bishopStrategy, horseStrategy, kingStrategy, pawnStrategy, queenStrategy, rookStrategy} from "./strategies";
import {isBlack} from "./utils";

export const Knight = (color: ColorType, id: string | number, position: Position,steps: Position[]): FigureI => {
    return {
        color: isBlack(color) ? ColorType.BLACK : ColorType.WHITE,
        img: isBlack(color) ? black_knight_img : white_knight_img ,
        strategy: horseStrategy,
        type: FigureType.KNIGHT,
        position: position,
        id: id,
        steps: steps,
    }
}

export const Bishop = (color: ColorType, id: string | number, position: Position,steps: Position[]): FigureI => {
    return {
        color: isBlack(color) ? ColorType.BLACK : ColorType.WHITE,
        img: isBlack(color) ? black_bishop_img : white_bishop_img ,
        strategy: bishopStrategy,
        type: FigureType.BISHOP,
        steps: steps,
        position: position,
        id: id
    }
}

export const Rook = (color: ColorType, id: string | number, position: Position,steps: Position[]): FigureI => {
    return {
        color: isBlack(color) ? ColorType.BLACK : ColorType.WHITE,
        img: isBlack(color) ? black_rook_img : white_rook_img ,
        strategy: rookStrategy,
        type: FigureType.ROOK,
        steps: steps,
        position: position,
        id: id
    }
}

export const Pawn = (color: ColorType, id: string | number, position: Position, steps: Position[]): FigureI => {
    return {
        color: isBlack(color) ? ColorType.BLACK : ColorType.WHITE,
        img: isBlack(color) ? black_pawn_img : white_pawn_img ,
        strategy: pawnStrategy,
        type: FigureType.PAWN,
        steps: steps,
        position: position,
        id: id
    }
}

export const King = (color: ColorType, id: string | number, position: Position, steps: Position[]): FigureI => {
    return {
        color: isBlack(color) ? ColorType.BLACK : ColorType.WHITE,
        img: isBlack(color) ? black_king_img : white_king_img ,
        strategy: kingStrategy,
        type: FigureType.KING,
        steps: steps,
        position: position,
        id: id
    }
}

export const Queen = (color: ColorType, id: string | number, position: Position, steps: Position[]): FigureI => {
    return {
        color: isBlack(color) ? ColorType.BLACK : ColorType.WHITE,
        img: isBlack(color) ? black_queen_img : white_queen_img ,
        strategy: queenStrategy,
        type: FigureType.QUEEN,
        steps: steps,
        position: position,
        id: id
    }
}