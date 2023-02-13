const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    cpf: {
        type: Number,
        unique: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    wallet: {
        type: mongoose.Types.ObjectId,
        ref: 'Wallet',
    }
});

User.pre('save', async function(next){
    return bcrypt.genSalt(10)
    .then((salt)=> bcrypt.hash(this.password,salt)
    .then((hash)=> {
        this.password = hash
        next()
    })
    ).catch(next)
})

User.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password,this.password);
    return result
}

module.exports = mongoose.model('User', User)
