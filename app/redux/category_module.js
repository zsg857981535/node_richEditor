/**
 * Created by DaGuo on 2017/4/24.
 */
import {makeActionCreator, createReducer, log, logE} from './create_helper';
import request from '../request';
import {CATEGORY} from '../constant'

const DEV = process.env.NODE_ENV == 'development';

const CONTROL_READ_CATEGORIES = 'CONTROL_READ_CATEGORIES'
const READ_CATEGORIES = 'READ_CATEGORIES';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const GET_CURRENT = 'GET_CURRENT_CATE'


const controlAsync = makeActionCreator(CONTROL_READ_CATEGORIES, 'loading');
const readCategories = makeActionCreator(READ_CATEGORIES, 'categories');
const createCategory = makeActionCreator(CREATE_CATEGORY);
const updateCategory = makeActionCreator(UPDATE_CATEGORY);
const deleteCategory = makeActionCreator(DELETE_CATEGORY);
const getCurrent = makeActionCreator(GET_CURRENT, 'currentCate') // get current category


export function handleReadCategories(isForced = false) {
    return (dispatch, getState) => {
        let {category_state : {categories}} = getState()
        if (!categories.length || isForced) {
            dispatch(controlAsync(true))
            return request({
                method: 'GET',
                url: CATEGORY.categories
            })
                .then(res => res.json())
                .then(json => {
                    let {data} = json
                    log('read categories', json);
                    dispatch(readCategories(data))
                    dispatch(controlAsync(false))
                })
                .catch(e => {
                    logE('read categories', e.message)
                })
        }
    }
}


export function handleCreateCategory(params) {
    return (dispatch) => {
        return request({
            method: 'POST',
            url: CATEGORY.category,
            params
        })
            .then(res => res.json())
            .then(json => {
                dispatch(createCategory())
                log('create category', json.message)
            })
            .catch(e => {
                logE('create category', e.message);
            })
    }
}

export function handleDeleteCategory(id) {
    return (dispatch) => {
        return request({
            method: 'DELETE',
            url: `${CATEGORY.category}/${id}`
        })
            .then(res => res.json())
            .then(json => {
                dispatch(deleteCategory())
                log('delete category', json.message)
            })
            .catch(e => {
                logE('delete category', e.message);
            })
    }
}

export function handleGetCurrentCate(current_cate = '') {
    return (dispatch) => {
        dispatch(getCurrent(current_cate))
    }
}


const initialState = {
    loading: false,
    categories: [],
    currentCate: '' //当前选择类别
};
export const category_state = createReducer(initialState, {
    [CONTROL_READ_CATEGORIES]: (state, action) => {
        let {loading} = action
        return {
            ...state,
            loading
        }
    },
    [READ_CATEGORIES]: (state, action) => {
        let {categories} = action
        return {
            ...state,
            categories
        }
    },
    [CREATE_CATEGORY]: (state) => {
        return {
            ...state
        }
    },
    [DELETE_CATEGORY]: (state) => {
        return {
            ...state
        }
    },
    [GET_CURRENT]: (state, action) => {
        let {currentCate} = action
        return {
            ...state,
            currentCate
        }

    }
});