const sqlite3 = require('sqlite3').verbose(); // Importa o módulo sqlite3 com mensagens detalhadas
const path = require('path'); // Importa o módulo path para manipulação de caminhos de arquivos

// Define o caminho do banco de dados
const dbPath = path.join(__dirname, 'db_pointify.db');

// Cria e exporta a conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados: ", err.message);
    } else {
        console.log("Conectado ao banco de dados.");
    }
});

module.exports = db; // Exporta a conexão para uso em outros módulos
