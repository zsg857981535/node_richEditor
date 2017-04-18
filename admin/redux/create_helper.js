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

/**
 *
 * @param entity
 * @returns {{}} handlers
 */
export function createHandlers(entity) {
    return {
        [`CONTROL_READ_${entity}S`]: (state, action) => {
            let loading = action.loading;
            return {
                ...state,
                loading
            }
        },
        [`READ_${entity}S`]: (state, action) => {
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
        ['GET_CURRENT']:(state,action)=>{
            let { current,currentData } = action

            return {
                ...state,
                current,
                currentData
            }
        },
        [`CREATE_${entity}`]: (state) => {
            return {
                ...state
            }
        },
        [`UPDATE_${entity}`]: (state) => {
            return {
                ...state
            }
        },
        [`DELETE_${entity}`]: (state) => {
            return {
                ...state
            }
        }
    }
}