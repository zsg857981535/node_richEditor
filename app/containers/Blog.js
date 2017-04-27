/**
 * Created by DaGuo on 2017/4/20.
 */
import React,{ Component,PropTypes } from 'react'
import { Pagination} from 'antd'

// const categories = Array.from(new Array(20)).map((item,index)=>({
//     id:index,
//     label:'category' + index
// }));

const articles = Array.from(new Array(10)).map((item,index)=>({
    id:index,
    art_img: require('../art_img.png'),
    art_title:'React 解析之diff算法解析',
    art_content:'Table 是最常用展示数据的方式之一，可是一个产品中往往很多非常类似的 Table，但是我们碰到的情况往往是 Ta...'
}));

const CategoryList = ({categories,sum,onClickCate,selected,showMore,onReadAll})=>(
    <div className="category-container">
        <Category
            key = {'all'}
            label = {'全部'}
            count = { sum }
            className = {selected == '' && 'selected'}
            onClick = {onClickCate.bind(null,'')}
        />
        {
            categories.map((item,index)=>
                <Category
                    key = {item._id}
                    label = {item.cat_name}
                    count = { item.count }
                    className = {selected == item._id && 'selected'}
                    onClick = {onClickCate.bind(null,item._id)}
                />
            )
        }
        { /*<a className="get-all" > 更多</a>*/}
    </div>
);

const Category = ({label,count,sum,className,onClick})=>(
    <div className= {`category-item ${className || ''}`} onClick = {onClick}>
        {label} {count}
    </div>
);

const Divide = ({category})=>(
    <div className="category-divide">
        <h2>{category}</h2>
        <span className="hr"></span>
    </div>
);
const cut = (str)=>{
  const start = str.indexOf('<p>') + 3,
      end = str.indexOf("</p>");
  // console.log('start end',start,end);
   return str.substring(start,end).slice(0,20) + '...'
};
const ArticleRow = ({article,onClick})=>(
    <div className="article-row" onClick={onClick}>
        <img src = {article.art_img}/>
        <div className="right-content">
            <h2>{article.art_title}</h2>
            {/*
            <p>
                {cut(article.art_content)}
            </p>*/}
        </div>
    </div>
);

const ArticleList = ({articles,onRowClick})=>(
    <div className="article-list">
        {
            articles.map((article,index)=>
                <ArticleRow
                    key = {article._id}
                    article = {article}
                    onClick = {onRowClick.bind(null,article._id)}
                />
            )
        }
    </div>
);

// # View Blog
export default class Blog extends Component{


    render(){
        const { articlesGroup,onClickCate,currentCate,articles,categories,count } = this.props
        const category = categories.find(el=>el._id == currentCate)
        const sum = ()=>{
            let result = articlesGroup.reduce((v,first)=> ({count:v.count + first.count}),{count:0})
            return result.count;
        };
        // console.log('reduce sum',sum());这里渲染了5次?由于props不是一次性传进来的,每次接受到新的props都会重新渲染

        return(
            <div className="blog-container">
                <CategoryList
                    categories = {articlesGroup}
                    onClickCate = {onClickCate} selected = {currentCate}
                    sum = {sum()}
                />
                <Divide category = {category && category.cat_name || '全部'}/>
                <ArticleList articles = {articles}
                             onRowClick = {(id)=>this.props.history.push(`/article/${id}`)}
                />
                <Pagination size="small" total={count} style = {{width:300,margin:'0 auto'}} />
            </div>
        )
    }
}