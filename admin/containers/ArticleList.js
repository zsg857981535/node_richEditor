/**
 * Created by DaGuo on 2017/3/22.
 */
//文章列表

import { Card } from 'antd'

const ArticleList = (articles)=>{
    return articles ?
        articles.map((el,index)=>
            <Card title = {el.art_title}>


            </Card>
        )
        :<div>loading articles...</div>
};

export default ArticleList;