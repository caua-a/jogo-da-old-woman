const API_KEY = 'sk-ws-H.DDMPIRD.fc3E.MEYCIQDotFHig8nuVHaFP5eOr8w6r74hWJUjApPfLDV7O_u1hQIhAOcfuMlFDBSG08vTNHpmbFakFgtmftc7E4XUgbbfdBAE';
const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

export async function chamarQwen(board) {
    const prompt = `Você é uma IA jogando jogo da velha como 'O'. O tabuleiro é um array de 9 posições (0 a 8). Posições null estão vazias. 'X' é o oponente. 'O' é você.
Tabuleiro atual: ${JSON.stringify(board)}
Retorne APENAS o número do índice (0 a 8) onde você quer jogar. Não retorne texto, não retorne JSON, apenas o número.`;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "qwen-turbo",
            messages: [
                {
                    role: "system",
                    content: "Você é um jogador de jogo da velha. Responda apenas com o número do índice de 0 a 8."
                },
                { role: "user", content: prompt }
            ],
            temperature: 0.1
        })
    });

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}   