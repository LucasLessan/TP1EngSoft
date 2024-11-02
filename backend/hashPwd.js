const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(plainPassword, saltRounds);
        console.log(`Senha hasheada: ${hashed}`);
    } catch (error) {
        console.error('Erro ao hashear a senha:', error);
    }
};

const password = 'password123'; // Substitua pela senha desejada
hashPassword(password);

