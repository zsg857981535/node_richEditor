/**
 * Created by DaGuo on 2017/4/20.
 */
import React, {Component, PropTypes} from 'react'
import {Pagination} from 'antd'
import {withRouter} from 'react-router-dom'

// const categories = Array.from(new Array(20)).map((item,index)=>({
//     id:index,
//     label:'category' + index
// }));


const CategoryList = ({categories, sum, onClickCate, selected, showMore, onReadAll}) => (
    <div className="category-container">
        <Category
            key={'all'}
            label={'全部'}
            count={ sum }
            className={selected == '' && 'selected'}
            onClick={onClickCate && onClickCate.bind(null, '')}
        />
        {
            categories && categories.map((item, index) =>
                <Category
                    key={item._id}
                    label={item.cat_name}
                    count={ item.count }
                    className={selected == item._id && 'selected'}
                    onClick={onClickCate && onClickCate.bind(null, item._id)}
                />
            )
        }
        { /*<a className="get-all" > 更多</a>*/}
    </div>
);

const Category = ({label, count, sum, className, onClick}) => (
    <div className={`category-item ${className || ''}`} onClick={onClick}>
        {label} {count}
    </div>
);

const Divide = ({category}) => (
    <div className="category-divide">
        <h2>{category}</h2>
        <span className="hr"></span>
    </div>
);
const ArticleRow = ({article, onClick}) => (
    <div className="article-row" onClick={onClick}>
        <img src={article.art_img}/>
        <div className="right-content">
            <h2>{article.art_title}</h2>
        </div>
    </div>
);

const ArticleList = ({articles, onRowClick}) => (
    <div className="article-list">
        {
            articles && articles.map((article, index) =>
                <ArticleRow
                    key={article._id}
                    article={article}
                    onClick={onRowClick.bind(null, article._id)}
                />
            )
        }
    </div>
);

// # View Blog
class Blog extends Component {


    render() {
        const {articlesGroup, onClickCate, currentCate, articles, categories, count, currentPage, OnPageChange} = this.props
        const category = categories && categories.find(el => el._id == currentCate)
        const sum = () => {
            let result = articlesGroup && articlesGroup.reduce((v, first) => ({count: v.count + first.count}), {count: 0})
            return result && result.count || 0;
        };
        // console.log('reduce sum',sum());这里渲染了5次?由于props不是一次性传进来的,每次接受到新的props都会重新渲染

        return (
            <div className="blog-container">
                <CategoryList
                    categories={articlesGroup}
                    onClickCate={onClickCate} selected={currentCate}
                    sum={sum()}
                />
                <Divide category={category && category.cat_name || '全部'}/>
                <ArticleList articles={articles}
                             onRowClick={(id) => this.props.history.push(`/article/${id}`)}
                />
                <Pagination
                    total={count}
                    defaultPageSize={10}
                    style={{width: 300, margin: '0 auto', marginTop: '10px'}}
                    defaultCurrent={1}
                    current={ currentPage }
                    onChange={ OnPageChange}/>
            </div>
        )
    }
}
//Note:必须要用withRouter 再包装一次,否则不会跳转组件
export default withRouter(Blog)