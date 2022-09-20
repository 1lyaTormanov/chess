import * as React from 'react'
import {FC, useEffect, useState} from 'react'
import {CellI, CellType, FigureI, FigureType} from "./types";
import styles from './Board.module.sass'
import black_horse_img from "./assets/horse_black.png";
import white_pawn_img from './assets/white_pawn.png'
import black_pawn_img from './assets/black_pawn.png'
import {Cell} from "./Cell";
import {useEffectOnce} from "react-use";


interface Props{
    isStarted: boolean
}
const findPosition = (x: number, y: number) => {
    if(( x % 2 === 0  && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
        return CellType.BLACK
    }
    else{
       return CellType.WHITE
    }
}

export const Board: FC<Props> = (props) => {
    const [board, setBoard] = useState<CellI[][]>([]);
    const [figures, setFigures] = useState<FigureI[]>([])
    const [selectedFigure, setSelectedFigure] = useState<FigureI | null>(null)
    const [killed, setKilled] = useState<FigureI[]>([]);

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
    },[props.isStarted, figures])

    useEffectOnce(()=> {
        const res: FigureI[] = []
        for(let i = 0; i < 8; i++){
            const white_pawn: FigureI = {
                type: FigureType.PAWN,
                id: `x${i}y${6}`,
                position: {
                    x: i,
                    y:6,
                },
                img: white_pawn_img,
                color: CellType.WHITE,
                steps: [{
                    x: i,
                    y: 6
                }],
                strategy: undefined
            }
            const black_pawn: FigureI = {
                type: FigureType.PAWN,
                id:`x${i}y${1}`,
                position: {
                    x: i,
                    y: 1
                },
                img: black_pawn_img,
                color: CellType.BLACK,
                steps: [{
                    x: i,
                    y: 1
                }],
                strategy: undefined
            }
            res.push(white_pawn, black_pawn)
        }
        res.push({
            type: FigureType.HORSE,
            id: `x${1}y${0}`,
            position: {
                x: 1,
                y: 0,
            },
            img: black_horse_img,
            color: CellType.BLACK,
            steps: [{
                x: 1,
                y: 0,
            }],
            strategy: undefined
        })
        setFigures(res);
    })

    const onKill = (target:FigureI) => {
        setKilled([...killed, target]);
        setFigures((prev) => prev.filter(i => i.id !== target.id));
    }
    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <h2>BLACK</h2>
                {killed.filter(t => t.color === CellType.BLACK).map(i =>
                    <div key={i.id}>
                        <div>
                            <div>{i.type}</div>
                            <div>{i.id}</div>
                        </div>
                    </div>
                )}
                <h2>
                    WHITE:
                </h2>
                {killed.filter(t => t.color === CellType.WHITE).map(i =>
                    <div key={i.id}>
                        <div>
                            <div>{i.type}</div>
                            <div>{i.id}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.board}>
                {board?.map((row, key) =>
                    <React.Fragment key={key}>
                        {row.map((cell, index) =>
                            <Cell setFigures={setFigures}
                                  selectedFigure={selectedFigure}
                                  setSelectedFigure={setSelectedFigure}
                                  figures={figures}
                                  key={index}
                                  setKilled={onKill}
                                  cell={cell}/>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}