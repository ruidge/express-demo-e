/**
 * Created by ruidge on 2016/5/31.
 */
var mongoose = require('mongoose')
var MockSchema = require('../schemas/mock')
mongoose.model('Mock', MockSchema)