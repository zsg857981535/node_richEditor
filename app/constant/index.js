/**
 * Created by DaGuo on 2017/3/22.
 */
var cfg = require('../../config')

export const HOST = process.env.NODE_ENV == 'production' ? `${cfg.BACKEND_HOST_PROD}:${cfg.BACKEND_PORT_PROD}/api` : `http://localhost:${cfg.BACKEND_PORT_DEV}/api`


export const ARTICLE = {
    articles: '/articles',
    article: '/article',
    uploadImg: '/uploadImg',
    articlesGroup: '/articles/group'
};

export const CATEGORY = {
    categories: '/categories',
    category: '/category'
};

export const USER = {
    authorize: '/getToken',
    user: '/user',
    autoAuth: '/auth'
};