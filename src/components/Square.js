import '../styles/square.css';

// On récupère squareValue et onClick passés au composant Square en prop via le composant Board
function Square ({squareValue, onClick}) {
      return (
        <button className="square" onClick={onClick}>
          {squareValue}
        </button>
      )
    }

export default Square;