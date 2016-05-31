/**
 * Created by ruidge on 2016/5/31.
 */
var mongoose = require('mongoose')

var MockSchema = new mongoose.Schema({
    path: {
        unique: true, type: String
    },
    result: String,

    meta: {
        createAt: {
            type: Date, default: Date.now()
        },
        updateAt: {
            type: Date, default: Date.now()
        }
    }
})

MockSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }

    next()
})

module.exports = MockSchema