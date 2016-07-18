/**
 */

var showdown = require('showdown');
var fs = require("fs");
var entity = require("../entity");

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
        res.render('index/blog', blogEntity);
    });

    readerStream.on('error', function (err) {
        console.log(err.stack);
    });
}
