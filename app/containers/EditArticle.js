/**
 * Created by DaGuo on 2017/4/11.
 */
import React, {PropTypes, Component} from 'react'
import Editor from '../components/Editor'
import {Button, Input, Upload, Icon, Modal, Select,message} from 'antd'
import {HOST, ARTICLE} from '../constant'
const Option = Select.Option


// # admin editArticle
export default class EditArticle extends Component {


    static propTypes = {
        article: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
        loading: PropTypes.bool,
        categories: PropTypes.array
    };

    static defaultProps = {
        article: {},
        onSubmit: () => {
        },
        loading: false,
        categories: []
    };

    state = {
        title: this.props.article.art_title || '',
        previewVisible: false,
        fileList: this.props.article.art_img ? [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: this.props.article.art_img,
            //thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }] : [],
        cat_id: this.props.article.cat_id || ''
    };
    handleCancel = () => this.setState({previewVisible: false});

    handleChange = ({file, fileList}) => {
        // console.log('fileList', fileList)
        if (file.status == 'done') {
            this.setState({imgUrl: file.response.imgUrl});
        }
        this.setState({fileList})
    };
    handleRemove = () => {
        this.setState({imgUrl: ''})
    };

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleOnClick = () => {
        let html = this.editor.getContent(),
            {title, imgUrl,cat_id} = this.state,
            { onSubmit } = this.props
        // console.log('title',title,html);

        if(!title || !imgUrl || !cat_id || !html){
            message.error('内容不完整哟')
            return
        }
        const params = {
            art_title:title,
            art_img: imgUrl,
            art_content: html,
            cat_id
        };
        onSubmit && onSubmit(params)
        this.props.history.goBack();
    };
    onTitleChange = e => {
        let value = e.target.value, name = e.target.name
        // console.log('value and name',value,name);
        this.setState({
            [name]: value
        })
    };
    handleOnSelect = (value) => {

        // console.log('value', value);
        this.setState({
            cat_id:value
        })
    };
    handleBeforeUpload = file=>{
        // console.log('beforeUpload',file);
        const isIMG = /image/i.test(file.type);
        if (!isIMG) {
            message.error('You can only upload image!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isIMG && isLt2M;
    };

    render() {
        const {article, loading} = this.props;
        const {previewVisible, previewImage, fileList,title,cat_id} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
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
                        action={ HOST + '/upload'}
                        listType="picture-card"
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        onRemove={this.handleRemove}
                        name='art_img'
                        fileList={ fileList }
                        beforeUpload={this.handleBeforeUpload}
                    >
                        {fileList.length == 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                </div>
                <Input placeholder="文章标题"
                       style={{width: '40%', margin: '30px 0'}}
                       name="title"
                       value={ title }
                       onChange={ this.onTitleChange }
                />
                <Select value = {cat_id}
                        onChange={this.handleOnSelect}
                        style = {{marginLeft:'30px',width:120}}
                        dropdownMatchSelectWidth
                        defaultActiveFirstOption
                >
                    <Option value = '' key={'all'}>选择类别</Option>
                    {
                        this.props.categories.map(({_id, cat_name}) =>
                            <Option value={_id} key={_id}>
                                {cat_name}
                            </Option>)
                    }
                </Select>

                <Editor id="editor"
                        content={article.art_content || ''}
                        ref={editor => this.editor = editor}
                        uploadImgUrl={`${HOST}${ARTICLE.uploadImg}`}
                />
                <Button
                    type="primary"
                    onClick={ this.handleOnClick }
                    loading={ loading }
                    style={{marginTop: '10px'}}
                >
                    保存
                </Button>
            </div>
        )
    }
}