const { readSales, readSalesItems } = require('../database/crud');

// Generate sales report by seller
const getSalesReport = async (req, res) => {
    try {
        readSales(null, null, null, null, null, null, null, (err, sales) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving sales report.' });
            }

            const report = sales.reduce((acc, sale) => {
                const { seller_id, total_value } = sale;
                acc[seller_id] = (acc[seller_id] || 0) + total_value;
                return acc;
            }, {});

            res.status(200).json(report);
        });
    } catch (err) {
        res.status(500).json({ error: 'Error generating sales report.' });
    }
};

// Generate product sales report
const getProductsReport = async (req, res) => {
    try {
        readSalesItems(null, null, null, null, (err, salesItems) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving products report.' });
            }

            const report = salesItems.reduce((acc, item) => {
                const { description, quantity } = item;
                acc[description] = (acc[description] || 0) + quantity;
                return acc;
            }, {});

            res.status(200).json(report);
        });
    } catch (err) {
        res.status(500).json({ error: 'Error generating product report.' });
    }
};

module.exports = {
    getSalesReport,
    getProductsReport,
};
