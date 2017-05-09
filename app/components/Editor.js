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
        //是否允许携带Cookie
        this.editor.config.withCredentials = false;
        // this.editor.config.uploadImgFns.onload = function (resultText, xhr) {
        //     // resultText 服务器端返回的text
        //     // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        //
        //     // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
        //     var originalName = editor.uploadImgOriginalName || '';
        //
        //     // 如果 resultText 是图片的url地址，可以这样插入图片：
        //     editor.command(null, 'insertHtml', `<img src = ${URL}${resultText} alt = ${originalName}/>`);
        //     // 如果不想要 img 的 max-width 样式，也可以这样插入：
        //     // editor.command(null, 'InsertImage', resultText);
        // };
        //
        // // 自定义timeout事件
        // this.editor.config.uploadImgFns.ontimeout = function (xhr) {
        //     // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        //     alert('上传超时');
        // };
        //
        // // 自定义error事件
        // this.editor.config.uploadImgFns.onerror = function (xhr) {
        //     // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        //     alert('上传错误');
        // };

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