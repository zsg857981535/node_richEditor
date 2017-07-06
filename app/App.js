import  React, {Component}from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Main, Login, View} from './containers'
import NotMatch from './components/NotMatch'
// import Loading from './components/LoadingCom'
// import Loadable from 'react-loadable'

//bug：使用lazy load 之后hot loader 失效?
// const LoadableView = Loadable({
//     loader: () => import(/*WebpackChunkName:'View'*/'./containers/View'),
//     loading: Loading,
//     delay: 200
// })
//
// const LoadableMain = Loadable({
//     loader: () => import(/*WebpackChunkName:'Main'*/'./containers/Main'),
//     loading: Loading,
//     delay: 200
// })
//
// const LoadableLogin = Loadable({
//     loader: () => import(/*WebpackChunkName:'Login'*/'./containers/Login'),
//     loading: Loading,
//     delay: 200
// })


const App = () => (
    <Router>
        <Switch>
            {/*Note:这里用嵌套路由不能加exact做精确匹配,否则不能匹配到父级container*/}
            <Route path='/login' exact component={ Login }/>
            <Route path='/admin' component={ Main }/>
            <Route path='/' component={ View }/>
            {/*<Route path = '/blog'  component={ View }/>*/}
            <Route component={ NotMatch }/>
        </Switch>
    </Router>
)
export default App