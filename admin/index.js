/**
 * Created by DaGuo on 2017/3/15.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router'
import configureStore from './store';
import createRoutes from './router';



const store = configureStore();


console.log('store',store.getState())

ReactDOM.render(

    <Provider store = {store}>
        {createRoutes(browserHistory)}
    </Provider>
    ,
    document.getElementById('root')
);