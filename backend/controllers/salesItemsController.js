const crud = require('../database/crud');  // Importing the crud functions

// Function to add a new sales item
const addSalesItem = async (req, res) => {
    const { sale_id, product_id, quantity, price } = req.body;

    if (!sale_id || !product_id || !quantity || !price) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            crud.createSaleItem(sale_id, product_id, quantity, price, (err, result) => {  // Using the createSaleItem function from crud
                if (err) return reject(err);
                resolve(result);
            });
        });
        return res.status(201).json({ id: result, message: 'Item de venda adicionado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao adicionar item de venda.' });
    }
};

// Function to get all sales items for a specific sale
const getSalesItems = async (req, res) => {
    const { sale_id } = req.params;
    try {
        const items = await new Promise((resolve, reject) => {
            crud.readProductsInSale([sale_id], null, null, null, (err, rows) => {  // Using the readProductsInSale function from crud
                if (err) return reject(err);
                resolve(rows);
            });
        });
        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar itens de venda.' });
    }
};

// Function to update a sales item
const updateSalesItem = async (req, res) => {
    const { id } = req.params;
    const { quantity, price } = req.body;

    if (!quantity || !price) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        await new Promise((resolve, reject) => {
            crud.updateSaleItem(id, quantity, price, (err) => {  // Using the updateSaleItem function from crud
                if (err) return reject(err);
                resolve();
            });
        });
        return res.status(200).json({ message: 'Item de venda atualizado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar item de venda.' });
    }
};

// Function to delete a sales item
const deleteSalesItem = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            crud.deleteSaleItem(id, (err) => {  // Using the deleteSaleItem function from crud
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
