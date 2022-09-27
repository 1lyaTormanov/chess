import * as React from 'react'
import {FC, useEffect, useState} from 'react'
import {CellI, ColorType, FigureI, FigureType, GameParams, GameType, Position} from "./types";
import styles from './Board.module.sass'
import {Cell} from "./Cell";
import {useEffectOnce} from "react-use";
import {findPosition, getModule, isXYEqual, typeToFigure} from "./data/utils";
import {initFigures} from "./data/data_creator";

interface Props{
    gameParams: GameParams
    setGameParams: (data: Partial<GameParams>) => void
}

const additionalFigures: FigureType[] = [
    FigureType.ROOK,
    FigureType.KNIGHT,
    FigureType.BISHOP,
    FigureType.QUEEN,
]

export const Board: FC<Props> = (props) => {
    const [board, setBoard] = useState<CellI[][]>([]);
    const [figures, setFigures] = useState<FigureI[]>([])
    const [selectedFigure, setSelectedFigure] = useState<FigureI | null>(null)
    const [killed, setKilled] = useState<FigureI[]>([]);
    const [module, setModule] = useState<Position>({x: 0, y: 0});
    const [check, setCheck] = useState<{figuresColor: ColorType, checked: boolean  } | null>(null)

    const isWhite = props.gameParams.figuresColor === ColorType.WHITE ? ColorType.BLACK : ColorType.WHITE;

    useEffect(()=> {
       if(selectedFigure){
           const data = getModule(selectedFigure.steps[0], selectedFigure.position)
           setModule(data)
       }
    },[selectedFigure])

    useEffect(()=> {
       if(props.gameParams.start){
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
    },[props.gameParams.start, figures])

    useEffectOnce(()=> {
        setFigures(initFigures());
    })

    const updateCell = (cell: CellI) => {
        if(selectedFigure){
            const result = board.map((row) => {
                if(row.find((elem) => isXYEqual(cell.position, elem.position) )){
                    const rowIndex = row.findIndex(l => isXYEqual(cell.position, l.position));
                    row[rowIndex] = cell;
                }
                return row
            })

            setBoard(result)

            if(cell.figure && cell.figure.id !== selectedFigure.id){
                setFigures(figures.filter(i => i.id !== cell.figure?.id))
                setKilled([...killed, cell.figure]);
            }
        }
    }

    const onSelectAdditionalFigure = (type: FigureType) => {
        if(selectedFigure && selectedFigure.type === FigureType.PAWN){
            if(module.y === 5){

                    const figureProps = {
                        color:props.gameParams.figuresColor,
                        id: `x${selectedFigure.position.x}y${selectedFigure.position.y}`,
                        position: {x: selectedFigure.position.x, y: selectedFigure.position.y},
                        steps: [{x: selectedFigure.position.x, y: selectedFigure.position.y}]
                    }

                    const newFigure = typeToFigure(type, figureProps);
                    if(newFigure){
                        setFigures([...figures.filter(i => !isXYEqual(selectedFigure.position, i.position)), newFigure]);
                        setSelectedFigure(null);
                    }
                    props.setGameParams({figuresColor: isWhite})

            }
        }
    }

    useEffect(()=> {
        const enemyKing = board.flat().find(i => i.figure?.type === FigureType.KING && i.figure.color !== selectedFigure?.color)
        board.flat().forEach(i => {
            if(enemyKing){
                if(i.figure?.strategy(i.figure, enemyKing, board.flat())){
                    if(enemyKing.figure){
                        // alert('check')
                        setCheck({figuresColor: enemyKing.figure?.color, checked: true})
                    }
                }
            }
        })
    },[board, selectedFigure, figures])


    const onMove = (cell: CellI, isAvailable: boolean) =>  {
            if(selectedFigure){
                const isSingle = props.gameParams.type === GameType.SINGLE
                const isSwapFigure = selectedFigure.type === FigureType.PAWN && module.y === 5;
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
                    updateCell(cell);
                    if(isSingle && !isSwapFigure){
                        props.setGameParams({figuresColor: isWhite})
                    }
                    setSelectedFigure( isSwapFigure ? selectedFigure : null);
                }
            }
        }

    return (
        <div className={styles.container}>
                <div className={styles.additional}>
                    {additionalFigures.map((type) => (
                        <div key={type}>
                            <img onClick={()=> {
                                onSelectAdditionalFigure(type);
                            }}
                                 src={require(`./assets/${type.toLowerCase()}_${props.gameParams.figuresColor.toLowerCase()}.png`)}/>
                        </div>
                    ))}
                </div>

            <div className={styles.stats}>
                <h2>BLACK</h2>
                {killed.filter(t => t.color === ColorType.BLACK).map(i =>
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
                {killed.filter(t => t.color === ColorType.WHITE).map(i =>
                    <div key={i.id}>
                        <div>
                            <div>{i.type}</div>
                            <div>{i.id}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.board}
                 style={
                {flexDirection: props.gameParams.type !== GameType.SINGLE &&
                props.gameParams.figuresColor === ColorType.BLACK
                    ? 'column-reverse' : 'column'}}>
                {board?.map((row, key) =>
                    <React.Fragment key={key}>
                        {row.map((cell, index) =>
                            <Cell
                                  selectedFigure={selectedFigure}
                                  setSelectedFigure={setSelectedFigure}
                                  key={index}
                                  onMove={onMove}
                                  gameParams={props.gameParams}
                                  isAvailable={selectedFigure?.strategy(selectedFigure, cell, board.flat())}
                                  cell={cell}/>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}