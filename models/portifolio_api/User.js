const mongoose = require('mongoose');

let User;

try {
    User = mongoose.model('User');
} catch (e) {
    User = mongoose.model('User', new mongoose.Schema({
        username: String,
        password: String
    }, { timestamps: true }));
}

module.exports = User;
