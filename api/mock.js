/**
 * Created by ruidge on 2016/5/31.
 */

var models = require('../models/index');
var entity = require('../entity/index');
var WXBizDataCrypt = require('../utils/wechat/WXBizDataCrypt')
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


module.exports.wechatTest = function (req, res, next) {
    var appId = 'wx4f4bc4dec97d474b'
    var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
    var encryptedData =
        'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
        'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
        '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
        '3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
        'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
        'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
        '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
        'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
        '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
        '8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
        'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
        '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
        '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
        'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
        'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
        '20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
        'Db/XcxxmK01EpqOyuxINew=='
    var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

    var pc = new WXBizDataCrypt(appId, sessionKey)

    var data = pc.decryptData(encryptedData , iv)

    console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
}
