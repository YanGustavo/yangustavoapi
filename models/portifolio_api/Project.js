const mongoose = require('mongoose');

let Project;

try {
    Project = mongoose.model('Project');
} catch (e) {
    Project = mongoose.model('Project', new mongoose.Schema({
        name: String,
        website: String,
        technologies: String,
        github: String
    }, { timestamps: true }));
}

module.exports = Project;
