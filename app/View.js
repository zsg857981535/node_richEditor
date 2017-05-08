/**
 * Created by DaGuo on 2017/4/19.
 */
//# 前端展示入口


import React, {Component, PropTypes} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Article, Blog} from './containers'
import {Icon} from 'antd'
import {article_module, category_module} from './redux';
const {
    handleReadArticles,
    handleCreateArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    handleReadGroup,
    getCurrentPage,
    getArticle
} = article_module;

const {
    handleReadCategories,
    handleCreateCategory,
    handleDeleteCategory,
    handleGetCurrentCate

} = category_module

import NotMatch from './components/NotMatch'

const Navigation = ({className}) => (
    <header className={`navigation-container ${className || ''}`}>
        <Link to='' className="logo">LOGO</Link>
        <nav>
            <ul className="clear">
                <li><Link to='/'>BLOG</Link></li>
                <li><Link to=''>ABOUT ME</Link></li>
                <li><Link to=''>CONTACT ME</Link></li>
            </ul>
        </nav>
    </header>
);


class View extends Component {

    componentDidMount() {
        //auto hide navigation
        // let c, currentScrollTop = 0,
        //     nav = $(this.nav),
        //     b = nav.height();
        // console.log('nav,height',nav,b);
        // $(window).scroll(function () {
        //     let a = $(window).scrollTop();
        //     currentScrollTop = a;
        //     if (c < currentScrollTop && a > (b + b)) {
        //         nav.addClass("is-hide");
        //     } else if (c > currentScrollTop && !(a <= b)) {
        //         nav.removeClass("is-hide");
        //     }
        //     c = currentScrollTop;
        // });

        /*back to top button*/
        var offset = 100;
        var duration = 300;
        $(window).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(duration);
            } else {
                $('.back-to-top').fadeOut(duration);
            }
        });
        $('.back-to-top').click(function (event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, duration);
        })
        this.props.readArticles()
            .then(() => {
                this.props.getCurrentPage()
            })
        this.props.readCategories()
        this.props.readGroup()
    }

    handleCateClick = (id) => {
        // console.log('cate click id',id);
        this.props.getCurrentCate(id)
        this.props.readArticles(1, 10, id, true)
            .then(() => {
                this.props.getCurrentPage()
            })
    };
    handleOnPageChange = (page, pageSize) => {
        // console.log('page pageSize',page,pageSize);
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

    render() {
        // const article = {
        //     art_img: require('./art_img.png'),
        //     art_title: '测试文章详情标题',
        //     art_createTime: '2017-04-15 下午14:00',
        //     art_content: '<p>测试文章内容</p>'
        // };
        return (
            <Router>
                <div>
                    <Navigation ref={nav => this.nav = nav}/>
                    <Switch>
                        <Route path="/" exact
                               render={({...rest}) =>
                                   <Blog
                                       {...rest}
                                       {...this.props}
                                       onClickCate={this.handleCateClick}
                                       OnPageChange={ this.handleOnPageChange }
                                   />}
                        />
                        <Route path="/article/:id" exact
                               render={({match, ...rest}) =>
                                   <Article
                                       article={this.props.articles.find(el => el._id == match.params.id)}
                                       {...rest}
                                       match={match}
                                       fetchData={getArticle}
                                   />}
                        />
                        <Route component={ NotMatch }/>
                    </Switch>
                    <a href="#" className="back-to-top">
                        <Icon type="up-square"/>
                    </a>
                </div>
            </Router>
        )
    }
}
function mapStateToProps(state) {
    const {listOfPage, currentData, currentPage, groupData} = state.article_state;
    const {count} =  listOfPage;
    // console.log('count currentPage',count,currentPage);
    const {categories, currentCate} = state.category_state
    return {
        listOfPage,
        articles: currentData,
        articlesGroup: groupData,
        count,
        currentPage,
        categories,
        currentCate
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        readArticles: handleReadArticles,
        createArticle: handleCreateArticle,
        updateArticle: handleUpdateArticle,
        deleteArticle: handleDeleteArticle,
        readGroup: handleReadGroup,
        getCurrentPage,

        readCategories: handleReadCategories,
        createCategory: handleCreateCategory,
        deleteCategory: handleDeleteCategory,
        getCurrentCate: handleGetCurrentCate
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(View);