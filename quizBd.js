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
      titulo.textContent = "O que uma CHAVE PRIMÁRIA (PRIMARY KEY) garante em uma tabela?";
      r1.textContent = "Que a tabela terá no máximo 1 linha";
      r2.textContent = "Que a coluna sempre será do tipo texto";
      r3.textContent = "Que cada valor da coluna é único e não nulo, identificando cada linha";
      r4.textContent = "Que a coluna aceita valores repetidos";
      configurarRespostas("r3"); 
      break;

    case 2:
      titulo.textContent = "Qual comando SQL retorna nomes distintos da coluna 'cidade'?";
      r1.textContent = "SELECT cidade FROM clientes;";
      r2.textContent = "SELECT DISTINCT cidade FROM clientes;";
      r3.textContent = "SELECT UNIQUE cidade FROM clientes;";
      r4.textContent = "SELECT cidade FROM clientes GROUP;";
      configurarRespostas("r2");
      break;

      case 3:
      titulo.textContent = "O que faz um INNER JOIN entre duas tabelas?";
      r1.textContent = "Retorna todas as linhas de ambas as tabelas, mesmo sem correspondência;";
      r2.textContent = "Cria uma nova tabela vazia;";
      r3.textContent = "Apaga as linhas duplicadas de uma tabela;";
      r4.textContent = "Retorna apenas as linhas que têm correspondência em ambas as tabelas;";
      configurarRespostas("r4");
      break;

      case 4:
      titulo.textContent = "Qual é a principal diferença entre LEFT JOIN e INNER JOIN?";
      r1.textContent = "LEFT JOIN traz todas as linhas da tabela da esquerda, mesmo sem correspondência na direita (com NULL nos campos faltantes);";
      r2.textContent = "Não há diferença, são sinônimos;";
      r3.textContent = "LEFT JOIN é mais rápido sempre;";
      r4.textContent = "LEFT JOIN só funciona com uma tabela;";
      configurarRespostas("r1");
      break;

      case 5:
      titulo.textContent = "O que uma CHAVE ESTRANGEIRA (FOREIGN KEY) faz em um banco relacional?";
      r1.textContent = "Serve apenas para ordenar os dados;";
      r2.textContent = "Impede que a tabela tenha qualquer linha;";
      r3.textContent = "Cria um vínculo entre uma coluna de uma tabela e a chave primária de outra tabela;";
      r4.textContent = "Torna a coluna automaticamente um índice de texto;";
      configurarRespostas("r3");
      break;

      case 6:
      titulo.textContent = "Qual consulta conta quantos pedidos cada cliente fez, agrupando por cliente_id?";
      r1.textContent = "SELECT cliente_id FROM pedidos GROUP;;";
      r2.textContent = "SELECT cliente_id, COUNT(*) FROM pedidos;;";
      r3.textContent = "SELECT COUNT(cliente_id) FROM pedidos ORDER BY cliente_id;;";
      r4.textContent = "SELECT cliente_id, COUNT(*) FROM pedidos GROUP BY cliente_id;;";
      configurarRespostas("r4");
      break;

      case 7:
      titulo.textContent = "O que é normalização de banco de dados?";
      r1.textContent = "Apagar todos os dados duplicados sem alterar a estrutura";
      r2.textContent = "Organizar os dados para reduzir redundância e evitar inconsistências";
      r3.textContent = "Criar uma cópia de segurança do banco";
      r4.textContent = "Aumentar a quantidade de tabelas sem relacioná-las";
      configurarRespostas("r2");
      break;

      case 8:
      titulo.textContent = "Qual cláusula SQL é usada para filtrar resultados DEPOIS de um GROUP BY (ex: só mostrar grupos com mais de 5 registros)?";
      r1.textContent = "ORDER BY;";
      r2.textContent = "FILTER;";
      r3.textContent = "HAVING;";
      r4.textContent = "WHERE;";
      configurarRespostas("r3");
      break;

      case 9:
      titulo.textContent = "No comando SQL abaixo, o que ele faz? UPDATE produtos SET preco = preco * 1.1 WHERE categoria = 'eletronicos';?";
      r1.textContent = "Cria uma nova tabela de eletrônicos;";
      r2.textContent = "Aumenta em 10% o preço de todos os produtos da categoria eletrônicos;";
      r3.textContent = "Reduz o preço em 10%;";
      r4.textContent = "Apaga todos os produtos de eletrônicos;";
      configurarRespostas("r2");
      break;

      case 10:
      titulo.textContent = "Qual é a diferença entre DELETE e TRUNCATE em uma tabela?";
      r1.textContent = "TRUNCATE só funciona em colunas de texto;";
      r2.textContent = "DELETE apaga a tabela inteira do banco, incluindo a estrutura;";
      r3.textContent = "São idênticos em tudo;";
      r4.textContent = "DELETE remove linhas (pode usar WHERE e é reversível em transação); TRUNCATE remove todas as linhas de uma vez, geralmente sem WHERE e mais rápido;";
      configurarRespostas("r4");
      break;

    default:
      titulo.textContent = `Quiz finalizado! Você acertou ${pontos} de 10 perguntas.`;
      [r1, r2, r3, r4].forEach(r => r.style.display = "none");
      salvarPontuacao("bd", pontos);
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
