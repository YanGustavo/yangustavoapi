const express = require('express');

const User = require('../models/portifolio_api/User');
const router = express.Router();
const { compare, hash } = require('bcryptjs');

// Post Method - Login
router.post('/', async (req, res) => {
    try {
        
        const { email, password } = req.body;
        console.log("Received login request:", { email, password }); // Adicione este log para verificar os dados de login
        if (!email || !password) {
            return res.status(400).json({
              success: false,
              message: "Informe tanto o email quanto a senha.",
            });
          }
          console.log("Before user query");
          const checkUser = await User.findOne({ email: "yangustavop@gmail.com" });

          console.log("After user query. Result:", checkUser);
          



console.log("Check user result:", checkUser);

if (!checkUser) {
    console.log(`User not found: ${email}`);
    return res.status(400).json({
        success: false,
        message: "Usuário não encontrado! Tente novamente.",
    });
}

        const checkPassword = await compare(password, checkUser.password);

        if (!checkPassword) {
            console.log(`Senha inválida para o usuario de email: ${email}`);
            return res.status(400).json({
                success: false,
                message: "Senha incorreta. Tente novamente",
            });
        }

        console.log(`Login successful for user: ${email}`);

        res.json({
            success: true,
            message: "Login successful",
        });
    } catch (error) {
        console.error(`Error during login: ${error.message}`);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

module.exports = router;
