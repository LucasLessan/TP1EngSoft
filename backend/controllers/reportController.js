const db = require('../database/db');

// Obter relatório de vendas
const getSalesReport = async (req, res) => {
    try {
        const report = await new Promise((resolve, reject) => {
            db.all('SELECT seller_id, SUM(total_value) AS total_sales FROM Sales GROUP BY seller_id', (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        return res.status(200).json(report);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao gerar relatório de vendas.' });
    }
};

// Obter relatório de produtos
const getProductsReport = async (req, res) => {
    try {
        const report = await new Promise((resolve, reject) => {
            db.all('SELECT name, SUM(quantity) AS total_sold FROM SalesItems JOIN Products ON SalesItems.product_id = Products.id GROUP BY Products.id', (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        return res.status(200).json(report);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao gerar relatório de produtos.' });
    }
};

module.exports = {
    getSalesReport,
    getProductsReport,
};
