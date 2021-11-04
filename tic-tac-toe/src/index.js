import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'


// class Square extends React.Component {
//     render() {
//         return (
//         <button className="square" 
//             onClick={() => this.props.onClick()}>
//             {this.props.value}
//         </button>
//         );
//     }
// }

var toogleHis = false;

function Square(props) {
    return (
        <button 
            className={props.winner ? 'square winner' : 'square'}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        const winnerRow = this.props.winner;

        return <Square 
            value={this.props.squares[i]}
            key={i}
            onClick={() => this.props.onClick(i)}
            winner={ winnerRow != null && winnerRow.includes(i) ? true : false} />;
    }

    render() {

        const arrayX = [1, 2, 3];
        const arrayY = [1, 2, 3];


        return (
            <div>
                {
                    arrayY.map(y => ( 
                        <div className="board-row" key={y}>
                            {
                                arrayX.map(x => (
                                    this.renderSquare(x*y + (y-1) * (3-x) - 1)
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}


class Game extends React.Component {
    constructor (props) {
        super(props);

        this.state ={
            history: [{
                squares: Array(9).fill(null),
                pos: '',
                isWinner: 'false',
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }
    

    handleClick (i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        const pos = getPos(i + 1);

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        //const winner = calculateWinner(squares);

        //alert(winner);

        this.setState({
            history: history.concat([{
                squares: squares,
                pos: pos,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    toogle() {
        toogleHis = !toogleHis;

        this.forceUpdate();
    }

    render() {

        const history  = this.state.history;

        const current = history[this.state.stepNumber];
        
        const winner = calculateWinner(current.squares);

        const showHistory = toogleHis ? history.slice().reverse() : history;

        const moves = showHistory.map((step, index) => {

            const indexReverse = toogleHis ? Math.abs(index - (history.length - 1)) : index;

            let desc = '';
            let lastClass = '';

            if (toogleHis) {
                lastClass = index === 0 ? 'last-step' : 'step';
                desc = index === (history.length - 1) ? 'Go to game start' : 'Go to move #' + indexReverse;
            } else {
                lastClass = (index + 1 === history.length) ? 'last-step' : 'step';
                desc = index ? 'Go to move #' + index : 'Go to game start';
            }
            
            return (
                <li key={index} className={ lastClass }>
                    <button onClick={() => this.jumpTo(indexReverse)}> {desc} { step.pos } </button>
                </li>
            );

        });
        
        let status;

        if (winner) {
            status = 'Winner: ' + current.squares[winner[0]];
        } else {
            const endGame = current.squares.includes(null) ? false : true;

            if (endGame) {
                status = 'The game draw';
            } else {
                status = 'The next player is ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                           onClick={(i) => this.handleClick(i)}
                           winner={winner}
                    />
                </div>
                <div className="game-info">
                <div>{ status }</div>
                <ol> <button onClick={() => {this.toogle()}}> Toogle</button> </ol>
                <ol>{ moves } </ol>
                </div>
            </div>
        );
    }
}
  
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            //return squares[a];
            return lines[i];
        }
    }

    return null;
}

function getXPos(index) {
    let xPos = index % 3;

    if (xPos === 0) {
        xPos = 3;
    }

    return xPos;
}

function getYPos(index) {
    return Math.ceil(index/3);  
}

function getPos(index) {
    return 'X:' + getXPos(index) + ' Y:' + getYPos(index);
}