var express = require('express');

var test = require('../controllers/test')
var index = require('../controllers/index')

var router = express.Router();

router.get('/', index.indexRoot);

router.get('/blog', index.indexBlog);

router.get('/about', index.indexAbout);

router.get('/test', test.test);

router.get('/test/:id', test.testId);

router.get('/mongoose', test.testMongoose);

router.get('/mysql', test.testMysql);

module.exports = router;
