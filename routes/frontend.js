/**
 * Created by DaGuo on 2017/4/18.
 */



var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Model = Article.Model;

//Redirect articles
router.get('/',function(req,res,next){
    // res.redirect('/
    res.render('index',{title:'Blog | Home'});
});

//Get all articles access http://localhost:3000
router.get('/articles',function(req,res,next){

    //  Article.findAll(function (err,articles) {
    //     if(err){
    //         next(err);
    //     }
    //     console.log('articles',articles);
    //     res.render('articles',{articles:articles,title:'文章列表'});
    // });
    //分页查询
    console.log('page server===',req.query.page);
    var page = req.query.page || 1,
        pageSize = 2,
        populate = '',
        queryParams = {},
        sortParams = {art_createTime:'desc'};
     pageQuery(page,pageSize,Model,populate,queryParams,sortParams,function(err,$page){
         if(err){
             next(err)
         }
         console.log('$page====',$page);
         res.render('articles',{
             articles:$page.results,//当前页的记录
             pageCount:$page.pageCount,//多少页
             pageNumber:$page.pageNumber,//当前第几页(从1开始)
             count:$page.count,//总的记录数,
             title:'文章列表'
         })
     })
});

//Get single article access http://localhost:3000/articles/:article_id
router.get('/article/:article_id',function(req,res,next){
    var id = req.params.article_id;
    if(id == 'undefined'){
        res.send('article not found');
    }
    Article.findById(id,function(err,article){
        if(err){
            next(err);
        }
        console.log('article',article);
        res.render('article',{article:article,title:article.art_title})
    })
});

//Create an article access http://localhost:3000/article/add
router.get('/admin/article/add',function(req,res,next){
    res.render('article_add',{title:'添加文章'})
});

//Read all articles at admin access http://localhost:3000/admin/articles
router.get('/admin/articles',function(req,res,next){

    // Article.findAll(function (err,articles) {
    //     if(err){
    //         next(err);
    //     }
    //     console.log('articles',articles);
    //     res.render('admin_articles',{articles:articles,title:'文章管理'});
    // });

    //分页查询
    console.log('page server===',req.query.page);
    var page = req.query.page || 1,
        pageSize = 2,
        populate = '',
        queryParams = {},
        sortParams = {art_createTime:'desc'};
    pageQuery(page,pageSize,Model,populate,queryParams,sortParams,function(err,$page){
        if(err){
            next(err)
        }
        console.log('$page====',$page);
        res.render('admin_articles',{
            articles:$page.results,//当前页的记录
            pageCount:$page.pageCount,//多少页
            pageNumber:$page.pageNumber,//当前第几页(从1开始)
            count:$page.count,//总的记录数,
            title:'文章管理'
        })
    })
});

//Edit single article access http://localhost:3000/admin/articles/:article_id

router.get('/admin/articles/:article_id',function(req,res,next){

    var id = req.params.article_id;
    if(id == 'undefined'){
        res.send('article not found');
    }
    Article.findById(id,function(err,article){
        if(err){
            next(err);
        }
        console.log('article',article);
        res.render('article_edit',{article:article,title:article.art_title})
    });
});


module.exports = router