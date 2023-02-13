const mongoose = require('mongoose')
const Expense = new mongoose.Schema({
    user:{
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
    installments: {
        amount: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        }
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    card: {
        type: mongoose.Types.ObjectId,
        ref: 'Card',
        default: null
    }
});

module.exports = mongoose.model('Expense', Expense)
