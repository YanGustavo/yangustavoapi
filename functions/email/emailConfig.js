//emailConfig
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465, // ou 587 para TLS
  secure: true, // true para SSL, false para TLS
  auth: {
    user: 'atendimento@eaichefinho.com.br',
    pass: 'Che$1nho',
  },
});

module.exports = transporter;
