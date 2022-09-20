import * as React from 'react'
import {FC} from 'react'
import {CellI, CellType, FigureI} from "./types";
import styles from './Cell.module.sass'
import {Horse, horseStrategy} from "./utils";


interface Props{
    cell: CellI,
    figures: FigureI[],
    setFigures: (arr: FigureI[]) => void,
    selectedFigure: FigureI | null,
    setSelectedFigure: (value: FigureI | null) => void,
    setKilled: (figure: FigureI) => void
}


export const Cell: FC<Props> = ({cell,figures, setFigures, selectedFigure, setSelectedFigure, setKilled }) => {
    const click = (target: CellI) => {
        if(target.figure?.color !== selectedFigure?.color){
            const result = figures.map(i => {
                if(i.position.x === selectedFigure?.position.x && i.position.y === selectedFigure?.position.y){
                    i.position = target.position
                    i.steps.push(target.position)
                    return i
                }
                else{
                    return i
                }
            } )
            setFigures(result);
            if(selectedFigure){
                horseStrategy(selectedFigure, target)
            }
            if(target.figure){
                setKilled(target.figure)
            }//костыль
        }
        setSelectedFigure(null);
    }
    return (
        <div className={` ${ styles.cell}
         ${cell.type === CellType.BLACK ? styles.cell_black : styles.cell_white}
         ${cell.position.x === selectedFigure?.position.x && cell.position.y === selectedFigure?.position.y && styles.selected}
         `}
             onClick={()=> {
                 if(selectedFigure){
                     click(cell)
                 }
             }}
            >
            x: {cell.position.x}
            y: {cell.position.y}
            {cell.figure && <img onClick={()=> setSelectedFigure(cell.figure)} src={cell.figure.img}/>}
        </div>
    )
}