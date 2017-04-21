/**
 * Created by DaGuo on 2017/4/11.
 */
import React,{ PropTypes ,Component} from 'react'
import Editor from '../components/Editor'
import { Button,Input} from 'antd'
import { HOST,ARTICLE } from '../constant'



// # admin editArticle
export default class EditArticle extends Component{


    static propTypes = {
        article: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
        loading: PropTypes.bool
    };

    static defaultProps = {
        article:{},
        onSubmit:()=>{},
        loading: false
    };

    state = {
        title: this.props.article.art_title || ''
    };

    handleOnClick=()=>{
        let html = this.editor.getContent(),
            {title} = this.state,
            { onSubmit } = this.props
        // console.log('title',title,html);
         onSubmit && onSubmit(title,html)
    };
    onTitleChange=e=>{
        let value = e.target.value,name = e.target.name
        // console.log('value and name',value,name);
        this.setState({
            [name]:value
        })
    };
    render(){
        const { article,loading} = this.props;
        // console.log('content==',content);
        // console.log('location',this.props.location);
        // console.log('history',this.props.history);
        // console.log('match',this.props.match);
        return (
            <div className="edit-article-container">
                <Input placeholder = "文章标题"
                       style = {{width: '40%',margin:'30px 0'}}
                       name = "title"
                       value = { this.state.title }
                       onChange = { this.onTitleChange }
                />
                <Editor id = "editor"
                        content = {article.art_content || ''}
                        ref = {editor=>this.editor = editor}
                        uploadImgUrl={`${HOST}${ARTICLE.uploadImg}`}
                />
                <Button
                    type = "primary"
                    onClick={ this.handleOnClick }
                    loading = { loading }
                    style = {{ marginTop:'10px'}}
                >
                    保存
                </Button>
            </div>
        )
    }
}