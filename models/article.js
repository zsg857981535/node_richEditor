/**
 * Created by DaGuo on 2017/3/8.
 */
//文章实体

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    // art_name:String,//文章名
    art_createTime:{type:Date,default:Date.now()},//创建日期
    art_content:String,
    art_title:String

});

var Article = mongoose.model('Article',ArticleSchema);

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
        return Article.update({_id:article._id},{$set:{art_content:article.art_content}},callback);
    }
};