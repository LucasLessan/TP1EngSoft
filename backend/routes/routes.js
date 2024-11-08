const express = require("express");
const authenticateToken = require('../middlewares/authMiddleware'); // Importa o middleware de autenticação
const reportController = require('../controllers/reportController');
const productController = require('../controllers/productController');
const usersController = require("../controllers/usersController");
const saleController = require('../controllers/salesController');
const salesItemController = require('../controllers/salesItensController');
const rotas = express.Router(); // Cria um roteador do Express

rotas.post('/users', usersController.newUser);
rotas.get('/users/:id', usersController.getUser);
rotas.put('/users/:id', usersController.updateUser);
rotas.delete('/users/:id', usersController.deleteUser);
rotas.put('/users/:id/permission', usersController.updateUserPermission);
rotas.get('/users', usersController.getUsers);


rotas.post('/products', productController.newProduct);
rotas.get('/products/:id', productController.getProduct);
rotas.put('/products/:id', productController.updateProduct);
rotas.delete('/products/:id', productController.deleteProduct);
rotas.get('/products', productController.getProducts);

rotas.post('/sales', saleController.newSale);
rotas.get('/sales/:id', saleController.getSale);
rotas.delete('/sales/:id', saleController.deleteSale);

rotas.post('/salesitems', salesItemController.addSalesItem); // Adicionar item a uma venda
rotas.get('/salesitems/:sale_id', salesItemController.getSalesItems); // Obter itens de uma venda específica
rotas.put('/salesitems/:id', salesItemController.updateSalesItem); // Atualizar item de venda
rotas.delete('/salesitems/:id', salesItemController.deleteSalesItem); // Excluir item de venda

rotas.get('/reports/sales', reportController.getSalesReport); // Relatório de vendas
rotas.get('/reports/products', reportController.getProductsReport); // Relatório de produtos

module.exports = rotas;
