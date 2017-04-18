/**
 * Created by DaGuo on 2017/4/18.
 */

var jwt = require('jsonwebtoken')

//对于/auth 开头的api需要token鉴权
function verifyToken(req, res, next) {

    // console.log('route path', req.path.indexOf('/auth'));
    if (req.path.indexOf('/auth') !== -1) {
        var token = req.headers['authorization'] || req.body.token || req.query.token
        // console.log('header',req.headers);
        // console.log('token',token);
        if (token) {
            jwt.verify(token, 'superSecret', function (err, decoded) {
                if (err) {
                    res.send({
                        status: false,
                        message: 'Authorization failure'
                    });
                    return
                } else {
                    req.decoded = decoded
                    next();
                }
            })
        } else {
            // if there is no token,return an error
            res.status(403).send({
                status: false,
                message: 'No token provided'
            });
            return;
        }
    } else {
        next()
    }
}

module.exports = {
    verifyToken
}