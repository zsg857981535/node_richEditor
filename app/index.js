/**
 * Created by DaGuo on 2017/3/15.
 */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store'
import App from './App'
import { AppContainer } from 'react-hot-loader'
const store = configureStore();
const DEV = process.env.NODE_ENV == 'development';
// console.log('store',store.getState())
// require('./theme.less')
require('./App.scss')
require('../lib/wangEditor/js/wangEditor.min')
require('../lib/wangEditor/css/wangEditor.css')

function renderApp(Component){
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>
        ,
        document.getElementById('root')
    )
}
renderApp(App)

// 下面的代码用来支持我们热加载应用
if (DEV && module.hot) {
    // 应用任何的改变将造成热加载，重新渲染。
    module.hot.accept(
        './App',
        () => renderApp(App)
    )
}