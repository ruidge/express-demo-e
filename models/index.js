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


//可以直接require一个目录，假设有一个目录名为folder，如
//var myMod = require('./folder')
//此时，Node将搜索整个folder目录，Node会假设folder为一个包并试图找到包定义文件package.json。
//如果folder目录里没有包含package.json文件，Node会假设默认主文件为index.js，即会加载index.js。如果index.js也不存在，那么加载将失败。