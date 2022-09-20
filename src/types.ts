export enum CellType  {
    BLACK = 'BLACK',
    WHITE = 'WHITE'
}

export enum FigureType {
    PAWN = 'PAWN',
    QUEEN = 'QUEEN',
    KING = 'KING',
    CASTLE = 'CASTLE',
    ELEPHANT = 'ELEPHANT',
    HORSE = 'HORSE'
}

export type Position = {
    x: number,
    y: number
}

export interface FigureI{
    type: FigureType,
    position: Position,
    img: string,
    color: CellType,
    steps: Position[],
    strategy: any,
    id: number | string
}

export interface CellI{
    type: CellType,
    position: Position,
    figure: FigureI | null
}

interface User{
    figuresType : CellType,
    availableFigures: FigureI[],
}