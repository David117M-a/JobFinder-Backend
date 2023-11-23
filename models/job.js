const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    contractType: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;