var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: {
        unique: true, type: String
    },
    email: {type: String},
    password: {type: String},

    createAt: {
        type: Date, default: Date.now()
    },
    updateAt: {
        type: Date, default: Date.now()
    }
})

mongoose.model('User', UserSchema)