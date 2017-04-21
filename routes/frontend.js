/**
 * Created by DaGuo on 2017/4/18.
 */



var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
    res.render('index',{title:'Blog | Home'});
    // res.render('facebook',{title:'facebook test'});
});

module.exports = router