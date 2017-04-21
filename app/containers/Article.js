/**
 * Created by DaGuo on 2017/4/19.
 */
import React,{ Component,PropTypes } from 'react'
import { Icon } from 'antd'

const article = {
    art_img: require('../art_img.png'),
    art_title:'测试文章详情标题',
    art_createTime:'2017-04-15 下午14:00',
    art_content:'<p>测试文章内容</p>'
};

// View Single Article
const Article = ({article,history})=>(
    <div className="article-container">
        <a className="back-arrow"
            onClick={()=>history.goBack()}
        >
            <Icon type="left" />Back
        </a>
        <div className="article-img">
            <img src = {article.art_img}/>
        </div>

        <div className="article-title">
            {article.art_title}
        </div>

        <div className="article-time">
            {article.art_createTime}
        </div>

        <div className="article-content"
            dangerouslySetInnerHTML={{__html:article.art_content}}
        >
        </div>
    </div>
);
export default Article