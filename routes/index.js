var express = require('express');
var mysql = require('mysql');
var async = require('async');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'ruidge'});
});

router.get('/blog', function (req, res, next) {
    res.render('blog', {title: 'blog'});
});

router.get('/about', function (req, res, next) {
    res.render('about', {title: 'about'});
});

router.get('/test', function (req, res, next) {
    console.log('/test');
    next();
}, function (req, res) {
    res.render('test', {title: 'test:'});
});

router.get('/test/:id', function (req, res, next) {
    var id = req.params.id;
    res.render('test', {title: 'test:' + id});
});

router.get('/mongoose', function (req, res, next) {
    var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
    var TestSchema = new mongoose.Schema({
        name: {type: String},
        age: {type: Number, default: 0},
        email: {type: String},
        time: {type: Date, default: Date.now}
    });
    var TestModel = db.model("test1", TestSchema); //'test'相当于collection
    var TestEntity = new TestModel({
        name: 'helloworld',
        age: 28,
        emial: 'helloworld@qq.com'
    });
    TestEntity.save(function (err, doc) {
        if (err) {
            res.send("error :" + err);
        } else {
            res.render('test', {title: doc});
        }
        db.close();
    });
});

/* test mysql */
router.get('/mysql', function (req, res, next) {
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
});

router.get('/test/:id', function (req, res, next) {
    var id = req.params.id;
    res.render('test', {title: 'test:' + id});
});

module.exports = router;
