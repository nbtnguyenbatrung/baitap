
import './App.css';
import './css/Game.css'
import React from 'react';
import Person from './component/person';
import Board from './component/Board';
import win from './component/Winner';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      history : [{
        squares : Array(9).fill(null)
      }],
      next : true
    };
  }

  handleclick(i){
    const history = this.state.history.slice(0 , this.state.stepnumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(win(squares) || squares[i]){
      return ;
    }
    squares[i] = this.state.next ? "X" : "O";
    this.setState({history : history.concat([{
      squartes : squares
    }]),
        next : !this.state.next
      
    });
  }

  jumpto (step){
    this.setState({
      stepnumber : step ,
      next : (step %2 ) === 0 ,
    })
  }
  render(){
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = win(current.squares);
    const move = history.map((step, move) => {
      const desc = move ? 
      "go to move " + move :
      "go to game start ";
      return (
        <li>
          <button onClick={()=>{
            this.jumpto(move)
          }}>{desc}</button>
        </li>
      )
    })
    var status ;
    if(winner){
      status = "winner : " + winner;
    }else{
        status = "Next Player : " + (this.state.next ? "X" : "O");
    }
    return (
      
      <div className="game">
        <Person name = "trung" />
        <div className="game__board">
          <Board/>
        </div>
        <div className="game__infor" >
          <div>{status}</div>
          <ul>{move}</ul>
        </div>
      </div>
    );
  }
}


export default App;
