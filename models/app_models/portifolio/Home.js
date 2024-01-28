const mongoose = require('mongoose');

let Home;

try {
    Home = mongoose.model('Home');
} catch (e) {
    Home = mongoose.model('Home', new mongoose.Schema({
        heading: String,
        summary: String
    }, { timestamps: true }));
}

module.exports = Home;
