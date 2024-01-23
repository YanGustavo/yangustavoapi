require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors())
app.use(express.json());

const login = require('./routes/login');
const portifolioAPI = require('./routes/portifolio_api');

app.use('/login', login );
app.use('/portifolioAPI', portifolioAPI);

const PORT = process.env.PORT || 4000; // Use a variável de ambiente PORT ou padrão para 4000

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});