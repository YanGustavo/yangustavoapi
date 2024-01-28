const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Rota para adicionar usuário
router.post('/add', async (req, res) => {
    try {
        const { username, email, password, profile, access } = req.body;
        const hashedPassword = hashPassword(password);

        const defaultAccess = [
            {
                page: 'landing-page',
                privilege: ['read']
            }
        ];

        const user = new User({
            username,
            email,
            password: hashedPassword,
            isOnline: true,
            profile: profile || {},
            access: access || defaultAccess
        });

        await user.save();

        res.status(201).json({ success: true, message: "Usuário adicionado com sucesso." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.post('/gettosession', async (req, res) => {
    try {
        const { email } = req.body;

        // Verifique se o e-mail está presente
        if (!email) {
            return res.status(400).json({ success: false, message: "E-mail não fornecido." });
        }

        // Encontre o usuário pelo e-mail
        const user = await User.findOne({ email });

        // Verifique se o usuário existe
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado." });
        }

        // Crie um objeto de usuário sem incluir a senha
        const userWithoutPassword = {
            _id: user._id,
            username: user.username,
            email: user.email,
            isOnline: user.isOnline,
            profile: user.profile,
            access: user.access
        };

        // Envie os dados do usuário sem a senha
        res.status(200).json({ success: true, user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Rota para atualizar usuário
router.patch('/update/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { username, password, profile, access } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado." });
        }

        if (username) {
            existingUser.username = username;
        }

        if (password) {
            const hashedPassword = hashPassword(password);
            existingUser.password = hashedPassword;
        }

        existingUser.isOnline = true;

        if (profile) {
            existingUser.profile = {
                ...existingUser.profile,
                ...profile
            };
        }

        if (access) {
            existingUser.access = access;
        }

        await existingUser.save();

        res.json({ success: true, message: "Usuário atualizado com sucesso." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Rota para adicionar permissões de páginas
router.post('/add-permissions', async (req, res) => {
    try {
        const { userId, page, privileges } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }

        const defaultPrivileges = ['read'];

        user.access.push({
            page: page || 'landing-page',
            privilege: privileges || defaultPrivileges
        });

        await user.save();

        res.status(200).json({ success: true, message: "Permissões de páginas adicionadas com sucesso." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
