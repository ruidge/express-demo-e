/**
 * Created by ruidge on 2016/2/2.
 */


var showdown = require('showdown');
var fs = require("fs");
var entity = require("../entity");

module.exports.indexRoot = function (req, res, next) {
    //res.render('index/index', {title: 'ruidge'});
    res.render('index', {title: 'ruidge'});
}


module.exports.indexBlog = function (req, res, next) {
    //res.render('index/blog', {title: 'blog'});
    res.redirect('/md');
}

module.exports.indexMock = function (req, res, next) {
    res.render('index/mock', {title: 'mock'});
}

module.exports.indexAbout = function (req, res, next) {
    res.render('about', {title: 'about'});
}


module.exports.indexMd = function (req, res, next) {
    var data = '';
    var converter = new showdown.Converter();
    var blogEntity = new entity.BlogEntity();

    var fileName = 'public/md/node_intro.md';
    var readerStream = fs.createReadStream(fileName);
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function (chunk) {
        data += chunk;
    });
    readerStream.on('end', function () {
        console.log(data);
        var html = converter.makeHtml(data);
        blogEntity.content = html;
        //res.send(html);
        res.render('blog', {title: 'blog',sdata:html});
    });

    readerStream.on('error', function (err) {
        console.log(err.stack);
    });
}
