/**
 * Created by ruidge on 2016/2/2.
 */
var modelIndex = require('../models/index');
var mysql = require('mysql');
var async = require('async');

var mongoose = require('mongoose')

module.exports.test = function (req, res, next) {
//    console.log('/test');
//    next();
//}, function (req, res) {
    res.render('test', {title: 'test:'});
}

module.exports.testjjk = function (req, res, next) {
//    console.log('/test');
//    next();
//}, function (req, res) {
    res.render('testjjk', {title: 'test:'});
}

module.exports.testId = function (req, res, next) {
    var id = req.params.id;
    res.render('test', {title: 'test:' + id});
}

module.exports.testMongoose = function (req, res, next) {

    var TestSchema = new mongoose.Schema({
            name: {type: String},
            age: {type: Number, default: 0},
            email: {type: String},
            time: {type: Date, default: Date.now}
        },
        {
            collection: 'userlist'//表名
        });
    /*var Aaa =*/
    mongoose.model('Aaa', TestSchema/*,"bbb"*/);//Aaa转成小写后加s作为表名,(最后一位是数字不增加s),第三个参数是表名

    var Aa = mongoose.model('Aaa')

    var aaa = new Aa({
        name: 'aaa',
        age: 12,
        emial: 'aaa@qq.com'
    });
    aaa.save(function (err, doc) {
        if (err) {
            res.send("error :" + err);
        } else {
            res.render('test', {title: doc});
        }
        //db.close();
    });

    //var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
    //var TestModel = db.model("test1a", TestSchema/*,"bbb"*/);
    //var TestEntity = new TestModel({
    //    name: 'helloworld',
    //    age: 28,
    //    emial: 'helloworld@qq.com'
    //});
    //TestEntity.save(function (err, doc) {
    //    if (err) {
    //        res.send("error :" + err);
    //    } else {
    //        res.render('test', {title: doc});
    //    }
    //    db.close();
    //});
}

module.exports.testMysql = function (req, res, next) {
    var result = "";
    var conn = mysql.createConnection({
        host: '45.78.33.4',
        user: 'root',
        password: 'Ruiz880714',
        database: 'db_ruidge',
        port: 3306
    });
    conn.connect();
    //conn.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    //    if (err) throw err;
    //    result = rows[0].solution;
    //    console.log('The solution is: ', result);
    //    res.render('mysql', {title: 'Mysql'});
    //});
    //conn.end();
    var sqls = {
        'insertSQL': 'insert into t_user(name) values("conan"),("fens.me")',
        'selectSQL': 'select * from t_user limit 10',
        'deleteSQL': 'delete from t_user',
        'updateSQL': 'update t_user set name="conan update"  where name="conan"'
    };
    var tasks = ['deleteSQL', 'insertSQL', 'selectSQL', 'updateSQL', 'selectSQL'];
    async.eachSeries(tasks, function (item, callback) {
        console.log(item + " ==> " + sqls[item]);
        conn.query(sqls[item], function (err, res) {
            console.log(res);
            callback(err, res);
        });
    }, function (err) {
        console.log("err: " + err);
    });
    res.render('mysql', {title: 'see log'});
}