/**
 * Created by DaGuo on 2017/3/22.
 */
//文章列表


import React from 'react'
import {Card, Button} from 'antd'
import {Link} from 'react-router-dom'

const ArticleList = (props) => {
    return props.articles ?
            <div className="articles-container">
                { props.articles.map((el, index) =>
                    <Card
                        title={el.art_title}
                        key={el._id}
                        className="articles-item"
                        extra={<div>
                            <Link to={`/article/${el._id}`}>编辑</Link>
                            <a onClick={props.onClickDel.bind(null,el._id)} style={{marginLeft: 10}}>删除</a>
                        </div>}
                    >
                    </Card>
                )
                }
            </div>
        : <div>loading articles...</div>
};

export const Article = (props) => (<div dangerouslySetInnerHTML={{__html: props.article.art_content}}></div>);

export default ArticleList;