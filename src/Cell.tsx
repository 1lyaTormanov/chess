import * as React from 'react'
import {FC} from 'react'
import {CellI, ColorType, FigureI, GameParams} from "./types";
import styles from './Cell.module.sass'
import {isEnemy, isXYEqual} from "./data/utils";


interface Props{
    cell: CellI,
    selectedFigure: FigureI | null,
    setSelectedFigure: (value: FigureI | null) => void,
    isAvailable: boolean,
    gameParams: GameParams,
    onMove: (cell: CellI, available: boolean) => void
}


export const Cell: FC<Props> = (
    {
        cell,
        selectedFigure,
        setSelectedFigure,
        isAvailable,
        gameParams,
        onMove
    }
) => {
    return (
        <div className={` ${ styles.cell}
         ${cell.type === ColorType.BLACK ? styles.cell_black : styles.cell_white}
         ${selectedFigure && isXYEqual(cell.position, selectedFigure?.position) && styles.selected}
         `}
            onClick={()=> onMove(cell, isAvailable)}
        >
            { isAvailable &&
                <div className={`${styles.cell_data} ${isEnemy(selectedFigure, cell) ? styles.enemy_cell : styles.available}`}/> }

            <div>
                x{cell.position.x}
                y{cell.position.y}
            </div>

            {cell.figure && <img onClick={()=> {
                if((!selectedFigure || selectedFigure.color === cell.figure?.color) && gameParams.figuresColor === cell.figure?.color ){
                    setSelectedFigure(cell.figure)
                }
            }} src={cell.figure.img}/>}
        </div>
    )
}