/**
 * Created by DaGuo on 2017/5/4.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;

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
        const { onSubmit } = this.props
        onSubmit && onSubmit(username,password)
    };
    handleOnChange = e => {
        const name = e.target.name, value = e.target.value
        this.setState({
            [name]: value
        })
    };

    render() {
        const {validate = {}, help = {}} = this.state
        const { loginStatus } = this.props
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        );
    }
}
export default Login
