// Alguma rota ou controlador
const express = require('express');
const router = express.Router();
const LogErro = require('../models/LogErro');

router.post('/add', async (req, res) => {
    try {
        const { errorMessage, stackTrace, additionalInfo } = req.body;
    
        // Aqui você pode fazer o que quiser com as informações do erro.
        // Por exemplo, você pode enviar um e-mail para o administrador, salvar em um banco de dados, etc.
    
        console.error('Erro recebido do cliente:');
        console.error('Mensagem:', errorMessage);
        console.error('StackTrace:', stackTrace);
        console.error('Informações adicionais:', additionalInfo);
    
        res.status(200).json({ success: true, message: 'Erro registrado com sucesso.' });
      } catch (error) {
        console.error('Erro ao processar a requisição de logError:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
      }
});
// Alguma rota ou controlador
router.get('/logs-group', async (req, res) => {
    try {
      const logsAgrupados = await LogErro.aggregate([
        {
          $group: {
            _id: {
              hora: { $hour: '$hora' },
              local: '$local',
            },
            quantidade: { $sum: 1 },
            mensagens: { $push: '$mensagem' },
          },
        },
      ]);
  
      res.json(logsAgrupados);
    } catch (error) {
      console.error('Erro ao obter logs agrupados:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
module.exports = router;
