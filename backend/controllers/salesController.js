// saleController.js
const db = require('../database/db');

const newSale = async (req, res) => {
    const { seller_id, sale_date, total_value, items } = req.body;

    if (!seller_id || !sale_date || !total_value || !items || items.length === 0) {
        return res.status(400).json({ error: 'Preencha todos os campos e adicione pelo menos um item.' });
    }

    try {
        const saleId = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Sales (seller_id, sale_date, total_value) VALUES (?, ?, ?)', [seller_id, sale_date, total_value], function(err) {
                if (err) return reject(err);
                resolve(this.lastID);
            });
        });

        await Promise.all(items.map(item => {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO SalesItems (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [saleId, item.product_id, item.quantity, item.price], (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }));

        return res.status(201).json({ saleId, message: 'Venda criada com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar venda.' });
    }
};

const getSale = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM Sales WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });

        if (!sale) return res.status(404).json({ error: 'Venda não encontrada.' });

        const items = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM SalesItems WHERE sale_id = ?', [id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        return res.status(200).json({ ...sale, items });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar venda.' });
    }
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM Sales WHERE id = ?', [id], function(err) {
                if (err) return reject(err);
                resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM SalesItems WHERE sale_id = ?', [id], function(err) {
                if (err) return reject(err);
                resolve();
            });
        });

        return res.status(200).json({ message: 'Venda deletada com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao deletar venda.' });
    }
};

module.exports = {
    newSale,
    getSale,
    deleteSale
};
