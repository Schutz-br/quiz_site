const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { buscarPorLoginOuEmail, criarUsuario } = require('./usuarioDao');
const { salvarPontuacao, buscarPontuacoesPorUsuario } = require('./pontuacaoDao');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/cadastro', async (req, res) => {
  try {
    const { email, user, senha, confirmarSenha } = req.body;

    if (!email || !user || !senha) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }
    if (user.length < 4 || user.length > 20) {
      return res.status(400).json({ erro: 'Nome de usuário deve ter entre 4 e 20 caracteres.' });
    }
    if (senha.length < 7) {
      return res.status(400).json({ erro: 'A senha deve ter no mínimo 7 caracteres.' });
    }
    if (confirmarSenha !== undefined && senha !== confirmarSenha) {
      return res.status(400).json({ erro: 'As senhas não coincidem!' });
    }

    const jaExistePorEmail = await buscarPorLoginOuEmail(email);
    const jaExistePorUser = await buscarPorLoginOuEmail(user);
    if (jaExistePorEmail || jaExistePorUser) {
      return res.status(400).json({ erro: 'E-mail ou nome de usuário já cadastrado!' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await criarUsuario(email, user, senhaHash);

    res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { login, senha } = req.body;

    const usuario = await buscarPorLoginOuEmail(login);
    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário/e-mail ou senha incorretos!' });
    }

    const senhaOk = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaOk) {
      return res.status(401).json({ erro: 'Usuário/e-mail ou senha incorretos!' });
    }

    res.json({
      id: usuario.id,
      user: usuario.user,
      email: usuario.email,
      tipo: usuario.tipo
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
});

app.post('/pontuacoes', async (req, res) => {
  try {
    const { usuarioId, quiz, pontos } = req.body;

    if (!usuarioId || !quiz || pontos === undefined) {
      return res.status(400).json({ erro: 'Dados incompletos.' });
    }

    await salvarPontuacao(usuarioId, quiz, pontos);
    res.status(201).json({ mensagem: 'Pontuação salva com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao salvar pontuação.' });
  }
});

app.get('/pontuacoes/:usuarioId', async (req, res) => {
  try {
    const pontuacoes = await buscarPontuacoesPorUsuario(req.params.usuarioId);
    res.json(pontuacoes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar pontuações.' });
  }
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
