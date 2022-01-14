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
    renderSquare(i) {
      return ( // passar duas props do Tabuleiro para o Quadrado: value e onClick
      <Square 
      value={this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
       />
      );
    }
  
    render() {
      return ( //Renderiza 9 Squares
        <div>
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
    // Configurar o state inicial para o componente Game em seu constructor
    constructor(props){
      super(props);
      this.state = {
        history: [
          {
        squares: Array(9).fill(null), //estado inicial com array com 9 posicoes preenchidos por null (9 quadrados)
        }
      ],
        stepNumber: 0,
        xIsNext: true, // Controlar quem é o proximo
      };
    }
    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice(); // Criar uma copia do aray de quadrados para modificar
      if (calculateWinner(squares) || squares[i]){ // Se existir um ganhador ou o quadrado ja esteja ocupado (squares[i] != null), sai da funcao!
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([
          {
          squares: squares,
        }
      ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext, //inverter a ordem
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
        'Ir para a jogada #' + move :
        'Reiniciar';
        return(
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

    let status;
    if (winner){
        status = 'O jogador ' + winner + ' ganhou!!!!';
      }
      else {
        status = 'Próximo a jogar: ' + (this.state.xIsNext ? 'X' : 'O'); // Indicar quem é o próximo jogador
      }
      // Renderiza um Board com valores que vamos modificar mais tarde
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <strong><div>Created by joaovitoroliv</div></strong>
            <a className="github" href="https://github.com/joaovitoroliv/jogo-da-velha" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/></a>
            <div>{status}</div>
            <ol>{moves}</ol>
            
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