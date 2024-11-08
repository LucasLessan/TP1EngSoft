const crud = require('../database/crud');  // Importing the crud functions

const newProduct = async (req, res) => {
    const { name, description, quantity, price } = req.body;

    if (!name, description || !quantity || !price) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            crud.createProduct(name, description, quantity, price, function(err, result) {  // Using the createProduct function from crud
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
    const { id, name, description, quantity, price } = req.query; // Retrieve query parameters

    try {
        await readProducts(id, name, description, quantity, price, (err, rows) => {
            if (err) {
                console.error(`Error fetching products: ${err.message}`);
                return res.status(500).json({ error: 'Erro ao buscar produtos.' });
            }

            if (!rows || rows.length === 0) {
                return res.status(404).json({ error: 'Nenhum produto encontrado.' });
            }

            return res.status(200).json(rows);
        });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, price } = req.body;

    try {
        await new Promise((resolve, reject) => {
            crud.updateProduct(id, name, description, quantity, price, function(err) {  // Using the updateProduct function from crud
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
    deleteProduct,
};
