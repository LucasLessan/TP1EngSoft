// productController.js
const db = require('../database/db');

const newProduct = async (req, res) => {
    const { name, description, quantity, price } = req.body;

    if (!name || !description || !quantity || !price) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Products (name, description, quantity, price) VALUES (?, ?, ?, ?)', [name, description, quantity, price], function(err) {
                if (err) return reject(err);
                resolve(this.lastID);
            });
        });
        return res.status(201).json({ id: result, message: 'Produto criado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar produto.' });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Products WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });

        if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar produto.' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, price } = req.body;

    try {
        await new Promise((resolve, reject) => {
            db.run('UPDATE Products SET name = ?, description = ?, quantity = ?, price = ? WHERE id = ?', [name, description, quantity, price, id], function(err) {
                if (err) return reject(err);
                resolve();
            });
        });
        return res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM Products WHERE id = ?', [id], function(err) {
                if (err) return reject(err);
                resolve();
            });
        });
        return res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
};

module.exports = {
    newProduct,
    getProduct,
    updateProduct,
    deleteProduct
};
