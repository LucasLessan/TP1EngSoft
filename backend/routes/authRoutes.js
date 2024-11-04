const express = require('express'); // Importa o Express para definir as rotas
const { login } = require('../controllers/authController'); // Importa a função de login do controlador
const authenticateToken = require('../middlewares/authMiddleware'); // Importa o middleware de autenticação

const router = express.Router(); // Cria um roteador do Express

// Rota para login
router.post('/login', login);

// Rota protegida que exige autenticação
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Esta é uma rota protegida.' }); // Mensagem de sucesso
});

// Exporta o roteador para uso no servidor
module.exports = router;
