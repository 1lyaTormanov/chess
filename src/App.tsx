import React, {useState} from 'react';
import {Board} from "./Board";


function App() {
    const [start, setStart] = useState<boolean>(false)
  return (
    <div className="App">
      <button onClick={()=> setStart(!start)}>
          {start? 'Закончить игру': 'Начать игру'}
      </button>
        {start &&
            <Board isStarted={start}/>
        }
    </div>
  );
}

export default App;
