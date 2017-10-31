/**
 * Created by ruidge on 2016/2/2.
 */

var path = require('path');
var fs = require("fs");

module.exports.indexRoot = function (req, res, next) {
    res.render('index/index', {title: 'ruidge'});
}


module.exports.indexBlog = function (req, res, next) {
    res.redirect('/mds');
}

module.exports.indexMock = function (req, res, next) {
    res.render('index/mock', {title: 'mock'});
}

module.exports.indexAbout = function (req, res, next) {
    res.render('index/about', {title: 'about'});
}

//√‚∑—https÷§ È
//http://www.chinaz.com/web/2016/0216/504896.shtml
//https://www.namecheap.com/support/knowledgebase/article.aspx/795/69/how-to-install-ssl-certificates
module.exports.well7a = function (req, res, next) {
    //res.sendFile(path.resolve('public/.well-know/acme-challenge/7a3mUahQIQYPEWSVoT5qbxJ-wCUFBSi8Vl1_sLVRuRY'));

    var data = '';
    //var fileName = 'public/.well-know/acme-challenge/7a3mUahQIQYPEWSVoT5qbxJ-wCUFBSi8Vl1_sLVRuRY';
    var fileName = 'public/.well-know/acme-challenge/uFjEwBp88__CQ8os0iX_p2JYJJCEdEsOa4zN8xYz7tU';
    var readerStream = fs.createReadStream(fileName);
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function (chunk) {
        data += chunk;
    });
    readerStream.on('end', function () {
        console.log(data);
        res.send(data);
    });
}

module.exports.wellr = function (req, res, next) {
    //res.sendFile(path.resolve('public/.well-know/acme-challenge/r-uVtWj2La4EhYb1VueT_xc-yawyKQH7x3IDPRvU3J8'));
    var data = '';
    //var fileName = 'public/.well-know/acme-challenge/r-uVtWj2La4EhYb1VueT_xc-yawyKQH7x3IDPRvU3J8';
    var fileName = 'public/.well-know/acme-challenge/EXsjXAcJxLqDfCIX4hdlAyZPvslHt3jGNUGRLM2EnEc';
    var readerStream = fs.createReadStream(fileName);
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function (chunk) {
        data += chunk;
    });
    readerStream.on('end', function () {
        console.log(data);
        res.send(data);
    });
}