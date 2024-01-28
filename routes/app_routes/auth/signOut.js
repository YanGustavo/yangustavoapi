const express = require('express');
const User = require('../../../models/User');
const authenticateToken = require('../../../middlewares/authMiddleware');
const router = express.Router();

router.post('/get', authenticateToken, async (req, res) => {
    try {
        const { email } = req.body;

        // Certifique-se de que o campo email está presente na requisição
        if (!email) {
            return res.status(400).json({ success: false, message: 'O campo email é obrigatório. Status: 400' });
        }

        // Atualiza o status online/offline para false
        const user = await User.findOneAndUpdate(
            { email },
            { $set: { isOnline: false } },
            { new: true } // Retorna o documento atualizado
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado. Status: 404' });
        }

        res.status(200).json({ success: true, message: 'Logout bem-sucedido. Status: 200' });
    } catch (error) {
        console.error('Erro durante o logout:', error);
        res.status(500).json({ success: false, message: 'Erro durante o logout. Status: 500' });
    }
});

module.exports = router;
