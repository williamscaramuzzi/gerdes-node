var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* o get inicial */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
   
    res.render('home');
  });


module.exports = router;