var express = require('express');
var router = express.Router();

/* o get inicial */
router.get('/', function (req, res, next) {
  res.render('index');
});



module.exports = router;