/**
 * Created by DaGuo on 2017/3/15.
 */
import React, {Component, PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon, message, Modal, Button, Pagination, Select} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {
    ArticleList,
    EditArticle,
    Category,
    Login
} from './containers'
import NotMatch from './components/NotMatch'

import {article_module, category_module, user_module} from './redux';
const {
    handleReadArticles,
    handleCreateArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    getCurrentPage
} = article_module;

const {
    handleReadCategories,
    handleCreateCategory,
    handleDeleteCategory,
    handleGetCurrentCate

} = category_module

const {
    handleAuthorize,
    handleAutoAuth,
    handleLogOut
}
    = user_module

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const Option = Select.Option;

require('./override.less')
require('./App.scss')



export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // theme: 'dark',
            // current: '1',
            visible_del: false //删除文章对话框
        };
    }

    componentDidMount() {
        this.props.autoAuth()
        this.props.readArticles()
            .then(() => {
                this.props.getCurrentPage()
            })
        this.props.readCategories()
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

    handleEditArticle(id, params) {
        // console.log('submit', params);
        if (this.state.loading) {
            return;
        }
        this.setState({
            loading: true
        });
        this.props.updateArticle(id, params)
            .then(() => {
                this.setState({
                    loading: false
                });
                message.success("修改成功")
                this.props.readArticles(1, 10, this.props.currentCate, true)
                    .then(() => {
                        this.props.getCurrentPage()
                    })
            })
            .catch(() => {
                message.error("修改失败");
            })
    }

    handleAddArticle(params) {
        // console.log('add article', params);

        if (this.state.loading) {
            return;
        }
        this.setState({
            loading: true
        });
        this.props.createArticle(params)
            .then(() => {
                this.setState({
                    loading: false
                });
                message.success("保存成功");
                this.props.readArticles(1, 10, this.props.currentCate, true)
                    .then(() => {
                        this.props.getCurrentPage()
                    })
            })
            .catch(() => {
                message.error("保存失败")
            })
    }

    handleDeleteArticle() {
        const {current_id} = this.state;
        this.props.deleteArticle(current_id)
            .then(() => {
                this.props.readArticles(1, 10, this.props.currentCate, true)
                    .then(() => {
                        this.props.getCurrentPage()
                    });
                this.handleModalVisible('visible_del', false)
            })
            .catch(() => {

            })
    }

    handleModalVisible(key, visible) {
        this.setState({[key]: visible})
    }

    handleOnPageChange = (page, pageSize) => {
        // console.log('page pageSize', page, pageSize);
        //判断有没有这一页的数据,有就不加载
        const {listOfPage} = this.props
        if (!listOfPage[page]) {
            this.props.readArticles(page, pageSize, this.props.currentCate, true)
                .then(() => {
                    this.props.getCurrentPage(page)
                })
        } else {
            this.props.getCurrentPage(page)
        }
    };

    //选择类别
    handleOnSelect = (value) => {

        // console.log('value',value);
        this.props.getCurrentCate(value)
        this.props.readArticles(1, 10, value, true)
            .then(() => {
                this.props.getCurrentPage()
            })
    };

    //login
    handleAuthorize = (username, password) => {
        if (this.state.loading) {
            return
        }
        this.setState({
            loading: true,
            loginStatus: ''
        })
        this.props.authorize(username, password)
            .then(() => {
                this.setState({loading: false})
            })
            .catch(e => {
                this.setState({
                    loginStatus: e.message,
                    loading: false
                })
            })
    };

    render() {
        // console.log('articles',this.props.articles);


        const {
            articles,
            count,
            currentPage,
            readCategories,
            createCategory,
            deleteCategory,
            categories,
            currentCate

        } = this.props
        return (

            //todo 怎么解决渲染短暂的闪烁问题
            <Router>

                {
                    !this.props.isAuthorized ?
                        <Login
                            onSubmit={this.handleAuthorize}
                            loading={ this.state.loading }
                            loginStatus={ this.state.loginStatus || ''}
                        />
                        :
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
                                        <SubMenu key="sub1" title={<span><Icon type="book"/>文章管理</span>}>
                                            <Menu.Item key="1"><Link to="/">文章列表</Link></Menu.Item>
                                            <Menu.Item key="2"><Link to="/categories">类别列表</Link></Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="sub2" title={<span><Icon type="user"/>用户管理</span>}>
                                            <Menu.Item key="1"><a to=""
                                                                  onClick={() => this.props.logout()}>退出登录</a></Menu.Item>
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
                                        <Switch>
                                            <Route exact path="/" render={({history}) => {
                                                return (
                                                    <div>
                                                        <Button
                                                            type="primary"
                                                            onClick={() => history.push('/add/article')}
                                                            style={{margin: '10px 0 0 1%'}}
                                                        >
                                                            新建文章
                                                        </Button>
                                                        <Select value={ currentCate }
                                                                onChange={this.handleOnSelect}
                                                                style={{marginLeft: '30px', width: 120}}
                                                        >
                                                            <Option value="" key={'all'}>全部</Option>
                                                            {
                                                                this.props.categories.map(({_id, cat_name}) =>
                                                                    <Option value={_id} key={_id}>
                                                                        {cat_name}
                                                                    </Option>)
                                                            }
                                                        </Select>
                                                        <ArticleList
                                                            articles={articles}
                                                            onClickDel={(id) => {
                                                                //console.log("delete id",id);
                                                                this.setState({current_id: id})
                                                                this.handleModalVisible('visible_del', true)
                                                            }}
                                                        />
                                                        <Pagination
                                                            total={count}
                                                            defaultPageSize={10}
                                                            style={{width: 300, margin: '0 auto', marginTop: '10px'}}
                                                            defaultCurrent={1}
                                                            current={ currentPage }
                                                            onChange={this.handleOnPageChange}
                                                        />
                                                        <Modal
                                                            title="删除文章"
                                                            visible={this.state.visible_del}
                                                            onOk={() => this.handleDeleteArticle()}
                                                            onCancel={() => this.handleModalVisible('visible_del', false)}
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
                                                path="/article/:art_id"
                                                name="编辑文章"
                                                render={({match, ...rest}) => (<EditArticle
                                                    article={ articles &&
                                                    articles.find(el => el._id == match.params.art_id)}
                                                    onSubmit={ (params) => this.handleEditArticle(match.params.art_id, params) }
                                                    loading={ this.state.loading }
                                                    {...rest}
                                                    match={match}
                                                    categories={ categories }
                                                />)}
                                            />
                                            <Route
                                                path="/add/article"
                                                name="新建文章"
                                                render={({...rest}) => <EditArticle
                                                    onSubmit={(params) => this.handleAddArticle(params)}
                                                    loading={ this.state.loading }
                                                    categories={ categories }
                                                    {...rest}
                                                />}
                                            />
                                            <Route
                                                path="/categories"
                                                name="类别列表"
                                                render={props => <Category
                                                    fetchData={ readCategories}
                                                    tags={ categories }
                                                    onRemoveTag={ deleteCategory }
                                                    onAddTag={ createCategory }

                                                />}
                                            />
                                            <Route component={ NotMatch }/>
                                        </Switch>
                                    </Content>
                                </Layout>
                            </Layout>
                        </Layout>
                }
            </Router>
        )
    }
}

function mapStateToProps(state) {
    const {listOfPage, currentData, currentPage} = state.article_state;
    const {count} =  listOfPage;
    // console.log('count currentPage',count,currentPage);
    const {categories, currentCate} = state.category_state
    const {isAuthorized} = state.user_state
    return {
        listOfPage,
        articles: currentData,
        count,
        currentPage,
        categories,
        currentCate,
        isAuthorized
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        readArticles: handleReadArticles,
        createArticle: handleCreateArticle,
        updateArticle: handleUpdateArticle,
        deleteArticle: handleDeleteArticle,
        getCurrentPage,

        readCategories: handleReadCategories,
        createCategory: handleCreateCategory,
        deleteCategory: handleDeleteCategory,
        getCurrentCate: handleGetCurrentCate,

        authorize: handleAuthorize,
        autoAuth: handleAutoAuth,
        logout: handleLogOut
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);





