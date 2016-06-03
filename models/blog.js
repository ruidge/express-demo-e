var mongoose = require('mongoose')

var BlogSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    author: {type: String},
    from: {type: String},
    visible: {type: Number},//0:invisible, 1:visible
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
})

// var ObjectId = mongoose.Schema.Types.ObjectId
BlogSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now()
    }
    else {
        this.updateAt = Date.now()
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

mongoose.model('Blog', BlogSchema);