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

const controlAsync = makeActionCreator(CONTROL_READ_ARTICLES,'loading');
const readArticles = makeActionCreator(READ_ARTICLES, 'pageNumber','articles','pageCount','count');
const createArticle = makeActionCreator(CREATE_ARTICLE);
const updateArticle = makeActionCreator(UPDATE_ARTICLE);
const deleteArticle = makeActionCreator(DELETE_ARTICLE);

/**
 *
 * @param page  第几页
 * @param pageSize 每页显示几条
 * @returns {function(*, *)}
 */
export function handleReadArticles(page=1,pageSize=3) {
    return (dispatch, getState) => {
        const listOfPage = getState().article_state;

        // listOfPage[page] is empty, so should read
        if ( !listOfPage[page]) {
            dispatch(controlAsync(true));//async begin
            return request({
                url: ARTICLE,
                method: 'GET',
                params:{page,pageSize}
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
                    DEV && console.log('read Articles:',e.message);
                })
        }
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
                url:ARTICLE,
                method:'POST',
                params
            })
                .then(res=>res.json())
                .then(json=>{
                    dispatch(createArticle())
                    DEV && console.log('create article:',json.message);
                })
                .catch(e=>{
                    DEV && console.log('create article:',e.message);
                })
        }
     }
}

export function handleUpdateArticle(article_id,params={}){
     return (dispatch)=>{
        if(Object.keys(params).length){

            return request({
                url:`${ARTICLE}/${article_id}`,
                method:'PUT',
                params
            })
                .then(res=>res.json())
                .then(json=>{
                    dispatch(updateArticle())
                    DEV && console.log('update article:',json.message);
                })
                .catch(e=>{

                    DEV && console.log('update article:',e.message);
                })
        }
     }
}

export function handleDeleteArticle(article_id){
    return (dispatch)=>{
        if(Object.keys(params).length){

            return request({
                url:`${ARTICLE}/${article_id}`,
                method:'DELETE',
                params
            })
                .then(res=>res.json())
                .then(json=>{
                    dispatch(deleteArticle())
                    DEV && console.log('delete article:',json.message);
                })
                .catch(e=>{

                    DEV && console.log('delete article:',e.message);
                })
        }
    }
}

//reducer
const initialState = {
    loading:false,
    listOfPage:{}
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
    [CONTROL_READ_ARTICLES]:(state,action)=>{
        let loading = action.loading;
        return {
            ...state,
            loading
        }
    },
    [READ_ARTICLES]:(state,action)=>{
        let {pageNumber,articles, pageCount,count} = action,
            { listOfPage } = state,
            newData = update(listOfPage,{$merge:{[pageNumber]:articles,pageCount,count,currentPage:pageNumber || 1}});

        return {
            ...state,
            listOfPage:newData
        }
    },
    [CREATE_ARTICLE]:(state)=>{
        return {
            ...state
        }
    },
    [UPDATE_ARTICLE]:(state)=>{
        return{
            ...state
        }
    },
    [DELETE_ARTICLE]:(state)=>{
        return {
            ...state
        }
    }
});





