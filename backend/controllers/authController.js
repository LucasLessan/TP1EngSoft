const crud = require('../database/crud'); // Import the crud functions
const jwt = require('jsonwebtoken'); // For generating and verifying tokens
const bcrypt = require('bcrypt'); // For hashing and comparing passwords

// Login function
exports.login = (req, res) => {
    const { user, passwd } = req.body;

    // Check if username and password fields are filled
    if (!user || !passwd) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    // Check if the user exists in the database
    crud.getUserByEmail(user, async (err, row) => {  // Using the getUserByEmail function from crud
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar usuário.' });
        }

        if (row) {
            try {
                // Compare the provided password with the hashed password in the database
                const match = await bcrypt.compare(passwd, row.password);
                if (match) {
                    // Generate a JWT token with the user's email
                    const token = jwt.sign({ email: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.status(200).json({ message: 'Login bem-sucedido!', token });
                } else {
                    return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
                }
            } catch (err) {
                return res.status(500).json({ error: 'Erro ao verificar senha.' });
            }
        } else {
            return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
        }
    });
};
