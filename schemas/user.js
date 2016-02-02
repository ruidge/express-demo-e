/**
 * Created by ruidge on 2016/2/2.
 */
var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: {
        unique: true, type: String
    },
    email: String,
    password: String,

    meta: {
        createAt: {
            type: Date, default: Date.now()
        },
        updateAt: {
            type: Date, default: Date.now()
        }
    }
})

//UserSchema.pre('save',function(next){
//
//})
module.exports = UserSchema