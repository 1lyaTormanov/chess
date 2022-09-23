import * as React from 'react'
import {FC, useEffect, useState} from 'react'
import {CellI, FigureI} from "./types";
import styles from './Board.module.sass'
import {Cell} from "./Cell";
import {useEffectOnce} from "react-use";
import {findPosition} from "./data/utils";
import {initFigures} from "./data/data_creator";


interface Props{
    isStarted: boolean
}

export const Board: FC<Props> = (props) => {
    const [board, setBoard] = useState<CellI[][]>([]);
    const [figures, setFigures] = useState<FigureI[]>([])
    const [selectedFigure, setSelectedFigure] = useState<FigureI | null>(null)

    useEffect(()=> {
       if(props.isStarted){
           const res: CellI[][] = []
           let x = 0;
           for(x; x < 8; x++){
               res[x] = []
               for(let y = 0; y < 8; y ++){
                   const figure  = figures.find(i => i.position.x === x && i.position.y === y)
                   res[x][y] = {
                           type: findPosition(x,y),
                            position: {
                               x: x, y: y,
                            },
                           figure: figure ?? null
                       }
               }
           }
           setBoard(res)
       }
    },[props.isStarted, figures, selectedFigure])

    useEffectOnce(()=> {
        setFigures(initFigures());
    })

    return (
        <div className={styles.container}>
            {/*<div className={styles.stats}>*/}
            {/*    <h2>BLACK</h2>*/}
            {/*    {killed.filter(t => t.color === CellType.BLACK).map(i =>*/}
            {/*        <div key={i.id}>*/}
            {/*            <div>*/}
            {/*                <div>{i.type}</div>*/}
            {/*                <div>{i.id}</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    <h2>*/}
            {/*        WHITE:*/}
            {/*    </h2>*/}
            {/*    {killed.filter(t => t.color === CellType.WHITE).map(i =>*/}
            {/*        <div key={i.id}>*/}
            {/*            <div>*/}
            {/*                <div>{i.type}</div>*/}
            {/*                <div>{i.id}</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
            <div className={styles.board}>
                {board?.map((row, key) =>
                    <React.Fragment key={key}>
                        {row.map((cell, index) =>
                            <Cell
                                  selectedFigure={selectedFigure}
                                  setSelectedFigure={setSelectedFigure}
                                  key={index}
                                  figures={figures}
                                  setFigures={setFigures}
                                  isAvailable={selectedFigure?.strategy(selectedFigure, cell, row)}
                                  cell={cell}/>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}