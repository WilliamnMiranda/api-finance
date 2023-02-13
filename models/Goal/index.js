const mongoose = require('mongoose')
const Goal = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    wallet: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    type: {
        type: String,
    },
    importance: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Goal', Goal)
