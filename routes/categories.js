/**
 * Created by DaGuo on 2017/3/13.
 */

//#routes/categories
//categories restful api

/*
        API 设计

        URL                         method           description

        /categories                  GET             GET all categories
        /categories/:category_id     GET             GET an article by id
        /categories                  POST            CREATE  an category
        /categories/:category_id     PUT             UPDATE an category
        /categories/:category_id     DELETE          DELETE an category


        页面路由设计

        Route                           view            description

        /admin/categories               categories      Show all categories
        /admin/categories/:category_id  category_edit   Update a category
        /admin/category/add             category_add    Create a category
 */

var express = require('express');
var router = express.Router();

var Category = require('../models/category');
var Model = Category.Model;



// CREATE a category api
router.post('/api/categories',function(req,res,next){
    var category = new Model();
    var name = req.body.cat_name;
    category.cat_name = name;
    Category.create(category,function(err){
        if(err){
            next(err);
        }
        res.json({message:'category created'})
    })
});

// GET all categories api
router.get('/api/categories',function(req,res,next){
    Category.findAll(function(err,categories){
        if(err){
            next(err);
        }
        res.json({categories:categories});
    })
});

//UPDATE a category
router.put('/api/categories/:category_id',function(req,res,next){
    var name = req.body.name;
    var id = req.params.category_id;
    Category.updateById(id,name,function(err){
        if(err){
            next(err);
        }
        res.json({message:'category updated'});
    })
});

//DELETE a category
router.delete('/api/categories/:category_id',function(req,res,next){
    var id = req.params.category_id;
    Category.removeById(id,function(err){
        if(err){
            next(err);
        }
        res.json({message:'delete success'})
    })
});
module.exports = router;








