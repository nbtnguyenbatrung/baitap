
import './App.css';
import './css/Game.css'
import Person from './component/person';
import Board from './component/Board';

function App() {
  return (
    <div className="game">
      <Person name = "trung" />
      <div className="game__board">
        <Board/>
      </div>
      <div className="game__infor" >
        <div>{}</div>
        <ul>{}</ul>
      </div>
    </div>
  );
}


export default App;
