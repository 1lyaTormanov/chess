import React, {useState} from 'react';
import {Board} from "./Board";
import {ColorType} from "./types";


function App() {
    const [start, setStart] = useState<boolean>(false);
    const [figuresColor, setFiguresColor] = useState<ColorType | undefined>();
  return (
    <div className="App">
      <div>
          <h2>Выберите цвет:</h2>
          <button onClick={()=> setFiguresColor(ColorType.BLACK)}>
              Черные
          </button>
          <button onClick={()=> setFiguresColor(ColorType.WHITE)}>
              Белые
          </button>
      </div>
        {figuresColor &&
            <button onClick={()=> setStart(!start)}>
                {start? 'Закончить игру': 'Начать игру'}
            </button>
        }
        {start && figuresColor &&
            <Board figuresColor={figuresColor} isStarted={start}/>
        }
    </div>
  );
}

export default App;
