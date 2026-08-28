
import styles from "./Board.module.css";
import { useState } from "react";
import Square from "../Square/Square";

function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function checarVencedor(board) {
        if (board[0] && board[0] === board[1] && board[1] === board[2]) return board[0];
        if (board[3] && board[3] === board[4] && board[4] === board[5]) return board[3];
        if (board[6] && board[6] === board[7] && board[7] === board[8]) return board[6];

        if (board[0] && board[0] === board[3] && board[3] === board[6]) return board[0];
        if (board[1] && board[1] === board[4] && board[4] === board[7]) return board[1];
        if (board[2] && board[2] === board[5] && board[5] === board[8]) return board[2];

        if (board[0] && board[0] === board[4] && board[4] === board[8]) return board[0];
        if (board[2] && board[2] === board[4] && board[4] === board[6]) return board[2];

        return null;
    }
    function jogadaIA(board) {
        const casasLivres = board
            .map((casa, index) => casa === null ? index : null)
            .filter(index => index !== null);

        const aleatorio = Math.floor(
            Math.random() * casasLivres.length
        );

        return casasLivres[aleatorio];
    }
    const vencedor = checarVencedor(board);

    const ehEmpate = board.every(casa => casa !== null) && !vencedor;

    console.log("BOARD:", board);
    console.log("VENCEDOR:", vencedor);
    console.log("EMPATE:", ehEmpate);
    function handleClick(index) {
        if (board[index] || vencedor || ehEmpate) return;

        const boardDepoisDoX = [...board];

        boardDepoisDoX[index] = "X";

        setBoard(boardDepoisDoX);


        const vencedorX = checarVencedor(boardDepoisDoX);

        if (vencedorX || boardDepoisDoX.every(casa => casa !== null)) {
            return;
        }

        const indexIA = jogadaIA(boardDepoisDoX);

        const boardDepoisDaIA = [...boardDepoisDoX];

        boardDepoisDaIA[indexIA] = "O";

        setBoard(boardDepoisDaIA);
    }

    function reset() {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    }

    const jogador = xIsNext ? "X" : "O";

    return (
        <main className={styles.main}>
            <h1>Jogo da Velha</h1>

            <h2>
                {vencedor && `O vencedor é: ${vencedor}`}
                {ehEmpate && "Empate! Deu velha!"}
            </h2>

            {!vencedor && !ehEmpate && (
                <p>Vez do jogador: {jogador}</p>
            )}

            <div className={styles.container}>
                <Square value={board[0]} onClick={() => handleClick(0)} />
                <Square value={board[1]} onClick={() => handleClick(1)} />
                <Square value={board[2]} onClick={() => handleClick(2)} />

                <Square value={board[3]} onClick={() => handleClick(3)} />
                <Square value={board[4]} onClick={() => handleClick(4)} />
                <Square value={board[5]} onClick={() => handleClick(5)} />

                <Square value={board[6]} onClick={() => handleClick(6)} />
                <Square value={board[7]} onClick={() => handleClick(7)} />

                <Square value={board[8]} onClick={() => handleClick(8)} />
            </div>

            <button onClick={reset}>
                Resetar Jogo
            </button>
        </main>
    );
}

export default Board;
