/**
 * Created by DaGuo on 2017/4/17.
 */

//# users.js 用户鉴权相关


/*
 URI                 Method              desc
 /api/users            GET                 get all users (Admin can use it)
 /api/user/:user_id    GET                 get a user'info
 /api/user:user_id     PUT                 update a user's info
 /api/user:user_id     DELETE              delete a user (Admin can use it)
 /api/user             POST                create a single user
 */


var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Model = User.Model
var jwt = require('jsonwebtoken')
var multer = require('multer') // parse formData


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/uploads/');
    },
    filename:function(req,file,cb){
        crypto.pseudoRandomBytes(16,function(err,raw){
            if(err) return cb(err);

            cb(null,raw.toString('hex') + path.extname(file.originalname))
        });
    }
});

var upload = multer({ storage:storage })





//authenticate
router.post('/auth',upload.array(),function(req,res,next){
    res.send({status:true,message:'Authorization successful'})
})

router.post('/getToken', upload.array(),function (req, res, next) {

    var username = req.body.username || '',
        password = req.body.password || '';
    // console.log("req.body,username,password",req.body,username,password);
    if (!username) {
        res.send({status:false,message: 'Username is required'})
        return;
    }
    if (!password) {
        res.send({status:false,message: 'Password is required'})
        return;
    }

    User.findByName(username, function (err, user) {
        if (err) {
            res.send({status:false,message: 'User not found'})
            next(err)
        }

        if (!user) {
            res.send({
                status:false,
                message: 'User not found'
            })
        } else if (user) {
            if (user.password !== password) {
                res.send({status:false,message: 'Wrong password'})
            } else {
                var token = jwt.sign({user_id:user._id},'superSecret',{
                    expiresIn: '1 days' //expires in 24 hours
                });

                // return the information including token
                res.send({
                    message:'Authenticate successfully',
                    status: true,
                    token: token
                })
            }
        }
    })
});


//POST a user access to host/api/user
router.post('/user', upload.array(),function (req, res, next) {

    var username = req.body.username,
        password = req.body.password;
    // console.log('username,password',username,password)
    if(!username || !password){
        res.send({
            status:false,
            message:'Username and password is required'
        });
        return;
    }
    var user = new Model();
    user.username = username;
    user.password = password;
    User.create(user, function (err) {
        if (err) {
            res.send({status:false,message: 'User created failure'})
            next(err)
        }
        res.send({ status:true,message: 'User created successfully'})
    })
});



// PUT a user
router.put('/auth/user/:user_id',upload.array(), function (req, res, next) {

    var id = req.params.user_id,
        username = req.body.username,
        password = req.body.password,
        decoded = req.decoded
    // console.log('username,password,token decoded',username,password,decoded);

    User.findById(id, function (err, user) {
        // console.log('result',user)
        if (err) {
            res.send({ status:false,message: 'User not found'})
            next(err)
        }

        if (username) {
            user.username = username
        }
        if (password) {
            user.password = password
        }

        User.updateByInstance(user, function (err) {
            if (err) {
                res.send({ status:false,message: 'User update failure'})
                next(err)
            }
            res.send({ status:false,message: 'User update successfully'})
        })
    })
});


module.exports = router
