var express = require('express');
var router = express.Router();

/* GET home page. */
let x="hellllll"
router.get('/', function(req, res, next) {
  res.send(x)
});

module.exports = router;
