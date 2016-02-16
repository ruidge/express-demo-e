/**
 * Created by ruidge on 2016/1/31.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BlogSchema = new Schema({
    title: String,
    content: String,
    author: String,
    from: String,
    visible: Number,//0:invisible, 1:visible
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

// var ObjectId = mongoose.Schema.Types.ObjectId
BlogSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }

    next()
})

BlogSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = BlogSchema