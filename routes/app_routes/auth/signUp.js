const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const router = express.Router();

const bcrypt = require('bcryptjs');

router.post('/get', async (req, res) => {
    console.log(req.body);

    try {
        const { email, password, rememberMe } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado! Tente novamente.",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Senha incorreta. Tente novamente.",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        if (rememberMe) {
            res.cookie('token', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            });
        }
        // Update isOnline status to true
        user.isOnline = true;
        const userEmail = user.email;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Login bem-sucedido",
            token,
            userEmail
        });
    } catch (error) {
        console.error(`Erro durante o login: ${error.message}`);
        res.status(500).json({ success: false, message: "Erro interno do servidor" });
    }
});


module.exports = router;
