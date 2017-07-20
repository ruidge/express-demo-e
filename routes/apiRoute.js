var express = require('express');

var mock = require('../api/mock')
var wechat = require('../api/wechat')

var router = express.Router();

//mock
router.post('/addmock', mock.addMock);
router.get('/getmocks', mock.getMocks);
//router.get('/getmock/:path', mock.getMockByPath);
router.get('/mock/:path', mock.mockDataByPath);
router.get('/wechatTest', wechat.wechatTest);

module.exports = router;
