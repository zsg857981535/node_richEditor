/**
 * Created by DaGuo on 2017/3/8.
 */

// #routes/articles.js

// articles restful api

/*
 API设计
 URL                         method      description

 /api/articles               GET         Read all articles
 /api/articles              POST        Create an article
 /api/articles/:article_id   GET         Read an single article
 /api/articles/:article_id   PUT         Update an single article
 /api/articles/:article_id   DELETE      Delete an single article

 页面跳转设计
 Route                          view
 / 或者 /articles                articles  文章列表
 /articles/:article_id          article   文章详情
 /admin/articles                admin_articles 后台显示文章列表,显示编辑,删除,新增按钮
 /admin/articles/:article_id    article_edit  编辑单篇文章,保存之后返回/admin
 /admin/article/add             article_add  新增文章,保存后返回/admin

 component设计

 article_preview 前端展示文章概览
 article_preview_admin   后台展示文章概览
 */

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var path = require('path');
var multer = require('multer');
var Article = require('../models/article');
var Model = Article.Model;
var queryHelper = require('../models/query_helper');
var pageQuery = queryHelper.pageQuery;
var mongoose = require('mongoose');

//rename the uploaded file
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        });
    }
});

var upload = multer({storage: storage})

// router.get('/articles',function(req,res){
//     var article = new Article();
//
// });
//
// //Redirect articles
// router.get('/',function(req,res,next){
//     // res.redirect('/
//     res.render('index',{title:'Blog | Home'});
//     // res.render('facebook',{title:'facebook test'});
// });
//
// //Get all articles access http://localhost:3000
// router.get('/articles',function(req,res,next){
//
//     //  Article.findAll(function (err,articles) {
//     //     if(err){
//     //         next(err);
//     //     }
//     //     console.log('articles',articles);
//     //     res.render('articles',{articles:articles,title:'文章列表'});
//     // });
//     //分页查询
//     console.log('page server===',req.query.page);
//     var page = req.query.page || 1,
//         pageSize = 2,
//         populate = '',
//         queryParams = {},
//         sortParams = {art_createTime:'desc'};
//      pageQuery(page,pageSize,Model,populate,queryParams,sortParams,function(err,$page){
//          if(err){
//              next(err)
//          }
//          console.log('$page====',$page);
//          res.render('articles',{
//              articles:$page.results,//当前页的记录
//              pageCount:$page.pageCount,//多少页
//              pageNumber:$page.pageNumber,//当前第几页(从1开始)
//              count:$page.count,//总的记录数,
//              title:'文章列表'
//          })
//      })
// });
//
// //Get single article access http://localhost:3000/articles/:article_id
// router.get('/article/:article_id',function(req,res,next){
//     var id = req.params.article_id;
//     if(id == 'undefined'){
//         res.send('article not found');
//     }
//     Article.findById(id,function(err,article){
//         if(err){
//             next(err);
//         }
//         console.log('article',article);
//         res.render('article',{article:article,title:article.art_title})
//     })
// });
//
// //Create an article access http://localhost:3000/article/add
// router.get('/admin/article/add',function(req,res,next){
//     res.render('article_add',{title:'添加文章'})
// });
//
// //Read all articles at admin access http://localhost:3000/admin/articles
// router.get('/admin/articles',function(req,res,next){
//
//     // Article.findAll(function (err,articles) {
//     //     if(err){
//     //         next(err);
//     //     }
//     //     console.log('articles',articles);
//     //     res.render('admin_articles',{articles:articles,title:'文章管理'});
//     // });
//
//     //分页查询
//     console.log('page server===',req.query.page);
//     var page = req.query.page || 1,
//         pageSize = 2,
//         populate = '',
//         queryParams = {},
//         sortParams = {art_createTime:'desc'};
//     pageQuery(page,pageSize,Model,populate,queryParams,sortParams,function(err,$page){
//         if(err){
//             next(err)
//         }
//         console.log('$page====',$page);
//         res.render('admin_articles',{
//             articles:$page.results,//当前页的记录
//             pageCount:$page.pageCount,//多少页
//             pageNumber:$page.pageNumber,//当前第几页(从1开始)
//             count:$page.count,//总的记录数,
//             title:'文章管理'
//         })
//     })
// });
//
// //Edit single article access http://localhost:3000/admin/articles/:article_id
//
// router.get('/admin/articles/:article_id',function(req,res,next){
//
//     var id = req.params.article_id;
//     if(id == 'undefined'){
//         res.send('article not found');
//     }
//     Article.findById(id,function(err,article){
//         if(err){
//             next(err);
//         }
//         console.log('article',article);
//         res.render('article_edit',{article:article,title:article.art_title})
//     });
// });
//

//GET all article with pagination api

router.get('/articles', function (req, res, next) {
    //分页查询
    var page = req.query.page && parseInt(req.query.page) || 1,
        pageSize = req.query.pageSize && parseInt(req.query.pageSize) || 2,//这里queryString 传过来的是字符串,要转换为number
        populate = 'cat_id',//join 查询
        cat_id = req.query.cat_id,//
        queryParams = cat_id ? {cat_id:mongoose.Types.ObjectId(cat_id)} : {},
        sortParams = {art_createTime: 'desc'};

    console.log('cat_id',req.query.cat_id);
    pageQuery(page, pageSize, Model, populate, queryParams, sortParams, function (err, $page) {
        if (err) {
            next(err)
        }
        // console.log('$page====',$page);
        res.json({
            articles: $page.results,//当前页的记录
            pageCount: $page.pageCount,//多少页
            pageNumber: $page.pageNumber,//当前第几页(从1开始)
            count: $page.count,//总的记录数,
        })
    })
});

//GET articles group by cat_id
router.get('/articles/group',function(req,res,next){
    Article.groupByCategory(function(err,result){
        // if(err){
        //     next(err)
        // }
        console.log('group by',result);
        res.send(result)
    })
});

//GET an article detail api

router.get('/article/:article_id', function (req, res, next) {
    var id = req.params.article_id;
    if (id == 'undefined') {
        res.send('article not found');
    }
    Article.findById(id, function (err, article) {
        if (err) {
            next(err);
        }
        console.log('article', article);
        res.json({article: article})
    })
});




//POST an article api
router.post('/article', upload.array(), function (req, res, next) {

    var title = req.body.art_title,
        content = req.body.art_content,
        cat_id = req.body.cat_id

    console.log('art_content,art_title', content, title,cat_id);

    if (!title || !content) {
        res.send({
            status: false,
            message: 'Title and content is required'
        })
        return
    }

    var article = new Model();
    article.art_content = content;
    article.art_title = title;
    article.cat_id = cat_id ? mongoose.Types.ObjectId(cat_id) : '';

    //todo check content
    Article.create(article, function (err) {
        //todo friendly handle error
        if (err) {
            res.send({status: false, message: 'Create failure'});
            next(err);
        }
        res.send({status: true, message: 'Article created'})
        //return res.redirect('/admin/articles')
    });
});

//DELETE an article api

router.delete('/article/:article_id', function (req, res, next) {
    //todo check id
    var id = req.params.article_id;
    console.log('delete id', id)
    Article.removeById(id, function (err) {
        if (err) {
            res.send({status: false, message: 'Delete failure'})
            next(err);
        }
        res.send({status: true, message: 'Delete success'})
    })
});

//PUT an article api

router.put('/article/:article_id', upload.array(), function (req, res, next) {
    //todo check id

    // console.log('req.body.art_content,title',req.body.art_content,req.body.art_title)
    // var id = req.params.article_id,
    //     content = req.body.art_content,
    //     article = new Model();
    //     article.art_content = content;
    //     article._id = id;
    //     article.art_title = req.body.art_title;

    var id = req.params.article_id,
        content = req.body.art_content,
        title = req.body.art_title;
    console.log('req.body.art_content,title', content, title)
    Article.findById(id, function (err, article) {
        if (err) {
            next(err)
        }
        if (!article) {
            res.send({
                status: false,
                message: 'Article not found'
            })
            return
        } else {
            if (title) {
                article.art_title = title
            }
            if (content) {
                article.art_content = content
            }
        }
        Article.updateByInstance(article, function (err) {
            if (err) {
                res.send({status: false, message: 'Updated failure'});
                next(err);
            }
            res.send({status: true, message: 'Updated successfully'});
        })
    })
});

//POST upload img api

router.post('/uploadImg', upload.array('wangEditorH5File'), function (req, res, next) {

    console.log('req.files', req.files);
    res.send('http://localhost:3000/uploads/' + req.files[0].filename)
});

module.exports = router;


