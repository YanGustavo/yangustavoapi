const express = require('express');
const User = require('../../models/portifolio_api/User');
const router = express.Router();
const { compare, hash } = require('bcryptjs');

// Post Method - Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const checkUser = await User.findOne({ username });

        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "Username is not present! Please try again",
            });
        }

        const checkPassword = await compare(password, checkUser.password);

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Wrong password. Please try again",
            });
        }

        res.json({
            success: true,
            message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
