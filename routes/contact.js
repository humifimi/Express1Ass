var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var comments = require('../database/comments.json');

router.get('/',function(req,res,next){
    //save to file re
    console.log('get recieved');
    res.render('contact');
});

router.post('/',function(req,res,next){
    console.log('post recieved');
    req.assert('fullname','Full Name is Required').notEmpty();
    req.assert('message','Message is Required ').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('error',{message:errors});
    }
    else{
        comments.push(req.body);
    var writeFile = fs.writeFile(path.join(path.dirname(require.main.filename),'/database/comments.json'),JSON.stringify(comments)
        ,function(err){
        if(err){
            console.log(err);
            next('error');
        }
    });
        res.render('thankyou',{fullname:req.body.fullname});
    }

    
});

module.exports = router;