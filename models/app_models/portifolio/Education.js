const mongoose = require('mongoose');

let Education;

try {
    Education = mongoose.model('Education');
} catch (e) {
    Education = mongoose.model('Education', new mongoose.Schema({
        degree: String,
        year: String,
        college: String
    }, { timestamps: true }));
}

module.exports = Education;
