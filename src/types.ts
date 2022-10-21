
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


export type StrategyType = (current: FigureI, target: CellI, array: CellI[]) => {
    available: boolean,
    check: boolean
}

export interface FigureI{
    type: FigureType,
    position: Position,
    img: string,
    color: ColorType,
    steps: Position[],
    strategy: any | null,
    id: number | string,
}

export interface CellI{
    type: ColorType,
    position: Position,
    figure: FigureI | null
}

export enum GameType{
    ONLINE = 'ONLINE',
    SINGLE = 'SINGLE'
}

export enum ColorType  {
    BLACK = 'BLACK',
    WHITE = 'WHITE',
}
export interface GameParams{
    figuresColor: ColorType,
    start: boolean,
    type: GameType
}

export interface ErrorType{
    error: string,
    code: number
}

export interface GameParamsR{
    data: GameParams,
    hash: string
}