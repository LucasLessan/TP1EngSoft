-- Criação da tabela de usuários
CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255) NOT NULL, -- Armazenar o Hash da senha
    tipo_usuario ENUM('admin', 'vendedor', 'gerente', 'cliente') NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- Inserção de dados ficticios
INSERT INTO users (nome, email, senha, tipo_usuario, status, data_criacao, last_login)
VALUES
('João Silva', 'joao.silva@email.com', '1234', 'admin', TRUE, '2024-10-16 10:00:00', '2024-10-16 12:00:00'),
('Maria Oliveira', 'maria.oliveira@email.com', '1234', 'vendedor', TRUE, '2024-10-15 09:30:00', NULL),
('Carlos Souza', 'carlos.souza@email.com', '1234', 'gerente', TRUE, '2024-10-12 11:15:00', '2024-10-13 08:45:00'),
('Ana Santos', 'ana.santos@email.com', '1234', 'vendedor', FALSE, '2024-09-20 14:22:00', '2024-09-25 10:35:00'),
('Beatriz Almeida', 'beatriz.almeida@email.com', '1234', 'gerente', TRUE, '2024-08-10 16:50:00', '2024-09-11 09:20:00');
