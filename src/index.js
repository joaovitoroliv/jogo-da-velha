import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component { // Passamos Square para componentes de função - mais simples
  function Square (props){
      return ( // Renderiza um botão
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = { //estado inicial com array com 9 posicoes preenchidos por null (9 quadrados)
        squares: Array(9).fill(null),
        xIsNext: true, // Controlar quem é o proximo
      };
    }

    handleClick(i){
      const squares = this.state.squares.slice(); // Criar uma copia do aray de quadrados para modificar
      if (calculateWinner(squares) || squares[i]){ // Se existir um ganhador ou o quadrado ja esteja ocupado (squares[i] != null), sai da funcao!
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext, //inverter a ordem
      });
    }
    renderSquare(i) {
      return ( // passar duas props do Tabuleiro para o Quadrado: value e onClick
      <Square 
      value={this.state.squares[i]}
      onClick = {() => this.handleClick(i)}
       />
      );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner){
        status = 'O jogador ' + winner + ' ganhou!!!!';
      }
      else {
        status = 'Próximo a jogar: ' + (this.state.xIsNext ? 'X' : 'O'); // Indicar quem é o próximo jogador
      }

      return ( //Renderiza 9 Squares
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
    render() { // Renderiza um Board com valores que vamos modificar mais tarde
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner (squares){
    const lines = [
      // 3 na horizontal na ordem de cima pra baixo
      [0,1,2],
      [3,4,5],
      [6,7,8],
      // 3 na vertical na ordem da esquerda pra direita
      [0,3,6],
      [1,4,7],
      [2,5,8],
      // 2 na diagonal
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++){
      const [a,b,c] = lines [i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }
