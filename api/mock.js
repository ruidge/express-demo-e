/**
 * Created by ruidge on 2016/5/31.
 */

var models = require('../models/index');
var entity = require('../entity/index');
var Mock = models.Mock;

//router.post('/addmock', mock.addMock);
module.exports.addMock = function (req, res, next) {
    var body = JSON.stringify(req.body);
    var headers = JSON.stringify(req.headers);
    var method = req.method;
    var url = req.url;
    //console.log(req.body);
    //console.log(req.headers);

    Mock.findByPath()

    var mockEntity = new Mock();
    mockEntity.path = req.body.path;
    mockEntity.result = req.body.result;
    mockEntity.save(function (err, doc) {
        if (err) {
            var result = new entity.Result();
            if (err.code == 11000) {
                result.code = entity.constants.CODE_PATH_ALREADY_EXISTS;
                result.errorMsg = entity.constants.MSG_PATH_ALREADY_EXISTS;
            }
        } else {
            var result = new entity.Result();
            result.code = 0;
            result.result = doc;
        }
        //console.log(JSON.stringify(result));
        res.send(result);

    });
}

//router.get('/getmocks', mock.getMocks);
module.exports.getMocks = function (req, res, next) {
    Mock.find({}, function (err, mocks) {
        if (!err) {
            //console.log(mocks);
            var result = new entity.Result();
            result.code = 0;
            var arr = [];
            for (var i = 0; i < mocks.length; i++) {
                var a = {};
                a.result = mocks[i].result;
                a.path = mocks[i].path;
                arr.push(a);
            }
            result.result = arr;
            res.send(result);
        }
    });
}

//router.get('/getmock/:path', mock.getMockByPath);
module.exports.getMockByPath = function (req, res, next) {
    var path = req.params.path;
    Mock.findOne({"path": path}, function (err, mock) {
        if (!err) {
            //console.log(mocks);
            var result = new entity.Result();
            if (mock) {
                result.code = 0;
                var a = {};
                a.result = mock.result;
                a.path = mock.path;
                result.result = a;
            } else {
                result.code = entity.constants.CODE_PATH_NOT_FOUND;
                result.errorMsg = entity.constants.MSG_PATH_NOT_FOUND;
            }
            res.send(result);
        } else {
            res.send(err);
        }
    });
}
//router.get('/mock/:path', mock.mockDataByPath);
module.exports.mockDataByPath = function (req, res, next) {
    var path = req.params.path;
    Mock.findOne({"path": path}, function (err, mock) {
        if (!err) {
            //console.log(mocks);
            var result = new entity.Result();
            if (mock) {
                result.code = 0;
                var a = {};
                a.result = mock.result;
                a.path = mock.path;
                result.result = a;
                res.send(result.result);
            } else {
                result.code = entity.constants.CODE_PATH_NOT_FOUND;
                result.errorMsg = entity.constants.MSG_PATH_NOT_FOUND;
                res.send(result);
            }
        } else {
            res.send(err);
        }
    });
}
