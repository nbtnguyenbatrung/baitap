
import '../css/Board.css'
import React from 'react';
import Square from "./Square";
import win from './Winner';

class Board extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            squares : Array(9).fill(null),
            next : true
        };
        
    }
    handlerCLick(i){
        const squares = this.state.squares.slice();
        if( win(squares) || squares[i] ){
            return ;
        }
        squares[i] = this.state.next ? "X" : "O";
        this.setState({squares : squares,
            next : !this.state.next
        });
    }
    renderSquare = (i)=>{
        return <Square 
            value = {this.state.squares[i]}
            onClick={()=>this.handlerCLick(i)}
        /> ;
    }

    render(){
        const winner = win(this.state.squares);
        
        var status ;
        if(winner){
            status = "winner : " + winner;
        }else{
            status = "Next Player : " + (this.state.next ? "X" : "O");
        }
        return (

            <div>
                <div className="status">{status}</div>
                <div className="board__row"> 
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board__row"> 
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board__row"> 
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board ;