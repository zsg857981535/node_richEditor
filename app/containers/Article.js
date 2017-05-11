/**
 * Created by DaGuo on 2017/4/19.
 */
import React, {Component, PropTypes} from 'react'
import {Icon} from 'antd'


//# View article
class Article extends Component {
    state = {
        article: {}
    };

    componentDidMount() {
        const {params:{id}} = this.props.match
        const {article} = this.props
        // console.log('params',id)
        //如果有这篇文章就不去调用接口
        if (article) {
            this.setState({
                article
            })
        } else {
            this.props.fetchData(id)
                .then(res => res.json())
                .then(json => {
                    const {article} = json
                    this.setState({
                        article
                    })
                })
        }
    }

    render() {
        const {article} = this.state
        return (
            <div className="view-article-container">
                <a className="back-arrow"
                   onClick={() => this.props.history.goBack()}
                >
                    <Icon type="left"/>Back
                </a>
                <div className="article-img">
                    <img src={article.art_img}/>
                </div>

                <div className="article-title">
                    {article.art_title}
                </div>

                <div className="article-time">
                    {article.art_createTime && new Date(article.art_createTime).toLocaleString()}
                </div>

                <div className="article-content"
                     dangerouslySetInnerHTML={{__html: article.art_content}}
                >
                </div>
            </div>
        )
    }
}
export default Article