import '../styles/board.css';
import { useState } from 'react';
import Square from './Square';

function Board () {
    /* On veut ici gérer les States des boutons Squares au sein du composant Board. On initialise squares a un tableau de 9 cellules contenant 'null' */
    const [squares, updateSquares] = useState(Array(9).fill(null));
    const [xTurn, oTurn] = useState(true);

    function handleClick(e, squareValue) {
    //Ajouter ici le splice de squares si on veut ajouter fonction d'immutabilité pour voyage dans le temps
      if(calculateWinner(squares) || calculateDraw(squares) || squares[squareValue]) {
        return; //On sort de la fonction si un joueur a gagné, si la case est déjà remplie ou s'il y a match nul
      }
      else {
        if(xTurn) {
          squares[squareValue] = 'X';
          updateSquares(squares => [...squares, squares[squareValue] = 'X' ]);
          console.log(updateSquares);
          oTurn(false);
        }
        else {
          squares[squareValue] = 'O';
          updateSquares(squares => [...squares, squares[squareValue] = 'O' ]);
          oTurn(true);
        }
        console.log(`button ${squareValue} clicked`);
      }    
    }

    function renderSquare(squareValue) {
      return (
        <Square 
          squareValue={squares[squareValue]}
          onClick={((e)=> handleClick(e, squareValue))}
        />
        // On passe squareValue et onClick au composant Square qu'on récupère en prop chez Square
      )
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
      ]; // Toutes les combinaisons gagnantes possibles sont définies dans la variable lines

      for(let i=0; i<lines.length;i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }

    function calculateDraw (squares) {
      let compteur = 0;
      for(let i=0; i<squares.length; i++) {
        if (squares[i]) {
          compteur++;
          if (compteur === squares.length) {
            return true;
          }
        }
        else {
          return null;
        }
      }
    }

    function reset () { // Fonction permettant de reset le jeu
      updateSquares(Array(9).fill(null)); //On réassigne chaque Square avec null grace au setState updateSquares
      oTurn(true); //On réassigne xTurn à true grace au setState oTurn
    }
    
    let status;
    const winner = calculateWinner(squares);
    const draw = calculateDraw(squares);

    if (winner) {
      status = winner + ' won';
    } else if (draw){
      status = 'Draw !';
    } else {
      status = 'Next Player : ' + (xTurn ? 'X' : 'O');
    }

    return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className='reset'>
            <button className='resetButton' onClick={()=>reset()}>Reset</button>
          </div>
        </div>
      );
    }

export default Board;
