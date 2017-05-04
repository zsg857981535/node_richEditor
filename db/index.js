/**
 * Created by DaGuo on 2017/3/7.
 */
// var pg = require('pg');//postgres
var mongoose = require('mongoose');
// var config = {
//     user:'boyiwin!',
//     password:'boyiwin1!',
//     database:'boyidb',
//     host:'192.168.2.70',
//     port:5432,
//     max:10,
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// };

// var pool = new pg.Pool(config);
var mongodbStr = 'mongodb://127.0.0.1:27017/test'

var connectDB = function(dbType){
   if(typeof dbType !== 'string'){
       throw  new Error('db type should be string');
   }

   switch (dbType){
       case 'postgres':
           var connectionString = process.env.DATABASE_URL || 'postgres://boyiwin!:boyiwin1!@192.168.2.70:5432/test_boyi?ssl=true';

           var client = new pg.Client(connectionString);
           client.connect(function(err){
               if(err){
                   console.log('DB connection failure...');
                   throw err;
               }else{
                   console.log('DB connection success...');
               }
               // client.end(function(err){
               //     if(err) throw err;
               // })
           });

       // pool.connect(function(err, client, done) {
       //     if(err) {
       //         return console.error('error fetching client from pool', err);
       //     }
       //     // client.query('SELECT $1::int AS number', ['1'], function(err, result) {
       //     //     //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
       //     //     done(err);
       //     //
       //     //     if(err) {
       //     //         return console.error('error running query', err);
       //     //     }
       //     //     console.log(result.rows[0].number);
       //     //     //output: 1
       //     // });
       // });
       //
       // pool.on('error', function (err, client) {
       //     // if an error is encountered by a client while it sits idle in the pool
       //     // the pool itself will emit an error event with both the error and
       //     // the client which emitted the original error
       //     // this is a rare occurrence but can happen if there is a network partition
       //     // between your application and the database, the database restarts, etc.
       //     // and so you might want to handle it and at least log it out
       //     console.error('idle client error', err.message, err.stack)
       // })
           return;
       case'mongodb':
           //todo error handle
           mongoose.connect(mongodbStr);
           return;
       default:
           throw new Error('database can not be found');
   }
};

module.exports = connectDB;
