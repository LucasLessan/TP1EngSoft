// saleController.js
const db = require('../database/db');

const newSale = async (req, res) => {
    const { seller_id, sale_date, total_value, items } = req.body;

    // Validações dos campos principais
    if (!seller_id || !sale_date || !total_value || !items || items.length === 0) {
        return res.status(400).json({ error: 'Preencha todos os campos e adicione pelo menos um item.' });
    }

    // Validação dos itens da venda
    for (let item of items) {
        if (!item.product_id || !item.quantity || !item.price || isNaN(item.quantity) || isNaN(item.price) || item.quantity <= 0 || item.price <= 0) {
            return res.status(400).json({ error: 'Cada item deve ter um product_id, quantity e price válidos (maiores que zero).' });
        }
    }

    // Verificação de consistência do total_value
    const calculatedTotalValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    if (calculatedTotalValue !== total_value) {
        return res.status(400).json({ error: `O total_value informado (${total_value}) não corresponde à soma dos itens (${calculatedTotalValue}).` });
    }

    try {
        // Inserir venda
        const saleId = await new Promise((resolve, reject) => {
            db.run('INSERT INTO Sales (seller_id, sale_date, total_value) VALUES (?, ?, ?)', [seller_id, sale_date, total_value], function(err) {
                if (err) return reject(err);
                resolve(this.lastID);  // Retorna o ID da venda
            });
        });

        // Inserir itens de venda
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
        console.error(err);
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
