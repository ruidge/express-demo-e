var mongoose = require('mongoose')

var WxSessionSchema = new mongoose.Schema({
    session_id: {
        unique: true, type: String
    },
    session_key: {type: String},
    openid: {type: String},
    unionid: {type: String},
    createAt: {
        type: Date, default: Date.now()
    },
    updateAt: {
        type: Date, default: Date.now()
    }
})

WxSessionSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now()
    }
    else {
        this.updateAt = Date.now()
    }
    next()
})

mongoose.model('WxSession', WxSessionSchema)