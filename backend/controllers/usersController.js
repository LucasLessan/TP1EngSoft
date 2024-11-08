const db = require('../database/db'); // Conexão com o banco de dados
const bcrypt = require('bcrypt'); // Para comparação de senhas
const jwt = require('jsonwebtoken'); // Para geração e verificação de tokens

// Inserir novo usuário
const newUser = async (req, res) => {
    const { name, email, password, user_type } = req.body;

    if (!name || !email || !password || !user_type) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        // Gerar o hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO Users (name, email, password, user_type) VALUES (?, ?, ?, ?)', 
                [name, email, hashedPassword, user_type], 
                function (err) {
                    if (err) {
                        console.error("Erro ao inserir usuário:", err); // Log do erro para debug
                        return reject(err);
                    }
                    console.log("Usuário inserido com ID:", this.lastID); // Log do ID gerado
                    resolve(this.lastID); 
                }
            );
        });

        return res.status(201).json({ id: result, message: 'Usuário criado com sucesso!' });
    } catch (err) {
        console.error("Erro geral ao inserir usuário:", err); // Log adicional para erros gerais
        return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, user_type } = req.body;

    try {
        await new Promise((resolve, reject) => {
            db.run('UPDATE Users SET name = ?, email = ?, user_type = ? WHERE id = ?', [name, email, user_type, id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
};

const updateUserPermission = async (req, res) => {
    const { id } = req.params;
    const { user_type } = req.body;

    if (!user_type) {
        return res.status(400).json({ error: 'Preencha o campo de permissões.' });
    }

    try {
        await new Promise((resolve, reject) => {
            db.run('UPDATE Users SET user_type = ? WHERE id = ?', [user_type, id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        return res.status(200).json({ message: 'Permissão do usuário atualizada com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar permissão do usuário.' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM Users WHERE id = ?', [id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
        return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const row = await new Promise((resolve, reject) => {
            db.get('SELECT id, name, email, password, user_type FROM Users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });

        if (!row) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        return res.status(200).json(row);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
};

const getUsers = async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all('SELECT id, name, email, password, user_type FROM Users', [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nenhum usuário encontrado.' });
        }
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

module.exports = {
    getUser,
    getUsers,  // Não se esqueça de exportar a nova função
    newUser,
    updateUser,
    deleteUser,
    updateUserPermission,
};
