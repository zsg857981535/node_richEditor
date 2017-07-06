
module.exports = function(app){
    app.use(require('./common').verifyToken);//鉴权middleware
    app.use('/api',require('./users'));
    app.use('/api',require('./articles'));
    app.use('/api',require('./categories'));
    app.use('/',require('./frontend'))
}
