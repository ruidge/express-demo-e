var express = require('express');

var test = require('../controllers/test')
var index = require('../controllers/index')
var markdown = require('../controllers/markdown')

var router = express.Router();

//index
router.get('/', index.indexRoot);

router.get('/blog', index.indexBlog);

router.get('/mock', index.indexMock);

router.get('/about', index.indexAbout);

//test
router.get('/test', test.test);

router.get('/testjjk', test.testjjk);

router.get('/helloreact', test.helloreact);

router.get('/test/:id', test.testId);

router.get('/mongoose', test.testMongoose);

//router.get('/mysql', test.testMysql);

//md
router.get('/md', markdown.indexMd);

router.get('/.well-known/acme-challenge/r-uVtWj2La4EhYb1VueT_xc-yawyKQH7x3IDPRvU3J8', index.wellr);
router.get('/.well-known/acme-challenge/7a3mUahQIQYPEWSVoT5qbxJ-wCUFBSi8Vl1_sLVRuRY', index.well7a);

module.exports = router;
