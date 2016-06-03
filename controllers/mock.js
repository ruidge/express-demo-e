/**
 * Created by ruidge on 2016/5/31.
 */

var modelIndex = require('../models/index');
var Mock = modelIndex.Mock;

//router.post('/addmock', mock.addMock);
module.exports.addMock = function (req, res, next) {

    var body = JSON.stringify(req.body);
    var headers = JSON.stringify(req.headers);
    var method = req.method;
    var url = req.url;

    var str = body + "\n" + headers + "\n" + method + "\n" + url;

    //console.log(body);
    //console.log(str);
    console.log(req.body);
    console.log(req.headers);

    Mock.findByPath()

    //res.render('testraw', {title: str});
    //res.end();
    res.send(body);
    //var mockModel = new MockModel(body);
    ////
    //mockModel.save(function (err, doc) {
    //    if (err) {
    //        res.send("error :" + err);
    //    } else {
    //        res.render('test', {title: body});
    //    }
    //});

}
