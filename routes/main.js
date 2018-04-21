const express = require('express');
const router = express.Router();
let fs = require('fs');
let voters_json = './config/voters.json';
let Storage = require('dom-storage');
var localStorage = new Storage('./db.json', { strict: false, ws: '  ' });

//saves voter
router.post('/voter/save', function(req,res){
    fs.readFile(voters_json, (err,data) => {
        var json = JSON.parse(data);
        json.push({
            "firstName":req.body.firstname,
            "lastName":req.body.lastname,
            "email":req.body.email
        });
        fs.writeFile(voters_json, JSON.stringify(json));
        if(!err){
            res.send({success:true, message:"Save success"})
            localStorage.setItem('email', req.body.email);
        }
        else
            res.send({success:false, message: "Save failed"});
    });
});

router.get('/vote/save', function(req,res){
    res.render('vote');
});

router.get('/table', function(req,res){
    res.render('table');
});

module.exports = router;