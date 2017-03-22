/**
 * Created by DaGuo on 2017/3/15.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import {App} from 'App';


const store = configureStore();


console.log('store',store.getState())

ReactDOM.render(

    <Provider store = {store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);