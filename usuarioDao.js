const pool = require('./db');

async function buscarPorLoginOuEmail(login) {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ? OR user = ?',
    [login, login]
  );
  return rows[0]; // undefined se não achar
}

async function buscarPorId(id) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}

async function criarUsuario(email, user, senhaHash) {
  const [result] = await pool.query(
    'INSERT INTO usuarios (email, user, senha_hash) VALUES (?, ?, ?)',
    [email, user, senhaHash]
  );
  return result.insertId;
}

module.exports = { buscarPorLoginOuEmail, buscarPorId, criarUsuario };
