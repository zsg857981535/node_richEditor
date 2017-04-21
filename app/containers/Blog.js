/**
 * Created by DaGuo on 2017/4/20.
 */
import React,{ Component,PropTypes } from 'react'
import { Pagination} from 'antd'

const categories = Array.from(new Array(20)).map((item,index)=>({
    id:index,
    label:'category' + index
}));

const articles = Array.from(new Array(10)).map((item,index)=>({
    id:index,
    art_img: require('../art_img.png'),
    art_title:'React 解析之diff算法解析',
    art_content:'Table 是最常用展示数据的方式之一，可是一个产品中往往很多非常类似的 Table，但是我们碰到的情况往往是 Ta...'
}));

const CategoryList = ({categories})=>(
    <div className="category-container">
        {
            categories.map((item,index)=>
                <Category key = {item.id} label = {item.label} className = {index == 1 && 'selected'}/>
            )
        }
        <a className="get-all">More</a>
    </div>
);

const Category = ({label,className})=>(
    <div className= {`category-item ${className || ''}`}>
        {label}
    </div>
);

const Divide = ({category})=>(
    <div className="category-divide">
        <h2>{category}</h2>
        <span className="hr"></span>
    </div>
);

const ArticleRow = ({article,onClick})=>(
    <div className="article-row" onClick={onClick}>
        <img src = {article.art_img}/>
        <div className="right-content">
            <h2>{article.art_title}</h2>
            <p>
                {article.art_content}
            </p>
        </div>
    </div>
);

const ArticleList = ({articles,onRowClick})=>(
    <div className="article-list">
        {
            articles.map((article,index)=>
                <ArticleRow
                    key = {article.id}
                    article = {article}
                    onClick = {onRowClick}
                />
            )
        }
    </div>
);

// # View Blog
export default class Blog extends Component{
    render(){
        return(
            <div className="blog-container">
                <CategoryList categories = {categories}
                />
                <Divide category = {'JavaScript'}/>
                <ArticleList articles = {articles}
                             onRowClick = {()=>this.props.history.push('/article')}
                />
                <Pagination size="small" total={50} style = {{width:300,margin:'0 auto'}} />
            </div>
        )
    }
}