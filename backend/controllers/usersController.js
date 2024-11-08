const crud = require('../database/crud'); // Importing the crud functions
const bcrypt = require('bcrypt'); // To compare passwords
const jwt = require('jsonwebtoken'); // For generating and verifying tokens

// Function to create a new user
const newUser = async (req, res) => {
    const { name, email, password, user_type } = req.body;

    if (!name || !email || !password || !user_type) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        // Gerar o hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await new Promise((resolve, reject) => {
            crud.createUser(name, email, hashedPassword, user_type, (err, result) => {  // Using the createUser function from crud
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

        return res.status(201).json({ id: result, message: 'Usuário criado com sucesso!' });
    } catch (err) {
        console.error("Erro geral ao inserir usuário:", err); // Log adicional para erros gerais
        return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};

// Function to get a specific user
const getUser = async (req, res) => {
    const { id, name, email, user_type } = req.body;
    try {
        const row = await new Promise((resolve, reject) => {
            crud.getUser(id, name, email, user_type, (err, row) => {  // Using the getUser function from crud
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

// Function to update a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, user_type } = req.body;

    try {
        await new Promise((resolve, reject) => {
            crud.updateUser(id, name, email, user_type, (err) => {  // Using the updateUser function from crud
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

// Function to delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            crud.deleteUser(id, (err) => {  // Using the deleteUser function from crud
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


module.exports = {
    newUser,
    getUser,
    updateUser,
    deleteUser,
};
