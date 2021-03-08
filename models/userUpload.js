const mongoose = require('mongoose');
require('../connect.js')

const userUploadSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    skill: {
        type: [String],
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        required: true
    }
});

const userUpload = mongoose.model('useruploads', userUploadSchema);

module.exports = userUpload;