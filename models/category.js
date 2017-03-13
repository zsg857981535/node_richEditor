/**
 * Created by DaGuo on 2017/3/13.
 */
/*
 文章类别实体 Category
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    //_id default created
    cat_createTime:{type:Date,default:Date.now()},//创建日期
    cat_name:String,
});

var Category = mongoose.model('Category',CategorySchema);


module.exports = {
    Model:Category,

    findAll:function(callback){
        Category.find({}).exec(callback);
    },
    create:function(category,callback){
        category.save(category,callback);
    },
    removeById:function(id,callback){
        Category.remove({_id:id},callback);
    },
    updateById:function(id,name,callback){
        Category.update({_id:id},{$set:{cat_name:name}},callback);
    }
};