import React from 'react';
import {Board} from "./Board";
import {ColorType, GameParams, GameType} from "./types";
import {useSetState} from "react-use";

function App() {
  const [gameParams, setGameParams] = useSetState<GameParams>({figuresColor: ColorType.WHITE, start: false, type: GameType.SINGLE})

  return (
    <div className="App">
        <div>
            <h2>
                Выберите режим игры
            </h2>
            <button onClick={()=> setGameParams({type: GameType.SINGLE})}>
                Одиночный
            </button>
            <button onClick={()=> setGameParams({type: GameType.ONLINE})}>
                Онлайн
            </button>
        </div>
        {gameParams.type !== GameType.SINGLE &&
            <div>
                <h2>Выберите цвет:</h2>
                <button onClick={()=> setGameParams({figuresColor: ColorType.BLACK})}>
                    Черные
                </button>
                <button onClick={()=> setGameParams({figuresColor: ColorType.WHITE})}>
                    Белые
                </button>
            </div>
        }
        {gameParams.figuresColor &&
            <button onClick={()=> setGameParams({start: !gameParams.start})}>
                {gameParams.start? 'Закончить игру': 'Начать игру'}
            </button>
        }
        {gameParams.start && gameParams.figuresColor &&
            <Board setGameParams={setGameParams} gameParams={gameParams}/>
        }
    </div>
  );
}

export default App;
