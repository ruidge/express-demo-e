/**
 * Created by ruidge on 2016/6/3.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.log('connect to ' + config.db + ' error: ' + err.message);
        process.exit(1);
    }
});

// models
require('./user');
require('./blog');
require('./mock');

exports.User = mongoose.model('User');
exports.Blog = mongoose.model('Blog');
exports.Mock = mongoose.model('Mock');