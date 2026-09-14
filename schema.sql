-- Rode este script no MySQL Workbench (ou "mysql -u root -p") antes de iniciar o servidor

CREATE DATABASE IF NOT EXISTS quiz_app;
USE quiz_app;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  user VARCHAR(20) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  tipo VARCHAR(10) NOT NULL DEFAULT 'comum'
);

CREATE TABLE IF NOT EXISTS pontuacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  quiz VARCHAR(10) NOT NULL, -- 'java', 'bd' ou 'dw'
  pontos INT NOT NULL,
  data DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Se quiser criar um usuário admin manualmente, gere o hash da senha com bcrypt
-- (ex: rode `node -e "console.log(require('bcrypt').hashSync('sua_senha', 10))"`)
-- e insira aqui o hash gerado:
-- INSERT INTO usuarios (email, user, senha_hash, tipo)
-- VALUES ('admin@exemplo.com', 'Kryzn', '<hash_gerado_aqui>', 'admin');
