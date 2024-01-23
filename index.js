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

const portifolioAPI = require('./routes/portifolio_api');

app.use('/portifolioAPI', portifolioAPI)

app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})