/**
 * Created by ruidge on 2016/5/31.
 */

var models = require('../models');
var entity = require('../entity');
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
            result.successMsg = 'success';
            result.result = doc;
        }
        console.log(JSON.stringify(result));
        res.send(result);

    });
}
