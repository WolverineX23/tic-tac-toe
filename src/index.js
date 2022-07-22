import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/*class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={() => this.props.onClick() }>
          {this.props.value}
        </button>
      );
    }
  }
*/
  function Square(props) {                       //函数组件（组件只包含render方法且不包含state）
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }

  class Board extends React.Component {
    constructor(props){                           //父组件完全控制Square子组件 （Square---受控组件）
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,                           //默认先手X
      };
    }

    handleClick(i) {
      const squares = this.state.squares.slice();  //副本  ---‘不可变数据’及其重要性   (利于时间旅行
      if(calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }

    renderSquare(i) {
      return (
        <Square
           value={this.state.squares[i]}
           onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if(winner) {
        status = 'Winner: ' + winner;
      }
      else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

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
    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);