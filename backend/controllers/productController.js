const crud = require('../database/crud');  // Importing the crud functions

const newProduct = async (req, res) => {
    const { description, quantity, price } = req.body;

    if (!description || !quantity || !price) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            crud.createProduct(description, quantity, price, function(err, result) {  // Using the createProduct function from crud
                if (err) return reject(err);
                resolve(result);
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
            crud.readProducts(id, (err, row) => {  // Using the readProducts function from crud
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
    const { description, quantity, price } = req.body;

    try {
        await new Promise((resolve, reject) => {
            crud.updateProduct(id, description, quantity, price, function(err) {  // Using the updateProduct function from crud
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
            crud.deleteProduct(id, function(err) {  // Using the deleteProduct function from crud
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
