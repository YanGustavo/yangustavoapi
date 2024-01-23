const mongoose = require('mongoose');

let User;

try {
    User = mongoose.model('User');
} catch (e) {
    User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    isAdmin: Boolean
    }, { timestamps: true }));
}

module.exports = User;

/*

const mongoose = require('mongoose');

let User;

try {
    User = mongoose.model('User');
} catch (e) {
    User = mongoose.model('User', new mongoose.Schema({
        email: String,
        password: String,
        isAdmin: Boolean,
        permissions: [{ type: String }], // Adicionando o campo de permissões
    }, { timestamps: true }));
}

module.exports = User;

*/