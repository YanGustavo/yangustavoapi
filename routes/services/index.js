const express = require('express');
const router = express.Router();
// Adicione rotas para cada seção
router.use('/cloudinay', require('./cloudinary'));

module.exports = router;
