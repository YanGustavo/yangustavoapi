require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const helmet = require('helmet');
const auth = require('./routes/app_routes/auth/index');
const services = require('./routes/services/index');
const user = require('./routes/user');
const logerro = require('./routes/LogErro');
const portifolio = require('./routes/app_routes/portifolio/index');

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/auth', auth);
app.use('/user', user);
app.use('/logerro', logerro);
app.use('/services', services);
app.use('/portifolio', portifolio);

// Limpeza periódica de logs (a cada dia, às 3 da manhã, por exemplo)
cron.schedule('0 3 * * *', async () => {
    const umMesAtras = new Date();
    umMesAtras.setMonth(umMesAtras.getMonth() - 1);
  
    await LogErro.deleteMany({ hora: { $lt: umMesAtras } });
    console.log('Limpeza periódica de logs concluída.');
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
