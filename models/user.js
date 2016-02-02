/**
 * Created by ruidge on 2016/2/2.
 */
var mongoose = require('mongoose')
var UserSchema = require('../schemas/user')
mongoose.model('User', UserSchema)