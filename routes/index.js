// var express = require('express');
// var crypto = require('crypto');
// var path = require('path');
// var router = express.Router();
// var multer = require('multer');
//
//
// //rename the uploaded file
// var storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'public/uploads/');
//     },
//     filename:function(req,file,cb){
//         crypto.pseudoRandomBytes(16,function(err,raw){
//             if(err) return cb(err);
//
//             cb(null,raw.toString('hex') + path.extname(file.originalname))
//         });
//     }
// })
//
// var upload = multer({ storage:storage })
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.post('/upload',upload.array(),function(req,res,next){
//   console.log('req.body',req.body);
//   res.send('upload success!');
// })
//
// router.post('/uploadImg',upload.array('wangEditorH5File'),function(req,res,next){
//   console.log('req.files',req.files);
//   res.send('/uploads/' + req.files[0].filename)
// });
//
// module.exports = router;


module.exports = function(app){
    app.use('/',require('./articles'));
}
