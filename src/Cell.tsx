import * as React from 'react'
import {FC} from 'react'
import {CellI, ColorType, FigureI} from "./types";
import styles from './Cell.module.sass'
import {isXYEqual} from "./data/utils";


interface Props{
    cell: CellI,
    selectedFigure: FigureI | null,
    setSelectedFigure: (value: FigureI | null) => void,
    isAvailable: boolean,
    figures: FigureI[]
    setFigures: (data: FigureI[]) => void
}


export const Cell: FC<Props> = (
    {
        cell,
        selectedFigure,
        setSelectedFigure,
        isAvailable,
        figures,
        setFigures }
) => {

    const isEnemy = cell?.figure?.color !== selectedFigure?.color && cell.figure
    const onMove = () => {
        if(selectedFigure){
            if(isAvailable){
                const result = figures.map(i => {
                    if(isXYEqual(i.position, selectedFigure?.position)){
                        i.position = cell.position
                        i.steps.push(cell.position)
                        return i
                    }
                    else{
                        return i
                    }
                })
                setFigures(result);
            }
        }
    }
    return (
        <div className={` ${ styles.cell}
         ${cell.type === ColorType.BLACK ? styles.cell_black : styles.cell_white}
         ${selectedFigure && isXYEqual(cell.position, selectedFigure?.position) && styles.selected}
         `}
            onClick={onMove}
        >
            { isAvailable &&
                <div className={`${styles.cell_data} ${isEnemy ? styles.enemy_cell : styles.available}`}/> }
            {cell.figure && <img onClick={()=> setSelectedFigure(cell.figure)} src={cell.figure.img}/>}
        </div>
    )
}