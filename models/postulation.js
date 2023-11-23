const mongoose = require('mongoose');

const PostulationSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Postulation = mongoose.model('Postulation', PostulationSchema);

module.exports = Postulation;