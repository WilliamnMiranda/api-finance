const mongoose = require('mongoose')
const Card = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    validateCard: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    cvv: {
        type: Number,
        required: true
    },
    company: {
        type: String,
    }
});

module.exports = mongoose.model('Card', Card)
