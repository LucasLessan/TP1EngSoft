const express = require('express'); // Importa o Express para lidar com as rotas e solicitações HTTP
const cors = require('cors'); // Importa o CORS para permitir solicitações de diferentes origens
const path = require('path'); // Importa o módulo path para manipulação de caminhos
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação

const app = express(); // Cria uma instância do aplicativo Express
const PORT = process.env.PORT || 3000; // Define a porta do servidor

app.use(cors()); // Permite solicitações CORS
app.use(express.json()); // Habilita o parsing de JSON nas requisições

// Rota principal
app.get('/', (req, res) => {
    res.send('It works!'); // Mensagem simples para verificar se o servidor está funcionando
});

// Rotas de autenticação
app.use('/api/auth', authRoutes); // Define as rotas de autenticação

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`); // Log para indicar que o servidor está em execução
});
