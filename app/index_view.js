/**
 * Created by DaGuo on 2017/4/19.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import View from './View'


const store = configureStore();


// console.log('store',store.getState())
import 'override.less'
import './View.scss'
ReactDOM.render(

    <Provider store = {store}>
        <View/>
    </Provider>
    ,
    document.getElementById('root')
);