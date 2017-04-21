/**
 * Created by DaGuo on 2017/3/13.
 */

//#routes/categories
//categories restful api

/*
        API 设计

        URL                         method           description

        /categories                  GET             GET all categories
        /category/:category_id       GET             GET an article by id
        /categories                  POST            CREATE  an category
        /category/:category_id       PUT             UPDATE an category
        /category/:category_id       DELETE          DELETE an category
*/

var express = require('express');
var router = express.Router();

var Category = require('../models/category');
var Model = Category.Model;

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


// CREATE a category api
//todo add /auth prefix to verify authority
router.post('/category',upload.array(),function(req,res,next){
    var category = new Model();
    var name = req.body.cat_name;
    category.cat_name = name;
    Category.create(category,function(err){
        if(err){
            next(err);
        }
        res.json({status:true,message:'category created'})
    })
});

// GET all categories api
router.get('/categories',function(req,res,next){
    Category.findAll(function(err,categories){
        if(err){
            next(err);
        }
        res.json({categories:categories});
    })
});

//UPDATE a category
//todo add /auth prefix to verify authority
router.put('/category/:category_id',upload.array(),function(req,res,next){
    var name = req.body.cat_name;
    var id = req.params.category_id;
    Category.updateById(id,name,function(err){
        if(err){
            next(err);
        }
        res.json({status:true,message:'category updated'});
    })
});

//DELETE a category
//删除一个类别,会导致该类别下的所有文章找不到归宿
//todo add /auth prefix to verify authority
router.delete('/category/:category_id',function(req,res,next){
    var id = req.params.category_id;
    Category.removeById(id,function(err){
        if(err){
            next(err);
        }
        res.json({status:true,message:'delete success'})
    })
});
module.exports = router;








