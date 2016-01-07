var express = require('express');
var mysql = require('mysql');
var async = require('async');

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

module.exports = router;
