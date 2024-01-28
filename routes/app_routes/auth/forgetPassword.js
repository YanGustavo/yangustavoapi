const express = require('express');
const User = require('../../../models/User');
const router = express.Router();
const authenticateToken = require('../../../middlewares/authMiddleware');
const { sendForgotPasswordEmail } = require('../../../functions/email/sendForgotPasswordEmail'); // Importa a função de envio de e-mail
const { isEmailValid } = require('../../../functions/email/isEmailValid'); // Importa a função de envio de e-mail

// Post Method
router.post('/get', authenticateToken, async (req, res) => {
    const { email } = req.body;
    // Verifica se o e-mail é válido
    if (!isEmailValid(email)) {
        return res.status(404).json({
            success: false,
            message: "E-mail inválido.",
        });
    }
    // Gere um token de redefinição de senha (você pode usar uma biblioteca como 'crypto' para gerar um token único)
  const resetToken = 'token_unico_gerado'; // Substitua com a lógica real de geração de token
//Verifica se o usuario é cadastrado no sistema
const user = await User.findOne({ email }).exec();
if (!user) {
    return res.status(404).json({
        success: false,
        message: "Usuário não encontrado! Tente novamente.",
    });
}
  // Envie um e-mail com o token de redefinição de senha
  try{
    sendForgotPasswordEmail(email, resetToken);
  }catch{
    return res.status(404).json({
        success: false,
        message: "Ops...Ocorreu um erro ao enviar o email com a definição de senha.",
    });
  }
 
console.log(resetToken);
  // Pode ser útil retornar uma mensagem de sucesso para o cliente
  res.json({ success: true, message: 'Um e-mail com instruções para redefinir a senha foi enviado.' });
});


module.exports = router;
