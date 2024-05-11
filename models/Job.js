const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String, required: true },
    agentName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    salary: { type: String, required: true },
    contract: { type: String, required: true },
    hiring: { type: Boolean, required: true, default: true },
    period: { type: String, required: true },
    imageUrl: { type: String, required: true, default: 'https://cdn-icons-png.flaticon.com/128/3985/3985018.png'},
    agentId: { type: String, required: true },
    requirements: {
        type: Array,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)