const express = require('express');
const router = express.Router();
// Adicione rotas para cada seção
router.use('/about', require('./about'));
router.use('/contact', require('./contact'));
router.use('/education', require('./education'));
router.use('/experience', require('./experience'));
router.use('/home', require('./home'));
router.use('/project', require('./project'));

module.exports = router;
