const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.render('index');
});

router.get('/vote', function(req,res){
    res.render('vote');
});

router.get('/table', function(req,res){
    res.render('table');
});

module.exports = router;