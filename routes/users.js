var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ruidge', function(req, res, next) {
  res.send('ruidge path');
});

module.exports = router;
