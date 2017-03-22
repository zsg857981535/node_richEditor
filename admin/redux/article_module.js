/**
 * Created by DaGuo on 2017/3/22.
 */
import {makeActionCreator, createReducer} from './create_helper';
import request from '../request';
import {ARTICLE} from '../constant'


const READ_ARTICLES = 'READ_ARTICLES';


const readArticles = makeActionCreator(READ_ARTICLES, 'list');

function controlAsync(state) {
    return {
        type: READ_ARTICLES,
        loading: state
    }
}


export function handleReadArticles() {
    return (dispatch, getState) => {
        const list = getState().article_state;

        //list.length = 0, so should read
        if (!list.length) {
            dispatch(controlAsync(true));//async begin
            return request({
                url: ARTICLE.read,
                method: 'GET'
            })
                .then(res => res.json())
                .then(json=>{
                    console.log('read Articles',json)
                    dispatch(controlAsync(false)); //async end
                })
                .catch(e=>{
                    console.log('read Articles',e.message);
                })
        }
    }
}

//reducer
const initialState = {
    list:[] //articles
};
export const article_state = createReducer(initialState,{
    [READ_ARTICLES]:(state,action)=>{
        let list = action.list;
        return {
            list
        }
    }
});






