
import { BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import { Main,Login,View} from './containers'
import NotMatch from './components/NotMatch'
import  React from 'react'
const App = ()=> (

    <Router>
        <Switch>
            {/*这里用嵌套路由不能加exact做精确匹配,否则不能匹配到父级container*/}
            <Route path = '/login' exact component={ Login }/>
            <Route path = '/admin' component={ Main }/>
            <Route path = '/' component={ View }/>
            {/*<Route path = '/blog'  component={ View }/>*/}
            <Route component={ NotMatch }/>
        </Switch>
    </Router>
)

export default App