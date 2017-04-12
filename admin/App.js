/**
 * Created by DaGuo on 2017/3/15.
 */
import React, {Component, PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon,message,Modal,Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import ArticleList from './containers/ArticleList'
import EditArticle from './containers/EditArticle'

import {article_module} from './redux';
const {handleReadArticles,handleCreateArticle,handleUpdateArticle,handleDeleteArticle} = article_module;

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;



import 'override.less'
import 'App.scss'


// const Crumbs = props=>(<Breadcrumb>
//     {
//         props.routes.map((route,i)=>
//             <Breadcrumb.Item>
//                 <Link to = {route.path}>{route.name}</Link>
//              </Breadcrumb.Item>
//         )
//     }
// </Breadcrumb>);
//
// const RouteWithRoutes = route=>(<Route
//         path = {route.path}
//         render = {props=>(
//             <route.component { ...props} routes = {route.routes}/>
//         )}
//     />
// );
// const routes = [
//     {
//         path:'/articles',
//         name:'文章列表'
//     },
//     {
//         path:'/article:art_id',
//         name:'文章修改'
//     }
// ];


export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: 'dark',
            current: '1',
            visible_del:false //删除文章对话框
        };
    }

    componentDidMount() {
        this.props.readArticles();
    }

    // changeTheme = (value) => {
    //     this.setState({
    //         theme: value ? 'dark' : 'light',
    //     });
    // };
    // handleClick = (e) => {
    //     console.log('click ', e);
    //     this.setState({
    //         current: e.key,
    //     });
    // };

    handleEditArticle(id,title,html){
        console.log('submit',id,title,html);
        if(this.state.loading){
            return;
        }
        this.setState({
           loading:true
        });
        this.props.updateArticle(id,{art_content:html,art_title:title})
            .then(()=>{
                this.setState({
                    loading:false
                });
                message.success("修改成功")
            })
            .catch(()=>{
                message.error("修改失败");
            })
    }

    handleAddArticle(title,html){
        console.log('add article',title,html);

        if(this.state.loading){
            return;
        }
        this.setState({
            loading:true
        });
        this.props.createArticle({art_title:title,art_content:html})
            .then(()=>{
                this.setState({
                    loading:false
                });
                message.success("保存成功");
            })
            .catch(()=>{
                message.error("保存失败")
            })
    }

    handleDeleteArticle(){
        const { current_id } = this.state;
        this.props.deleteArticle(current_id)
            .then(()=>{
                this.props.readArticles(1,3,true);
                this.handleModalVisible('visible_del',false)
            })
            .catch(()=>{

            })
    }
    handleModalVisible(key,visible){
        this.setState({[key]:visible})
    }

    render() {
        // console.log('articles',this.props.articles);


        const { articles } = this.props
        return (
            <Router>
                <Layout style={{height: '100%'}}>
                    <Header className="header">
                        <div className="logo"/>
                        {/*
                         <Menu
                         theme="dark"
                         mode="horizontal"
                         defaultSelectedKeys={['2']}
                         style={{ lineHeight: '64px' }}
                         >
                         <Menu.Item key="1">nav 1</Menu.Item>
                         <Menu.Item key="2">nav 2</Menu.Item>
                         <Menu.Item key="3">nav 3</Menu.Item>
                         </Menu>*/}
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                theme="dark"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user"/>文章管理</span>}>
                                    <Menu.Item key="1"><Link to="/">文章列表</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>

                        <Layout style={{padding: '0 24px 24px'}}>
                            {/* <Breadcrumb style={{ margin: '12px 0' }}>
                             <Breadcrumb.Item>Home</Breadcrumb.Item>
                             <Breadcrumb.Item>List</Breadcrumb.Item>
                             <Breadcrumb.Item>App</Breadcrumb.Item>
                             </Breadcrumb>*/}
                            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                                    <Route exact path="/" render={({ history}) => {
                                        return (
                                            <div>
                                                <Button
                                                    type = "primary"
                                                    onClick={()=>history.push('/add/article')}
                                                >
                                                    新建文章
                                                </Button>
                                                <ArticleList
                                                    articles={articles}
                                                    onClickDel = {(id)=>{
                                                        //console.log("delete id",id);
                                                        this.setState({current_id:id})
                                                        this.handleModalVisible('visible_del',true)
                                                    }}
                                                />
                                                <Modal
                                                    title = "删除文章"
                                                    visible={this.state.visible_del}
                                                    onOk = {()=>this.handleDeleteArticle()}
                                                    onCancel={()=>this.handleModalVisible('visible_del',false)}
                                                >
                                                    <p>确定删除该文章吗?</p>
                                                </Modal>
                                            </div>
                                        )
                                    }}/>
                                    {/*
                                    <Route path="/article/:art_id" render={({match, location, history}) => (
                                        <Article article={history.location.state.article}/>)}/>*/}
                                    <Route
                                        path = "/article/:art_id"
                                        name = "编辑文章"
                                        render = {({match,...rest})=>(<EditArticle
                                                article = { articles &&
                                                articles.find(el=>el._id == match.params.art_id)}
                                                onSubmit = { (title,html)=>this.handleEditArticle(match.params.art_id,title,html) }
                                                loading = { this.state.loading }
                                                {...rest}
                                                match = {match}
                                        />)}
                                    />
                                    <Route
                                        path = "/add/article"
                                        name = "新建文章"
                                        render = {props=><EditArticle
                                                onSubmit={(title,html)=>this.handleAddArticle(title,html)}
                                                loading = { this.state.loading }
                                        />}
                                    />

                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    const articles = state.article_state.listOfPage['1'];
    // console.log('state====',articles);
    return {
        articles
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        readArticles: handleReadArticles,
        createArticle:handleCreateArticle,
        updateArticle:handleUpdateArticle,
        deleteArticle:handleDeleteArticle
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);





