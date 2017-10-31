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
router.get('/mds', markdown.indexList);
router.get('/mdn/:name', markdown.indexMd);

//router.get('/.well-known/acme-challenge/r-uVtWj2La4EhYb1VueT_xc-yawyKQH7x3IDPRvU3J8', index.wellr);
//router.get('/.well-known/acme-challenge/7a3mUahQIQYPEWSVoT5qbxJ-wCUFBSi8Vl1_sLVRuRY', index.well7a);
router.get('/.well-known/acme-challenge/uFjEwBp88__CQ8os0iX_p2JYJJCEdEsOa4zN8xYz7tU', index.wellr);
router.get('/.well-known/acme-challenge/sB4DI65jEflsxm0_rqiEZp1Bdi47e3qPPRKszbzVAVI', index.well7a);

module.exports = router;
