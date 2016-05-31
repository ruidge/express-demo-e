/**
 * Created by ruidge on 2016/5/31.
 */

var mongoose = require('../common/mongoose');
require('../models/mock');
var MockModel = mongoose.model('Mock')

module.exports.addMock = function (req, res, next) {

    var body = req.body.toString();
    var headers = req.headers;
    var method = req.method;
    var url = req.url;

    var str = body + "\n" + headers + "\n" + method + "\n" + url;

    console.log(str);

    res.render('testraw', {title: str});

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
