/**
 * Created by DaGuo on 2017/3/22.
 */

import update from 'react-addons-update';
/**
 *
 * @param type string
 * @param argNames any
 * @returns {Function} actionCreator
 */
export function makeActionCreator(type, ...argNames) {
    return function (...args) {
        let action = {type};
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action
    }
}
/**
 *
 * @param initialState any
 * @param handlers  object
 * @returns {Function}  reducer
 */
export function createReducer(initialState = {
    loading: false,
    listOfPage: {}
    /*
     listOfPage:{
     pageNumber:list,//当页记录数
     pageCount:pageCount,//总页数
     count:count,//总的记录数,
     currentPage:pageNumber//当前页
     }
     */
}, handlers) {
    return function (state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}
const DEV = process.env.NODE_ENV == 'development'
export function log(desc = '', info = '') {
    DEV && console.info(desc + ':', info)
}

export function logE(desc = '', info = '') {
    DEV && console.error(desc + ':', info)
}
