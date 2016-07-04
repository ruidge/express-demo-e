/**
 */

var showdown = require('showdown');
var fs = require("fs");

module.exports.indexMd = function (req, res, next) {
    var data = '';
    var converter = new showdown.Converter();

    var fileName = 'public/md/node_intro.md';
    var readerStream = fs.createReadStream(fileName);
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function (chunk) {
        data += chunk;
    });
    readerStream.on('end', function () {
        console.log(data);
        var html = converter.makeHtml(data);
        res.send(html);
    });

    readerStream.on('error', function (err) {
        console.log(err.stack);
    });
}
