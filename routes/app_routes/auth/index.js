const express = require('express');
const router = express.Router();
// Adicione rotas para cada seção
router.use('/forgetpassword', require('./forgetPassword'));
router.use('/signin', require('./signIn'));
router.use('/signout', require('./signOut'));
router.use('/signup', require('./signUp'));

module.exports = router;
