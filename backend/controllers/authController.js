const db = require('../database/db'); // Importa a conexão com o banco de dados
const jwt = require('jsonwebtoken'); // Importa o módulo JWT para geração e verificação de tokens
const bcrypt = require('bcrypt'); // Importa o módulo bcrypt para hash e comparação de senhas

// Função de login
exports.login = (req, res) => {
    const { user, passwd } = req.body;

    // Verifica se os campos de usuário e senha foram preenchidos
    if (!user || !passwd) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    // Consulta o banco de dados para verificar se o usuário existe
    db.get('SELECT * FROM Users WHERE email = ?', [user], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar usuário.' });
        }

        if (row) {
            // Compara a senha fornecida com a senha hasheada no banco de dados
            bcrypt.compare(passwd, row.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao verificar senha.' });
                }

                if (result) {
                    // Gera o token JWT com o email do usuário
                    const token = jwt.sign({ email: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.status(200).json({ message: 'Login bem-sucedido!', token });
                } else {
                    return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
                }
            });
        } else {
            return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
        }
    });
};
