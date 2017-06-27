/**
 * Created by DaGuo on 2017/3/22.
 */

export const HOST = process.env.NODE_ENV == 'production' ? 'http://119.29.199.51:3000/api' : 'http://localhost:3000/api'


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