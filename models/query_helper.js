/**
 * Created by DaGuo on 2017/3/10.
 */
var async = require('async');


//分页查询

/**
 *
 * @param page 第几页
 * @param pageSize  每页显示条数
 * @param Model     查询的文档
 * @param populate  join 的文档
 * @param queryParams   查询的参数
 * @param sortParams    排序规则
 * @param callback  回调函数
 */
var pageQuery = function(page,pageSize,Model,populate,queryParams,sortParams,callback){

    var start = (page - 1) * pageSize; //开始查询的位置

    //将所有需要的结果放在一个对象
    var $page = {
        pageNumber: page
    };
    //合并几个任务一起执行
    async.parallel({
        //总的记录数
        count:function(done){
            Model.find().count(queryParams).exec(function(err,count){
                console.log( "Number of users:", count );
                done(err,count);
            })
        },

        //查询一页的记录
        records:function(done){
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate)
                .sort(sortParams).exec(function(err,doc){
                    done(err,doc);
            })
        }
    },function (err,results) {
        var count = results.count;
        $page.pageCount = (count - 1) /pageSize + 1;//总共多少页
        $page.results = results.records; //当前查询页的记录
        $page.count = results.count ; //总共多少条记录
        callback(err,$page);//执行回调函数
    });
};

module.exports = {

    pageQuery:pageQuery
};
