import React, { Component } from 'react'
import { Form, Input, Button, Radio, Alert } from 'antd'
import { withRouter } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { signUp } from '../../api/request.js'
import {
    Container,
    Content,
    Title,
    FormContent,
    Login,
    Register,
    Gap,
    RadioContent,
    Question
} from './style'
import '../../style/style.css'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            show: false,
            showMsg: false,
            failMsg: ''
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignIn() {
        this.props.history.push("/signin");
    };

    handleSignUp() {
        window.location.reload();
    };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {

        const onFinish = values => {
            // console.log('Received values of form: ', values);
            // console.log('username: ' + values.username);
            // console.log('password: ' + values.password);
            // console.log('password: ' + values.password_confirm);
            // console.log('identity: ' + this.state.value);

            const obj = Object.assign({}, values);
            obj.identity = this.state.value;
            console.log(obj);

            signUp(obj).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    if (res.data.success) {
                        this.setState({ show: true }, () => {
                            setTimeout(() => {
                                this.props.history.push('/signin');
                            }, 800)
                        });
                    } else {
                        console.log(res.data.msg);

                        // this.formRef.current.setFieldsValue({
                        //     username: '',
                        //     password: '',
                        //     password_confirm: ''
                        // });

                        this.setState({ showMsg: true }, () => {
                            setTimeout(() => {
                                this.setState({
                                    showMsg: false,
                                    failMsg: res.data.msg
                                });
                            }, 800);
                        });
                    }
                } else {
                    console.log('请求失败');
                }
            }).catch((err) => {
                console.log(err);
            })
        };

        const show = this.state.show;
        const showMsg = this.state.showMsg;

        return (
            <Container>
                {show ? <Alert message="注册成功！即将跳转到登陆界面" type="success" showIcon style={{ position: 'fixed', top: 10 }} /> : null}
                {showMsg ? <Alert message={this.state.failMsg} type="error" showIcon style={{ position: 'fixed', top: 10 }} /> : null}
                <Content>
                    <Title>
                        <Login onClick={this.handleSignIn}>登陆</Login>
                        <Gap>·</Gap>
                        <Register onClick={this.handleSignUp}>注册</Register>
                    </Title>
                    <RadioContent>
                        <Question>
                            请选择您的账户身份：
                        </Question>
                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                            <Radio value={0}>个人</Radio>
                            <Radio value={1}>企业</Radio>
                        </Radio.Group>
                    </RadioContent>
                    <FormContent>
                        <Question>
                            请填写您的基本信息：
                        </Question>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名/企业名/银行名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                                hasFeedback
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password_confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!'
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('两次输入的密码不一致!');
                                        }
                                    })
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请再次输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </FormContent>
                </Content>
            </Container>
        )
    }
}

export default withRouter(Signup);