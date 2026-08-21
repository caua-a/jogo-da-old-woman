import styles from "./Square.module.css"
import { useState } from "react";


function Square() {
    const [board, setBoard] = useState(Array(9).fill(null));

    const [xIsNext, setXIsNext] = useState(true);


    function handleClick(index) {
        if (board[index]) return;

        const novoBoard = [...board];
        novoBoard[index] = xIsNext ? 'X' : 'O';

        setBoard(novoBoard);
        setXIsNext(!xIsNext);
        
    }
    let contador = 0
    function checarVencedor(board) {
        contador = contador + 1 
        // Linhas
        if (board[0] && board[0] === board[1] && board[1] === board[2]) return board[0];
        if (board[3] && board[3] === board[4] && board[4] === board[5]) return board[3];
        if (board[6] && board[6] === board[7] && board[7] === board[8]) return board[6];

        // Colunas
        if (board[0] && board[0] === board[3] && board[3] === board[6]) return board[0];
        if (board[1] && board[1] === board[4] && board[4] === board[7]) return board[1];
        if (board[2] && board[2] === board[5] && board[5] === board[8]) return board[2];

        // Diagonais
        if (board[0] && board[0] === board[4] && board[4] === board[8]) return board[0];
        if (board[2] && board[2] === board[4] && board[4] === board[6]) return board[2];
        

        if (contador == 9) {
            return 'Velha'
        } else {
            
            return null;
        }
    }
    function reset(){
        setBoard([])
    }
    
    const vencedor = checarVencedor(board)
    
    const jogador = xIsNext ? 'X' : 'O';
    console.log(contador)
    return (<>

        <main className={styles.main}>
            <h1>Jogo da velha</h1>
            <h2>O vencedoor é: {vencedor}</h2>
            <p>Vez do jogador: {jogador}</p>

            <div className={styles.container}>
                <button onClick={() => handleClick(0)} className={styles.botao}>{board[0]}</button>
                <button onClick={() => handleClick(1)} className={styles.botao}>{board[1]}</button>
                <button onClick={() => handleClick(2)} className={styles.botao}>{board[2]}</button>


                <button onClick={() => handleClick(3)} className={styles.botao}>{board[3]}</button>
                <button onClick={() => handleClick(4)} className={styles.botao}>{board[4]}</button>
                <button onClick={() => handleClick(5)} className={styles.botao}>{board[5]}</button>

                <button onClick={() => handleClick(6)} className={styles.botao}>{board[6]}</button>
                <button onClick={() => handleClick(7)} className={styles.botao}>{board[7]}</button>
                <button onClick={() => handleClick(8)} className={styles.botao}>{board[8]}</button>
            </div>
            <button onClick={reset}>reset</button>
        </main>
    </>
    )
}

export default Square