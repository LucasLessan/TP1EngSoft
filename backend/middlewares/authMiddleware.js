const jwt = require('jsonwebtoken'); // Importa o módulo JWT para verificação de tokens

// Middleware para autenticação de tokens
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Obtém o cabeçalho de autorização
    const token = authHeader && authHeader.split(' ')[1]; // Extrai o token após "Bearer"

    if (!token) return res.status(403).json({ error: 'Token não fornecido.' }); // Retorna erro se o token não estiver presente

    // Verifica o token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido.' }); // Retorna erro se o token for inválido
        req.user = user; // Armazena as informações do usuário no objeto req
        next(); // Passa para o próximo middleware ou rota
    });
}

module.exports = authenticateToken; // Exporta o middleware para uso em outras partes do aplicativo
