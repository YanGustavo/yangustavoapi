const mongoose = require('mongoose');

const logErroSchema = new mongoose.Schema({
  hora: { type: Date, default: Date.now },
  local: String,
  mensagem: String,
  // Outros campos conforme necessário
});

const LogErro = mongoose.model('LogErro', logErroSchema);

module.exports = LogErro;
