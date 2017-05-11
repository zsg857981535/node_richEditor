/**
 * Created by DaGuo on 2017/5/4.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { user_module } from '../redux'
const {
    handleAuthorize,
    handleAutoAuth,
    handleLogOut
}
    = user_module

// # admin login
class Login extends Component {

    static propTypes = {
        loginStatus: PropTypes.string,
        onSubmit: PropTypes.func
    }

    static defaultProps = {
        loginStatus: '',
        onSubmit: ()=>{}
    }

    state = {};

    handleSubmit = (e) => {
        e.preventDefault();
        const { username,password } = this.state
        // console.log('username,password',username,password);
        const validate = {},help = {}
        if(!username){
            validate['username'] = 'error'
            help['username'] = 'username is required'
        }
        if(!password){
            validate['password'] = 'error'
            help['password'] = 'password is required'
        }
        this.setState({
            validate,
            help
        })
        for(let item in validate){
            if(validate[item] == 'error'){
                return
            }
        }
        // const { onSubmit } = this.props
        // onSubmit && onSubmit(username,password)
        this.handleAuthorize(username,password)
    };

    //login
    handleAuthorize = (username, password) => {
        if (this.state.loading) {
            return
        }
        this.setState({
            loading: true,
            loginStatus: ''
        })
        this.props.authorize(username, password)
            .then(() => {
                this.setState({loading: false})
                this.props.history.replace('/admin')
            })
            .catch(e => {
                this.setState({
                    loginStatus: e.message,
                    loading: false
                })
            })
    };
    handleOnChange = e => {
        const name = e.target.name, value = e.target.value
        this.setState({
            [name]: value
        })
    };

    render() {
        const {validate = {}, help = {}, loginStatus,loading  } = this.state
        // const { loginStatus } = this.props
        return (
            <Form onSubmit={this.handleSubmit}
                  onChange={this.handleOnChange }
                  className="login-form"
            >
                <FormItem
                    hasFeedback
                    validateStatus={ validate.username }
                    help={ help.username}
                >
                    <Input
                        prefix={<Icon type="user" style={{fontSize: 13}}/>}
                        placeholder="Username"
                        name = 'username'
                    />
                </FormItem>
                <FormItem
                    hasFeedback
                    validateStatus={ validate.password }
                    help={ help.password }
                >

                    <Input
                        prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                        type="password"
                        name = 'password'
                        placeholder="Password"
                    />
                    <p style = {{ color :'#f04134'}}>{ loginStatus || ''}</p>
                </FormItem>
                <FormItem>
                    <Checkbox>Remember me</Checkbox>
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                            loading={loading}
                    >
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        );
    }
}
function mapStateToProps(state){

    const {isAuthorized} = state.user_state
    return {
        isAuthorized
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        authorize: handleAuthorize,
        autoAuth: handleAutoAuth,
        logout: handleLogOut
    },dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))
