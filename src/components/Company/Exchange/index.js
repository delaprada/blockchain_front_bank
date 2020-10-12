import React, { Component } from 'react'
import { Form, Input, Button, Select, Alert } from 'antd'
import { withRouter } from 'react-router-dom'
import { applyForPoints, getBalance } from '../../../api/request'
import { Title, ContentBlock, Info } from './style'
import '../../../style/style.css'

const { Option } = Select;

class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            amount: null,
            show: false,
            showMsg: false,
            failMsg: ''
        };
    }

    formRef = React.createRef();

    componentWillMount() {
        // 获取企业已有积分数
        getBalance().then(res => {
            console.log(res);
            this.setState({ amount: res.data.detail });
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.formRef.current.setFieldsValue({
            scale: '1'
        })
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const onFinish = values => {
            console.log('Success:', values);
            // 提交积分兑换申请
            applyForPoints(values).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    if (res.data.success) {
                        this.setState({ show: true });
                        this.formRef.current.setFieldsValue({
                            companyname: '',
                            scale: '1',
                            email: '',
                            phonenumber: null,
                            amount: null,
                        });
                        setTimeout(() => {
                            this.setState({ show: false });
                        }, 1500);
                        getBalance().then(res => {
                            console.log(res);
                            console.log("重新获取积分数");
                            this.setState({ amount: res.data.detail });
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        this.setState({
                            showMsg: true,
                            failMsg: res.data.msg
                        }, () => {
                            this.setState({ showMsg: false });
                        })
                    }
                } else {
                    console.log("请求出错！");
                }
            }).catch((err) => {
                console.log(err);
            });
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };

        const show = this.state.show;
        const showMsg = this.state.showMsg;

        return (
            <div>
                {show ? <Alert message="申请成功！" type="success" showIcon style={{ position: 'fixed', top: 50, left: '50%' }} /> : ''}
                {showMsg ? <Alert message={this.state.failMsg} type="danger" showIcon style={{ position: 'fixed', top: 50, left: '50%' }} /> : ''}
                <Title>
                    积分兑换申请
                    <Info>
                        已有积分数：{this.state.amount}分
                    </Info>
                </Title>
                <ContentBlock>
                    <Form
                        ref={this.formRef}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ width: '40%' }}
                    >
                        <Form.Item
                            label="请填写企业名称"
                            name="companyname"
                            rules={[{ required: true, message: '请填写企业名称!' }]}
                            style={{ marginBottom: '50px' }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="请选择企业规模"
                            name="scale"
                            rules={[{ required: true, message: '请选择企业规模!' }]}
                            style={{ marginBottom: '50px' }}
                        >
                            <Select initialValues="1" style={{ width: '100%' }} onChange={this.handleChange}>
                                <Option value="1">100以下</Option>
                                <Option value="2">100之至1000</Option>
                                <Option value="3">1000至10000</Option>
                                <Option value="4">10000以上</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="企业联系人邮箱"
                            name="email"
                            rules={[
                                {
                                    required: true, message: '请输入企业联系人邮箱!'
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                    message: '请输入正确邮箱格式!'
                                }
                            ]}
                            style={{ marginBottom: '50px' }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="企业联系人电话"
                            name="phonenumber"
                            rules={[
                                {
                                    required: true, message: '请输入企业联系人电话!'
                                },
                                {
                                    pattern: /^1[0-9]{10}$/,
                                    message: '请输入正确的电话号码!'
                                }
                            ]}
                            style={{ marginBottom: '50px' }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="请填写要兑换的积分数"
                            name="amount"
                            rules={[
                                {
                                    required: true, message: '请填写要兑换的积分数!'
                                },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: '请输入正确的积分数!'
                                }
                            ]}
                            style={{ marginBottom: '50px' }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{ width: '50%' }}>
                                提交申请
                            </Button>
                        </Form.Item>
                    </Form>
                </ContentBlock>
            </div>
        )
    }
}

export default withRouter(Exchange);