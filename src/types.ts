export enum ColorType  {
    BLACK = 'BLACK',
    WHITE = 'WHITE'
}

export enum FigureType {
    PAWN = 'PAWN',
    QUEEN = 'QUEEN',
    KING = 'KING',
    BISHOP = 'BISHOP',
    ROOK = 'ROOK',
    KNIGHT = 'KNIGHT'
}

export type Position = {
    x: number,
    y: number
}

export interface FigureI{
    type: FigureType,
    position: Position,
    img: string,
    color: ColorType,
    steps: Position[],
    strategy: any | null,
    id: number | string
}

export interface CellI{
    type: ColorType,
    position: Position,
    figure: FigureI | null
}
