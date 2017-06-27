import  React, {Component}from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Main, Login, View} from './containers'
import NotMatch from './components/NotMatch'

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