/**
 * Created by DaGuo on 2017/3/8.
 */

/*
 //文章实体(Article)
    {
         _id: '自动添加(ObjectId)',
         art_title: '文章标题',
         art_content: '文章内容',
         art_createTime:'文章创建或修改时间(默认当前时间)',
         art_category: {type:Schema.Types.ObjectId,ref:'Category'},//文章类别,对应文章实体的_id
    }
 //文章类别(Category)
    {
        _id:'自动添加(ObjectId)',
        cat_name:String  //类别名称
    }


 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    art_createTime:{type:Date,default:Date.now()},//创建日期
    art_content:String,
    art_title:String,
    art_img:String,//题图url
    cat_id: {type: Schema.Types.ObjectId,ref:'Category',default:null} //文章类别id
    // cat_id: String
});

var Article = mongoose.model('Article',ArticleSchema);

var Category = require('./category').Model

module.exports = {

    Model:Article,
    //Read all articles
    findAll:function(callback){
        return Article.find().exec(callback)
    },
    //Read by article_id
    findById:function(id,callback){
        return Article.findOne({_id:id}).exec(callback);
    },
    //Create an article
    create:function (article,callback) {
        return article.save(article,callback)
    },
    removeById:function(id,callback){
        return Article.remove({_id:id},callback)
    },
    updateByInstance:function(article,callback){
        //没有什么好办法?需要一个个field更新
        return Article.update({_id:article._id},
            {$set:{
                art_content:article.art_content,
                art_title:article.art_title,
                art_img:article.art_img,
                cat_id:article.cat_id
        }},callback);
    },
    //通过cat_id 分组统计每个cat_id下面的文章数量
    groupByCategory: function(callback){
        return Article.aggregate(
            [
                // {$match:{cat_id:mongoose.Types.ObjectId(id)}}

                {$group:{_id:'$cat_id',count:{$sum:1}}}
            ],
            function(err,result){
                if(err){
                    return callback(err,null)
                }
                Category.populate(result,{path:'_id'},callback)
            }
        )
    }
};