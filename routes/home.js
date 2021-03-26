var express = require('express');
var router = express.Router();

/* o get da home */
router.get('/', function (req, res, next) {
  res.render('home');
});



module.exports = router;