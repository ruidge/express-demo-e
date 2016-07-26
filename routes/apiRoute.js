var express = require('express');

var mock = require('../api/mock')

var router = express.Router();

//mock
router.post('/addmock', mock.addMock);
router.get('/getmocks', mock.getMocks);
router.get('/getmock/:path', mock.getMockByPath);

module.exports = router;
