/**
 * Created by DaGuo on 2017/3/22.
 */
import update from 'react-addons-update';
import {makeActionCreator, createReducer} from './create_helper';
import request from '../request';
import {ARTICLE} from '../constant'

const DEV = process.env.NODE_ENV == 'development';

const CONTROL_READ_ARTICLES = 'CONTROL_READ_ARTICLES'
const READ_ARTICLES = 'READ_ARTICLES';
const CREATE_ARTICLE = 'CREATE_ARTICLE';
const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';
const GET_CURRENT = 'GET_CURRENT_PAGE'
const READ_ARTICLES_GROUP = 'READ_ARTICLES_GROUP'//分组统计类别下的文章

const controlAsync = makeActionCreator(CONTROL_READ_ARTICLES,'loading');
const readArticles = makeActionCreator(READ_ARTICLES, 'pageNumber','list','pageCount','count');
const createArticle = makeActionCreator(CREATE_ARTICLE);
const updateArticle = makeActionCreator(UPDATE_ARTICLE);
const deleteArticle = makeActionCreator(DELETE_ARTICLE);
const getCurrent = makeActionCreator(GET_CURRENT,'currentPage','currentData')
const readArticlesGroup = makeActionCreator(READ_ARTICLES_GROUP,'groupData')

/**
 *
 * @param page  第几页
 * @param pageSize 每页显示几条
 * @param cat_id 类别id
 * @param forced 强制刷新
 * @returns {function(*, *)}
 */
export function handleReadArticles(page=1,pageSize=10,cat_id='',forced=false) {
    return (dispatch, getState) => {
        const listOfPage = getState().article_state;

        // listOfPage[page] is empty, so should read
        if ( !listOfPage[page] || forced) {
            dispatch(controlAsync(true));//async begin
            return request({
                url: ARTICLE.articles,
                method: 'GET',
                params:{page,pageSize,cat_id}
            })
                .then(res => res.json())
                .then(json=>{

                    /*
                     {
                         articles:$page.results,//当前页的记录
                         pageCount:$page.pageCount,//多少页
                         pageNumber:$page.pageNumber,//当前第几页(从1开始)
                         count:$page.count,//总的记录数,
                     }

                     */
                    const { articles,count,pageCount,pageNumber} = json;
                    DEV && console.log('read Articles:',json);
                    json && dispatch(readArticles(pageNumber,articles,pageCount,count));
                    dispatch(controlAsync(false)); //async end
                })
                .catch(e=>{
                    DEV && console.error('read Articles:',e.message);
                })
        }
    }
}
export function handleReadGroup(){
    return (dispatch)=>{
        return request({
            url:ARTICLE.articlesGroup,
            method: 'GET'
        })
            .then(res=>res.json())
            .then(json=>{
                const { data } = json
                DEV && console.log('read articles group',json);
                dispatch(readArticlesGroup(data))
            })
            .catch(e=>{
                DEV && console.error('read articles group',e.message)
            })
    }
}

/**
 *
 * @param params ARTICLE Object
 * @returns {function(*)}
 */
export function handleCreateArticle(params){
    return (dispatch)=>{

        if(Object.keys(params).length){
            return request({
                url:ARTICLE.article,
                method:'POST',
                params
            })
                .then(res=>res.json())
                .then(json=>{
                    dispatch(createArticle())
                    DEV && console.log('create article:',json.message);
                })
                .catch(e=>{
                    DEV && console.error('create article:',e.message);
                })
        }
     }
}

export function handleUpdateArticle(article_id,params={}){
     return (dispatch)=>{
        if(Object.keys(params).length){

            return request({
                url:`${ARTICLE.article}/${article_id}`,
                method:'PUT',
                params
            })
                .then(res=>res.json())
                .then(json=>{
                    dispatch(updateArticle())
                    DEV && console.log('update article:',json.message);
                })
                .catch(e=>{

                    DEV && console.error('update article:',e.message);
                })
        }
     }
}

export function handleDeleteArticle(article_id){
    return (dispatch)=>{
        if(article_id != 'undefined'){
            return request({
                url:`${ARTICLE.article}/${article_id}`,
                method:'DELETE',
            })
                .then(res=>res.json())
                .then(json=>{
                    dispatch(deleteArticle())
                    DEV && console.log('delete article:',json.message);
                })
                .catch(e=>{
                    DEV && console.error('delete article:',e.message);
                })
        }
    }
}
/*当page 改变时获取当前页数据*/
export function getCurrentPage(currentPage=1){
    return (dispatch,getState)=>{
        let { listOfPage } = getState().article_state;
        let currentData = listOfPage && listOfPage[currentPage] || [];
        dispatch(getCurrent(currentPage,currentData))
    }
}

//get single article
export function getArticle(id) {
    return request({
        method:'GET',
        url: `${ARTICLE.article}/${id}`
    })
}



//reducer
const initialState = {
    loading:false,
    listOfPage:{},
    currentPage:1,
    currentData:[],
    groupData:[] //按类别分组
    /*
       listOfPage:{
            pageNumber:list,//当页记录数
            pageCount:pageCount,//总页数
            count:count,//总的记录数,
            currentPage:pageNumber//当前页
       }
     */
};
export const article_state = createReducer(initialState,{
    [CONTROL_READ_ARTICLES]: (state, action) => {
        let loading = action.loading;
        return {
            ...state,
            loading
        }
    },
    [READ_ARTICLES]: (state, action) => {
        let {pageNumber, list, pageCount, count} = action,
            {listOfPage} = state,
            newData = update(listOfPage, {
                $merge: {
                    [pageNumber]: list,
                    pageCount,
                    count,
                    currentPage: pageNumber || 1
                }
            });

        return {
            ...state,
            listOfPage: newData
        }
    },
    [READ_ARTICLES_GROUP]:(state,action)=>{
        let { groupData } = action
        return {
            ...state,
            groupData
        }
    },
    [GET_CURRENT]:(state,action)=>{
        let { currentPage,currentData } = action

        return {
            ...state,
            currentPage,
            currentData
        }
    },
    [CREATE_ARTICLE]: (state) => {
        return {
            ...state
        }
    },
    [UPDATE_ARTICLE]: (state) => {
        return {
            ...state
        }
    },
    [DELETE_ARTICLE]: (state) => {
        return {
            ...state
        }
    }
});








