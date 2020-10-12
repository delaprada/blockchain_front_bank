import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd'
import { withRouter, Redirect } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import { signIn } from '../../api/request'
import { 
    Container,
    Content,
    Title,
    FormContent,
    Login,
    Register,
    Gap 
} from './style'
import '../../style/style.css'

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            userType: null,
            show: false,
            showMsg: false,
            redirect: false,
            failMsg: '',
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    formRef = React.createRef();

    componentWillMount() {
        // if (!this.state.redirect) {
        if (localStorage.getItem("userData")) {
            console.log("已经登陆过了");
            this.setState({ redirect: true });
            const userData = JSON.parse(localStorage.getItem("userData"));
            this.setState({ userType: userData.type });
        }
        // }
    }

    componentDidMount() {
        if (!this.state.redirect) {
            if (localStorage.getItem("username") && localStorage.getItem("password")) {
                this.formRef.current.setFieldsValue({
                    username: localStorage.getItem("username"),
                    password: localStorage.getItem("password")
                })
            }
        }
    }

    handleSignIn() {
        window.location.reload();
    }

    handleSignUp() {
        this.props.history.push("/signup");
    }

    render() {
        if (this.state.redirect) {
            // 如果已经登陆过了则直接跳转到相应页面
            switch (this.state.userType) {
                case 0:
                    return <Redirect to={'/person'} />;
                case 1:
                    return <Redirect to={'/company'} />;
                case 2:
                    return <Redirect to={'/bank'} />;
                default:
                    break;
            }
        }

        const onFinish = values => {
            console.log('Received values of form: ', values);

            signIn(values).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    if (res.data.success) {
                        axios.defaults.withCredentials = true; // axios携带cookie

                        // 服务端给前端传token来进行身份验证
                        // const token = res.data.token;
                        // localStorage.setItem('jwToken', token);

                        localStorage.setItem('userData', JSON.stringify(res.data.detail));

                        // 判断用户是否选择记住我
                        if (values.remember) {
                            localStorage.setItem('username', values.username);
                            localStorage.setItem('password', values.password);
                        } else {
                            localStorage.removeItem('username');
                            localStorage.removeItem('password');
                        }

                        // 如果cookie可以携带成功则不需要这部分
                        // if (token) {
                        //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        // } else {
                        //     delete axios.defaults.headers.common['Authorization'];
                        // }

                        this.setState({ show: true }, () => {
                            setTimeout(() => {
                                // 根据不同的身份跳转到不同的页面，从后台获取身份信息（从res中获取）
                                switch (res.data.detail.type) {
                                    case 0:
                                        this.props.history.push('/person');
                                        break;
                                    case 1:
                                        this.props.history.push('/company');
                                        break;
                                    case 2:
                                        this.props.history.push('/bank');
                                        break;
                                    default:
                                        break;
                                }
                            }, 800)
                        });
                    } else {
                        console.log(res.data.msg);

                        this.formRef.current.setFieldsValue({
                            username: '',
                            password: ''
                        });

                        this.setState({
                            showMsg: true,
                            failMsg: res.data.msg
                        }, () => {
                            setTimeout(() => {
                                this.setState({ showMsg: false });
                            }, 800)
                        });
                    }
                } else {
                    console.log('请求失败！');
                }
            }).catch((err) => {
                console.log(err);
            })
        };

        const show = this.state.show;
        const showMsg = this.state.showMsg;

        return (
            <Container>
                {show ? <Alert message="登陆成功！" type="success" showIcon style={{ position: 'fixed', top: 10 }} /> : null}
                {showMsg ? <Alert message={this.state.failMsg} type="error" showIcon style={{ position: 'fixed', top: 10 }} /> : null}
                <Content>
                    <Title>
                        <Login onClick={this.handleSignIn}>登陆</Login>
                        <Gap>·</Gap>
                        <Register onClick={this.handleSignUp}>注册</Register>
                    </Title>
                    <FormContent>
                        <Form
                            ref={this.formRef}
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登陆
                                </Button>
                            </Form.Item>
                        </Form>
                    </FormContent>
                </Content>
            </Container>
        )
    }
}

export default withRouter(Signin);