var mongoose = require('mongoose')

var MockSchema = new mongoose.Schema({
    path: {
        unique: true, type: String
    },
    result: {type: String},
    createAt: {
        type: Date, default: Date.now()
    },
    updateAt: {
        type: Date, default: Date.now()
    }
})

MockSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now()
    }
    else {
        this.updateAt = Date.now()
    }

    next()
})

MockSchema.statics = {
    findByPath: function (path, cb) {
        return this
            .findOne({path: path})
            .exec(cb)
    }
}

mongoose.model('Mock', MockSchema)