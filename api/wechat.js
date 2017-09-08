/**
 * Created by ruidge on 2016/5/31.
 */

var WXBizDataCrypt = require('../utils/wechat/WXBizDataCrypt')
var CryptoUtils = require('../utils/utils')
var request = require('request');
var models = require('../models/index');
var entity = require('../entity/index');

var WxSession = models.WxSession;

module.exports.wechatTest = function (req, res, next) {
    var appId = 'wx4f4bc4dec97d474b'
    var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
    var encryptedData =
        'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
        'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
        '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
        '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
        'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
        'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
        '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
        'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
        '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
        '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
        'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
        '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
        '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
        'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
        'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
        '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
        'Db/XcxxmK01EpqOyuxINew=='
    var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

    var pc = new WXBizDataCrypt(appId, sessionKey)

    var data = pc.decryptData(encryptedData, iv)

    console.log('decryptData is : \n', data)
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

function getAuthUrl(code) {
    var AppID = entity.constants.WX_APPID;
    var AppSecret = entity.constants.WX_APPSECRET;
    var wxAuthUrl = "https://api.weixin.qq.com/sns/jscode2session?" +
        "appid=" + AppID + "&secret=" + AppSecret + "&js_code=" + code + "&grant_type=authorization_code"
    return wxAuthUrl;
}
function getSessionId(sessionKey, openid) {
    var data = sessionKey + "-" + openid;
    var key = "ruidge";
    return CryptoUtils.aesEncrypt(data, key);
}

module.exports.login = function (req, res, next) {
    var body = JSON.parse(req.body);
    var sessionId = body.sessionId;
    var code = body.code;
    console.log("sessionId: " + sessionId + ", code: " + code);
    if (sessionId) {
        WxSession.findOne({"session_id": sessionId}, function (err, wxSession) {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            if (wxSession) {
                console.log(wxSession);
                var result = new entity.Result();
                result.code = 0;
                result.errorMsg = "sessionId from mongo";
                result.result = sessionId;
                res.send(result);
            }
        });
    } else {
        //get 请求外网
        request({
            url: getAuthUrl(code),
            method: 'GET'
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                var session = JSON.parse(body);
                if (session.errcode || session.errmsg) {
                    var result = new entity.Result();
                    result.code = session.errcode;
                    result.errorMsg = session.errmsg;
                    result.result = null;
                    res.send(result);
                    return;
                }

                var sessionKey = session.session_key;
                var openid = session.openid;

                var wxsession = new WxSession();
                wxsession.session_key = sessionKey;
                wxsession.openid = openid;
                wxsession.session_id = getSessionId(sessionKey, openid);
                console.log("sessionId : " + wxsession.sessionId);

                WxSession.findOne({"session_id": wxsession.session_id}, function (err, result) {
                    //if (err) {
                    //    console.log(err);
                    //    res.send(err);
                    //    return;
                    //}
                    if (result) {
                        console.log(result);
                        result.sessionKey = wxsession.session_key;
                        result.openid = wxsession.openid;
                        result.save(function (err, doc) {
                            if (err) {
                                console.log(err);
                                res.send(err);
                                return;
                            }
                            if (doc) {
                                var result = new entity.Result();
                                result.code = 0;
                                result.errorMsg = "update success";
                                result.result = wxsession.session_id;
                                res.send(result);
                            }
                        });
                    } else {
                        wxsession.save(function (err, doc) {
                            if (err) {
                                console.log(err);
                                res.send(err);
                                return;
                            }
                            if (doc) {
                                var result = new entity.Result();
                                result.code = 0;
                                result.errorMsg = "save success";
                                result.result = wxsession.session_id;
                                res.send(result);
                            }

                        });
                    }
                });
            }
        });

    }
}
module.exports.getSteps = function (req, res, next) {
    var body = JSON.parse(req.body);
    var data = body.data;
    var iv = body.iv;
    var sessionId = body.sessionId;
    if (sessionId) {
        WxSession.findOne({"session_id": sessionId}, function (err, wxSession) {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            if (wxSession) {
                console.log(wxSession);
                var sessionKey = wxSession.session_key;
                var AppID = entity.constants.WX_APPID;
                var pc = new WXBizDataCrypt(AppID, sessionKey)
                data = pc.decryptData(data, iv)
                console.log(data);
                var result = new entity.Result();
                result.code = 0;
                result.errorMsg = "get steps success";
                result.result = data;
                res.send(result);
            }
        });
    }

}