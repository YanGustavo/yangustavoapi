const mongoose = require('mongoose');

let About;

try {
    About = mongoose.model('About');
} catch (e) {
    About = mongoose.model('About', new mongoose.Schema({
        aboutme: {
            required: true,
            type: String
        },
        noofprojects: {
            type: String
        },
        yearofexperience: String,
        noofclients: String,
        skills: String
    }, { timestamps: true }));
}

module.exports = About;
