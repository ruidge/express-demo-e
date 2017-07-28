/**
 */

var showdown = require('showdown');
var fs = require("fs");
var entity = require("../entity");

module.exports.indexMd = function (req, res, next) {
    var name = req.params.name;
    var data = '';
    var converter = new showdown.Converter();
    var blogEntity = new entity.BlogEntity();

    var fileName = 'public/md/' + name;
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
        res.render('md/blog', blogEntity);
    });

    readerStream.on('error', function (err) {
        console.log(err.stack);
    });

}

module.exports.indexList = function (req, res, next) {
    var data = [];
    var path = 'public/md';
    var apiPath = "mdn"

    fs.readdir(path, function (err, files) {
        //err 为错误 , files 文件名列表包含文件夹与文件
        if (err) {
            console.log('error:\n' + err);
            return;
        }
        files.forEach(function (file) {
            var filePath = apiPath + '/' + file;
            data.push(filePath);
            //fs.stat(path + '/' + file, function (err, stat) {
            //    if (err) {
            //        console.log(err);
            //        return;
            //    }
            //    if (!stat.isDirectory()) {
            //        //console.log(filePath);
            //        data.push(filePath);
            //    }
            //});

        });
        console.log(data);
        var list = {};
        list.title = "文章列表";
        list.list = data;
        res.render('md/md-list', list);
    });

}

