const express = require('express');
const router = express.Router();
let fs = require('fs');
var candidates = require('../config/data.json')
router.get('/', function(req,res){
    res.render('index');
});

router.get('/vote', function(req,res){
    res.render('vote');
});

router.get('/vote/save', function(req,res){
    res.render('vote');
});

router.get('/table', function(req,res){
    res.render('table');
});

module.exports = router;