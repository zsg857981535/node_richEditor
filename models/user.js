/**
 * Created by DaGuo on 2017/4/17.
 */

//# user model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_createTime:{type:Date,default:Date.now()},//创建日期
    username:String,
    password:String
});

var User = mongoose.model('User',UserSchema);

module.exports = {

    Model:User,
    //Read all Users
    findAll:function(callback){
        return User.find().exec(callback)
    },
    //Read by user_id
    findById:function(id,callback){
        return User.findOne({_id:id}).exec(callback);
    },
    findByName:function(name,callback){
        return User.findOne({username:name},callback)
    },
    //Create an user
    create:function (user,callback) {
        return user.save(user,callback)
    },
    removeById:function(id,callback){
        return User.remove({_id:id},callback)
    },
    updateByInstance:function(user,callback){
        //没有什么好办法?需要一个个field更新
        return User.update({_id:user._id},
            {$set:{username:user.username,password:user.password}},callback);
    }
};