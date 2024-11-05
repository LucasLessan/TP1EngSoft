const express = require("express");
const authenticateToken = require('../middlewares/authMiddleware'); // Importa o middleware de autenticação

const productController = require('./controllers/productController');
const { newUser, deleteUser, getUser, updateUSer  } = require("./controllers/usersController");
const saleController = require('./controllers/salesController');
const salesItemController = require('./controllers/salesItemController');
const rotas = express.Router(); // Cria um roteador do Express

rotas.post('/users', newUser)
rotas.get('/users/:id', getUser)
rotas.put('/users/:id', updateUSer)
rotas.delete('/users/:id', deleteUser)

rotas.post('/products', productController.newProduct);
rotas.get('/products/:id', productController.getProduct);
rotas.put('/products/:id', productController.updateProduct);
rotas.delete('/products/:id', productController.deleteProduct);


rotas.post('/sales', saleController.newSale);
rotas.get('/sales/:id', saleController.getSale);
rotas.delete('/sales/:id', saleController.deleteSale);


rotas.post('/salesitems', salesItemController.addSalesItem); // Adicionar item a uma venda
rotas.get('/salesitems/:sale_id', salesItemController.getSalesItems); // Obter itens de uma venda específica
rotas.put('/salesitems/:id', salesItemController.updateSalesItem); // Atualizar item de venda
rotas.delete('/salesitems/:id', salesItemController.deleteSalesItem); // Excluir item de venda

module.exports = rotas;
