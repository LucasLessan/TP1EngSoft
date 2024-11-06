// salesItemController.js
const db = require('../database/db');

const addSalesItem = async (req, res) => {
    const { sale_id, product_id, quantity, price } = req.body;

    if (!sale_id || !product_id || !quantity || !price) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO SalesItems (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [sale_id, product_id, quantity, price],
                function(err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
        return res.status(201).json({ id: result, message: 'Item de venda adicionado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao adicionar item de venda.' });
    }
};

const getSalesItems = async (req, res) => {
    const { sale_id } = req.params;
    try {
        const items = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM SalesItems WHERE sale_id = ?', [sale_id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar itens de venda.' });
    }
};

const updateSalesItem = async (req, res) => {
    const { id } = req.params;
    const { quantity, price } = req.body;

    try {
        await new Promise((resolve, reject) => {
            db.run('UPDATE SalesItems SET quantity = ?, price = ? WHERE id = ?', [quantity, price, id], function(err) {
                if (err) return reject(err);
                resolve();
            });
        });
        return res.status(200).json({ message: 'Item de venda atualizado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar item de venda.' });
    }
};

const deleteSalesItem = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM SalesItems WHERE id = ?', [id], function(err) {
                if (err) return reject(err);
                resolve();
            });
        });
        return res.status(200).json({ message: 'Item de venda deletado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao deletar item de venda.' });
    }
};

module.exports = {
    addSalesItem,
    getSalesItems,
    updateSalesItem,
    deleteSalesItem
};
