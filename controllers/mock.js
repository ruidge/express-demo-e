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

    var mockEntity = new Mock();
    mockEntity.path = req.body.path;
    mockEntity.result = req.body.result;
    mockEntity.save(function (err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(doc) + "  save success");
        }

    });
}
