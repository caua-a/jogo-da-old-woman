import styles from "./Board.module.css";
import { useState } from "react";
import Square from "../Square/Square";

function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [modoImpossivel, setModoImpossivel] = useState(true); // Nova IA imbatível

    function checarVencedor(board) {
        const linhas = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]             // Diagonais
        ];

        for (let linha of linhas) {
            const [a, b, c] = linha;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    // Algoritmo Minimax - IA IMBATÍVEL
    function minimax(boardAtual, profundidade, isMaximizando) {
        const vencedor = checarVencedor(boardAtual);
        
        // Casos base: fim do jogo
        if (vencedor === 'O') return 10 - profundidade; // IA ganha (quanto mais rápido, melhor)
        if (vencedor === 'X') return profundidade - 10; // Jogador ganha
        if (boardAtual.every(casa => casa !== null)) return 0; // Empate

        if (isMaximizando) {
            // Vez da IA (maximizar score)
            let melhorScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (boardAtual[i] === null) {
                    boardAtual[i] = 'O';
                    const score = minimax(boardAtual, profundidade + 1, false);
                    boardAtual[i] = null;
                    melhorScore = Math.max(score, melhorScore);
                }
            }
            return melhorScore;
        } else {
            // Vez do jogador (minimizar score)
            let piorScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (boardAtual[i] === null) {
                    boardAtual[i] = 'X';
                    const score = minimax(boardAtual, profundidade + 1, true);
                    boardAtual[i] = null;
                    piorScore = Math.min(score, piorScore);
                }
            }
            return piorScore;
        }
    }

    function melhorJogada(boardAtual) {
        let melhorScore = -Infinity;
        let jogada = -1;

        for (let i = 0; i < 9; i++) {
            if (boardAtual[i] === null) {
                boardAtual[i] = 'O';
                const score = minimax(boardAtual, 0, false);
                boardAtual[i] = null;

                if (score > melhorScore) {
                    melhorScore = score;
                    jogada = i;
                }
            }
        }
        return jogada;
    }

    // IA aleatória (modo fácil)
    function jogadaIAAleatoria(boardAtual) {
        const casasLivres = boardAtual
            .map((casa, index) => casa === null ? index : null)
            .filter(index => index !== null);
        const aleatorio = Math.floor(Math.random() * casasLivres.length);
        return casasLivres[aleatorio];
    }

    async function jogadaIA(boardAtual) {
        // Simula "pensamento" da IA para não ser instantâneo
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (modoImpossivel) {
            return melhorJogada([...boardAtual]); // Usa Minimax
        } else {
            return jogadaIAAleatoria(boardAtual); // Modo fácil
        }
    }

    const vencedor = checarVencedor(board);
    const ehEmpate = board.every(casa => casa !== null) && !vencedor;

    async function handleClick(index) {
        if (board[index] || vencedor || ehEmpate || isLoading) return;

        const boardDepoisDoX = [...board];
        boardDepoisDoX[index] = "X";
        setBoard(boardDepoisDoX);

        const vencedorX = checarVencedor(boardDepoisDoX);
        if (vencedorX || boardDepoisDoX.every(casa => casa !== null)) {
            return;
        }

        setIsLoading(true);
        try {
            const indexIA = await jogadaIA(boardDepoisDoX);
            
            const boardDepoisDaIA = [...boardDepoisDoX];
            boardDepoisDaIA[indexIA] = "O";
            setBoard(boardDepoisDaIA);
        } finally {
            setIsLoading(false);
        }
    }

    function reset() {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setIsLoading(false);
    }

    const jogador = xIsNext ? "X" : "O";

    return (
        <main className={styles.main}>
            <h1>Jogo da Velha</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={modoImpossivel}
                        onChange={(e) => setModoImpossivel(e.target.checked)}
                    />
                    {' '}Modo Impossível (IA Imbatível)
                </label>
            </div>

            <h2>
                {vencedor && `O vencedor é: ${vencedor}`}
                {ehEmpate && "Empate! Deu velha!"}
                {isLoading && "IA pensando..."}
            </h2>

            {!vencedor && !ehEmpate && !isLoading && (
                <p>Vez do jogador: {jogador}</p>
            )}

            <div className={styles.container}>
                <Square value={board[0]} onClick={() => handleClick(0)} disabled={isLoading} />
                <Square value={board[1]} onClick={() => handleClick(1)} disabled={isLoading} />
                <Square value={board[2]} onClick={() => handleClick(2)} disabled={isLoading} />

                <Square value={board[3]} onClick={() => handleClick(3)} disabled={isLoading} />
                <Square value={board[4]} onClick={() => handleClick(4)} disabled={isLoading} />
                <Square value={board[5]} onClick={() => handleClick(5)} disabled={isLoading} />

                <Square value={board[6]} onClick={() => handleClick(6)} disabled={isLoading} />
                <Square value={board[7]} onClick={() => handleClick(7)} disabled={isLoading} />
                <Square value={board[8]} onClick={() => handleClick(8)} disabled={isLoading} />
            </div>

            <button onClick={reset} disabled={isLoading}>
                Resetar Jogo
            </button>
        </main>
    );
}

export default Board;