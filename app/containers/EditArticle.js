/**
 * Created by DaGuo on 2017/4/11.
 */
import React,{ PropTypes ,Component} from 'react'
import Editor from '../components/Editor'
import { Button,Input,Upload,Icon,Modal} from 'antd'
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
        title: this.props.article.art_title || '',
        previewVisible:false,
        fileList:[{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: this.props.article.art_img,
            //thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }]
    };
    handleCancel =()=>this.setState({ previewVisible:false});

    handleChange = ({ file,fileList }) => {
        console.log('fileList',fileList)
        if(file.status == 'done'){
            this.setState({ imgUrl:file.response.imgUrl});
        }
        this.setState({fileList})
    };
    handleRemove = ()=>{
        this.setState({imgUrl:''})
    };

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleOnClick=()=>{
        let html = this.editor.getContent(),
            {title,imgUrl} = this.state,
            { onSubmit } = this.props
        // console.log('title',title,html);
         onSubmit && onSubmit(imgUrl,title,html)
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
        const { previewVisible, previewImage,fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传题图</div>
            </div>
        );
        // console.log('content==',content);
        // console.log('location',this.props.location);
        // console.log('history',this.props.history);
        // console.log('match',this.props.match);
        return (
            <div className="edit-article-container">
                <div className="clearfix">
                    <Upload
                        action= { HOST + '/upload'}
                        listType="picture-card"
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        onRemove = {this.handleRemove}
                        name = 'art_img'
                        fileList = { fileList }
                    >
                        {fileList.length == 1  ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
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