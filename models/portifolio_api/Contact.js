const mongoose = require('mongoose');

let Contact;

try {
    Contact = mongoose.model('Contacts');
} catch (e) {
    Contact = mongoose.model('Contacts', new mongoose.Schema({
        name: String,
        email: String,
        message: String
    }, { timestamps: true }));
}

module.exports = Contact;
