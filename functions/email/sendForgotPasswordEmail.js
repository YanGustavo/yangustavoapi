const transporter = require('./emailConfig'); // Importa a configuração do email

function sendForgotPasswordEmail(userEmail, resetToken) {
  const mailOptions = {
    from: 'Eai Chefinho',
    to: userEmail,
    subject: 'Recuperação de Senha',
    text: `Você solicitou a recuperação de senha. Clique no link a seguir para redefinir sua senha: http://admin.eaichefinho.com.br/reset-password?token=${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
    } else {
      console.log('E-mail enviado com sucesso:', info.response);
    }
  });
}

module.exports = { sendForgotPasswordEmail };
