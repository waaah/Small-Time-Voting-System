let express = require('express');
let router = express.Router();
let Storage = require('dom-storage');

//localstorage for node
var localStorage = new Storage('./db.json', { strict: false, ws: '  ' });
let email = localStorage.getItem('email');

router.get('/', function(req,res){
    if(!email)
        res.render('index');
    else
        res.redirect('/vote');
});

router.get('/vote', function(req,res){
    if(email)
        res.render('vote');
    else
        res.redirect('/');
});

module.exports = router;