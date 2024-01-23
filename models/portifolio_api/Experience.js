const mongoose = require('mongoose');

let Experience;

try {
    Experience = mongoose.model('Experience');
} catch (e) {
    Experience = mongoose.model('Experience', new mongoose.Schema({
        position: String,
        company: String,
        duration: String,
        location: String,
        jobprofile: String
    }, { timestamps: true }));
}

module.exports = Experience;
