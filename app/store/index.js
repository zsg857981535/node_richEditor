/**
 * Created by DaGuo on 2017/3/22.
 */

import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {article_module} from '../redux';

const { article_state } = article_module;

const reducers = combineReducers({
    article_state
});

const middlewares = [ thunk ];

if(process.env.NODE_ENV == 'development'){
    middlewares.unshift(createLogger());
}
const finalCreateStore = applyMiddleware(
    ...middlewares
)(_createStore);
// const store = finalCreateStore(reducers);
// console.log(store.getState());


export default function (initialState){
    const store = finalCreateStore(reducers,initialState);

    //Enable Webpack hot module replacement for reducers
    // if(module.hot){
    //     const nextRootReducer = require('../reducers');
    //     store.replaceReducer(nextRootReducer);
    // }
    return store;
}