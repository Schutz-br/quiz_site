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
            titulo.textContent = "Qual tag HTML é usada para criar um link para outra página?";
            r1.textContent = "<link>";
            r2.textContent = "<a>";
            r3.textContent = "<href>";
            r4.textContent = "<nav>";
            configurarRespostas("r2");
            break;

        case 2:
            titulo.textContent = "Em CSS, qual seletor tem MAIOR especificidade?";
            r1.textContent = "Seletor de tag (ex: p)";
            r2.textContent = "Seletor de classe (ex: .destaque)";
            r3.textContent = "Seletor de ID (ex: #titulo)";
            r4.textContent = "Seletor universal (*)";
            configurarRespostas("r3");
            break;

        case 3:
            titulo.textContent = "O que o código JavaScript abaixo imprime no console? console.log(typeof \"10\" + 5);";
            r1.textContent = "15";
            r2.textContent = "\"105\"";
            r3.textContent = "\"string5\"";
            r4.textContent = "NaN";
            configurarRespostas("r3");
            break;

        case 4:
            titulo.textContent = "Qual propriedade CSS é usada para criar espaçamento interno entre o conteúdo e a borda de um elemento?";
            r1.textContent = "margin";
            r2.textContent = "padding";
            r3.textContent = "border-spacing";
            r4.textContent = "gap";
            configurarRespostas("r2");
            break;

        case 5:
            titulo.textContent = "O que faz o método document.querySelector() em JavaScript?";
            r1.textContent = "Cria um novo elemento HTML";
            r2.textContent = "Retorna o primeiro elemento que corresponde a um seletor CSS";
            r3.textContent = "Remove um elemento do DOM";
            r4.textContent = "Adiciona um evento a um elemento";
            configurarRespostas("r2");
            break;

        case 6:
            titulo.textContent = "Qual a diferença entre let e var em JavaScript?";
            r1.textContent = "Não há diferença";
            r2.textContent = "let tem escopo de bloco, var tem escopo de função";
            r3.textContent = "var é mais moderno que let";
            r4.textContent = "let não pode ser reatribuída";
            configurarRespostas("r2");
            break;

        case 7:
            titulo.textContent = "Em Flexbox (CSS), qual propriedade define a direção principal dos itens dentro de um container?";
            r1.textContent = "flex-direction";
            r2.textContent = "justify-content";
            r3.textContent = "align-items";
            r4.textContent = "flex-wrap";
            configurarRespostas("r1");
            break;

        case 8:
            titulo.textContent = "O que o código abaixo faz? const numeros = [1, 2, 3]; const dobrados = numeros.map(n => n * 2);";
            r1.textContent = "Modifica o array original numeros";
            r2.textContent = "Cria um novo array com cada elemento multiplicado por 2";
            r3.textContent = "Remove elementos do array";
            r4.textContent = "Retorna a soma dos elementos";
            configurarRespostas("r2");
            break;

        case 9:
            titulo.textContent = "Qual status HTTP indica que um recurso foi criado com sucesso?";
            r1.textContent = "200";
            r2.textContent = "201";
            r3.textContent = "404";
            r4.textContent = "500";
            configurarRespostas("r2");
            break;

        case 10:
            titulo.textContent = "O que é responsividade (responsive design) em desenvolvimento web?";
            r1.textContent = "A velocidade de carregamento de um site";
            r2.textContent = "A capacidade de um site se adaptar a diferentes tamanhos de tela";
            r3.textContent = "A capacidade do servidor responder rapidamente a requisições";
            r4.textContent = "O uso de animações em CSS";
            configurarRespostas("r2");
            break;

        default:
            titulo.textContent = `Quiz finalizado! Você acertou ${pontos} de 10 perguntas.`;
            [r1, r2, r3, r4].forEach(r => r.style.display = "none");
            salvarPontuacao("dw", pontos);
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
