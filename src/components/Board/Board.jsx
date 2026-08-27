import styles from "./Board.module.css";
import { useState } from "react";
import Square from "../Square/Square";

function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(index) {
        if (board[index] || vencedor) return;

        const novoBoard = [...board];
        novoBoard[index] = xIsNext ? 'X' : 'O';

        setBoard(novoBoard);
        setXIsNext(!xIsNext);
    }

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

    function reset(){
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        document.querySelectorAll('button[type=submit]').forEach((x)=>{
            x.disabled = false;
        });
    }

    const vencedor = checarVencedor(board);

    if (vencedor) {
        document.querySelectorAll('button[type=submit]').forEach((x)=>{
            x.disabled = true;
        });
    } else {
        document.querySelectorAll('button[type=submit]').forEach((x)=>{
            x.disabled = false;
        });
    }
    
    const jogador = xIsNext ? 'X' : 'O';
    
    return (
        <main className={styles.main}>
            <h1>Jogo da Velha</h1>
            <h2>O vencedor é: {vencedor}</h2>
            <p>Vez do jogador: {jogador}</p>

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
            
            <button onClick={reset}>Resetar Jogo</button>
        </main>
    );
}

export default Board;