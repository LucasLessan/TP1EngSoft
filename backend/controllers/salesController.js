const crud = require('../database/crud');  // Importing the crud functions

// Function to create a new sale
const newSale = async (req, res) => {
    const { seller_id, sale_date, total_value, items } = req.body;

    if (!seller_id || !sale_date || !total_value || !items || items.length === 0) {
        return res.status(400).json({ error: 'Preencha todos os campos e adicione pelo menos um item.' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            crud.createSale(seller_id, total_value, null, null, null, null, null, (err, result) => {  // Using the createSale function from crud
                if (err) return reject(err);
                resolve(result);
            });
        });

        return res.status(201).json({ id: result, message: 'Venda criada com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar venda.' });
    }
};

// Function to get a sale
const getSale = async (req, res) => {
    const { id, seller_id, sale_date, total_value, payment_method, installment, num_installments, discount } = req.body;
    try {
        const sale = await new Promise((resolve, reject) => {
            crud.readSales(id, seller_id, sale_date, total_value, payment_method, 
                installment, num_installments, discount, (err, rows) => {  // Using the readSales function from crud
                if (err) return reject(err);
                resolve(rows[0]);
            });
        });

        if (!sale) return res.status(404).json({ error: 'Venda não encontrada.' });

        return res.status(200).json({ ...sale, items });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar venda.' });
    }
};

// Function to update a sale
const updateSale = async (req, res) => {
    const { id } = req.params;
    const { seller_id, sale_date, total_value, payment_method, installment, num_installments, discount } = req.body;

    try {
        // Update the sale details (seller_id, sale_date, total_value)
        await new Promise((resolve, reject) => {
            crud.updateSale(id, seller_id, sale_date, total_value, payment_method, 
                installment, num_installments, discount, (err) => {  // Using the updateSale function from crud
                if (err) return reject(err);
                resolve();
            });
        });

        return res.status(200).json({ message: 'Venda atualizada com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar venda.' });
    }
};

// Function to delete a sale
const deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            crud.deleteSale(id, (err) => {  // Using the deleteSale function from crud
                if (err) return reject(err);
                resolve();
            });
        });

        await new Promise((resolve, reject) => {
            crud.deleteSaleItem(id, (err) => {  // Using the deleteSaleItem function from crud
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
    updateSale,
    deleteSale
};
