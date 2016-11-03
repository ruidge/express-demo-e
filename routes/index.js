var express = require('express');

var test = require('../controllers/test')
var index = require('../controllers/index')

var router = express.Router();

//index
router.get('/', index.indexRoot);

router.get('/blog', index.indexBlog);

router.get('/mock', index.indexMock);

router.get('/about', index.indexAbout);

//test
router.get('/test', test.test);

router.get('/testjjk', test.testjjk);

router.get('/test/:id', test.testId);

router.get('/mongoose', test.testMongoose);

//router.get('/mysql', test.testMysql);

//md
router.get('/md', index.indexMd);

module.exports = router;
