/**
 * Created by DaGuo on 2017/3/15.
 */
import React,{Component,PropTypes} from 'react';
import { Layout,Menu,Breadcrumb,Icon} from 'antd';
import { connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ArticleList from './containers/ArticleList'


import { article_module } from './redux';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { handleReadArticles } = article_module;


import 'override.less'
import 'App.scss'

export class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            theme: 'dark',
            current: '1',
        };
    }
    componentDidMount(){
        this.props.readArticles();
    }
    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    render(){
        console.log('articles',this.props.articles);
        return (
             <Layout style = {{ height:'100%'}}>
                <Header className="header">
                    <div className="logo" />
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
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout style={{ padding: '0 24px 24px' }}>
                        {/* <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>*/}
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            {/*
                            <Route path = '/articles' render = {
                                ()=>(<ArticleList articles = {this.props.articles}/>)
                            }/>*/}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

function mapStateToProps(state){
    const articles = state.article_state.listOfPage[0];
    console.log('state====',state);
    return {
        articles
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        readArticles:handleReadArticles
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);





