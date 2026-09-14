const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
let perguntaAtual = 1;
let pontos = 0;

const titulo = document.getElementById('titulo');
const placar = document.getElementById('placar');
const r1 = document.getElementById('r1');
const r2 = document.getElementById('r2');
const r3 = document.getElementById('r3');
const r4 = document.getElementById('r4');

async function salvarPontuacao(quiz, pontos) {
    if (!usuario) return;
    try {
        await fetch("http://localhost:3000/pontuacoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuarioId: usuario.id, quiz, pontos })
        });
    } catch (erro) {
        console.error("Não foi possível salvar a pontuação:", erro);
    }
}

function carregarPergunta() {
    switch (perguntaAtual) {
        case 1:
            titulo.textContent = "Qual é o tipo de dado correto para armazenar um valor decimal com maior precisão em Java?";
            r1.textContent = "boolean;";
            r2.textContent = "int;";
            r3.textContent = "double;";
            r4.textContent = "char";
            configurarRespostas("r3");
            break;

        case 2:
            titulo.textContent = "O que o código abaixo imprime? int x = 5; int y = 2; System.out.println(x / y);";
            r1.textContent = "3;";
            r2.textContent = "2;";
            r3.textContent = "2.5;";
            r4.textContent = "Erro de compilação;";
            configurarRespostas("r2");
            break;

        case 3:
            titulo.textContent = "Qual palavra-chave é usada em Java para herdar uma classe?";
            r1.textContent = "super;";
            r2.textContent = "implements;";
            r3.textContent = "extends;";
            r4.textContent = "inherits;";
            configurarRespostas("r3");
            break;


        case 4:
            titulo.textContent = "O que representa o conceito de encapsulamento em POO?";
            r1.textContent = "Permitir que uma classe herde de várias outras";
            r2.textContent = "Esconder os detalhes internos de uma classe e expor apenas o necessário";
            r3.textContent = "Transformar métodos em estáticos";
            r4.textContent = "Criar múltiplas instâncias de uma classe";
            configurarRespostas("r2");
            break;

        case 5:
            titulo.textContent = "Qual é a saída do código? for (int i = 0; i < 3; i++) { System.out.print(i + \" \"); }";
            r1.textContent = "0 1 2";
            r2.textContent = "1 2 3";
            r3.textContent = "0 1 2 3";
            r4.textContent = "Erro de compilação";
            configurarRespostas("r1");
            break;

        case 6:
            titulo.textContent = "Qual estrutura de dados em Java NÃO permite elementos duplicados?";
            r1.textContent = "ArrayList";
            r2.textContent = "LinkedList";
            r3.textContent = "HashSet";
            r4.textContent = "Array";
            configurarRespostas("r3");
            break;

        case 7:
            titulo.textContent = "O que acontece ao tentar acessar um índice inexistente em um array em Java?";
            r1.textContent = "Retorna null";
            r2.textContent = "Retorna 0";
            r3.textContent = "Lança ArrayIndexOutOfBoundsException";
            r4.textContent = "O programa ignora e continua";
            configurarRespostas("r3");
            break;

        case 8:
            titulo.textContent = "Qual modificador de acesso permite que um atributo seja acessado apenas dentro da própria classe?";
            r1.textContent = "public";
            r2.textContent = "protected";
            r3.textContent = "private";
            r4.textContent = "default";
            configurarRespostas("r3");
            break;

        case 9:
            titulo.textContent = "Qual é a diferença principal entre uma interface e uma classe abstrata em Java (a partir do Java 8)?";
            r1.textContent = "Interface não pode ter métodos, classe abstrata sim";
            r2.textContent = "Uma classe pode implementar várias interfaces, mas só pode estender uma classe abstrata";
            r3.textContent = "Classe abstrata não pode ter atributos";
            r4.textContent = "Não existe diferença, são sinônimos";
            configurarRespostas("r2");
            break;

        case 10:
            titulo.textContent = "O que faz o bloco try-catch em Java?";
            r1.textContent = "Declara uma nova classe";
            r2.textContent = "Captura e trata exceções em tempo de execução";
            r3.textContent = "Cria um novo objeto";
            r4.textContent = "Define um método estático";
            configurarRespostas("r2");
            break;

        default:
            titulo.textContent = `Quiz finalizado! Você acertou ${pontos} de 10 perguntas.`;
            [r1, r2, r3, r4].forEach(r => r.style.display = "none");
            salvarPontuacao("java", pontos);
    }
}

function configurarRespostas(idCorreto) {
    const botoes = [r1, r2, r3, r4];

    botoes.forEach(botao => {

        botao.onclick = () => {
            if (botao.id === idCorreto) {
                pontos++;
                placar.textContent = `${pontos} ${pontos === 1 ? "ponto" : "pontos"}`;
                alert("Resposta Correta!");
            } else {
                alert("Resposta Incorreta!");
            }
            perguntaAtual++;
            carregarPergunta();
        };
    });
}

carregarPergunta();
