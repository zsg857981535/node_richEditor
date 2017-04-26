/**
 * Created by DaGuo on 2017/4/24.
 */
import React,{ Component,PropTypes } from 'react'
import { Tag,Input,Tooltip,Button,Popconfirm} from 'antd'


// # admin Category
export default class Category extends Component{

    static propTypes = {
        tags: PropTypes.array,
        onRemoveTag: PropTypes.func,
        onAddTag: PropTypes.func,
        fetchData: PropTypes.func
    };
    static defaultProps = {
        tags:[],
        onRemoveTag:()=>{},
        onAddTag:()=>{},
        fetchData: ()=>{}
    };

    componentDidMount(){
        this.props.fetchData()
    }

    state = {
        inputVisible: false,
        inputValue: '',
    };
    handleConfirm = (id) => {
        const { onRemoveTag } = this.props
        onRemoveTag && onRemoveTag(id)
            .then(()=>{
                this.props.fetchData(true)
            })
    };
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };
    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        const { onAddTag,tags } = this.props
        //是否已经存在该类别
        const result = tags.find((el)=>el.cat_name === inputValue)
        // console.log('input result',result);
        if(result ==  undefined && inputValue !== ''){
            onAddTag && onAddTag({cat_name:inputValue})
                .then(()=>{
                    this.props.fetchData(true)
                })
        }
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    };
    saveInputRef = input => this.input = input;

    render(){

        const { inputVisible, inputValue } = this.state;
        const { tags } = this.props
        return (
            <div>
                {tags.map(({cat_name:tag,_id}) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Popconfirm key = {_id} placement = "right" title = {'确定删除该分类标签?'} onConfirm = {()=>this.handleConfirm(_id)}>
                            <Tag key={_id} closable>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                        </Popconfirm>
                    );
                    return isLongTag ? <Tooltip title={tag} key = {_id}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text" size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
            </div>
        )
    }
}