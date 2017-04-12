/**
 * Created by DaGuo on 2017/4/11.
 */
import React,{ PropTypes,Component } from 'react'



export default class Editor extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        uploadImgUrl: PropTypes.string,
        content: PropTypes.string
    };

    static defaultProps = {
        content:'',
        uploadUmgUrl:'/upload',
        id:'editor'
    };

    componentDidMount(){
        let id = this.props.id;
        this.editor = new window.wangEditor(id);
        // 取消/开启粘贴过滤
        this.editor.config.pasteFilter = true;
        //只粘贴纯文本
        this.editor.config.pasteText = true;
        //配置上传图片
        this.editor.config.uploadImgUrl = this.props.uploadImgUrl;

        this.editor.config.withCredentials = true;
        this.editor.create();

        //初始化内容
        this.editor.$txt.html(this.props.content);
    }
    //获取内容
    getContent=()=>{
        let content = this.editor.$txt.html();
        return content;
    };


    render(){
        return (
            <div id = {this.props.id} className="editor-container">

            </div>
        )
    }
}