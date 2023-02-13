const mongoose = require('mongoose')
const Wallet = new mongoose.Schema({
    value: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Wallet', Wallet)
