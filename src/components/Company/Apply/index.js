import React, { Component } from 'react'
import { Form, Input, Button, Select, Alert } from 'antd'
import { withRouter } from 'react-router-dom'
import { applyForPublish } from '../../../api/request'
import { ContentBlock, Title } from './style'
import '../../../style/style.css'

const { Option } = Select;

class Apply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            show: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    formRef = React.createRef();

    // componentDidMount阶段才能对dom进行修改
    componentDidMount() {
        this.formRef.current.setFieldsValue({
            scale: '1'
        })
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        const onFinish = values => {
            console.log('Success:', values);
            // 提交积分发放申请
            applyForPublish(values).then((res) => {
                this.setState({ show: true });

                if (res.status === 200) {
                    console.log(res);
                    // 清空input内容
                    this.formRef.current.setFieldsValue({
                        companyname: '',
                        scale: '1',
                        email: '',
                        phonenumber: null,
                        amount: null,
                    })
                    setTimeout(() => {
                        this.setState({ show: false });
                    }, 800)
                } else {
                    console.log('请求出错！');
                }
            }).catch((err) => {
                console.log(err);
            })
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };

        const show = this.state.show;

        return (
            <div>
                {show ? <Alert message="申请成功！" type="success" showIcon style={{ position: 'fixed', top: 50, left: '50%' }} /> : ''}
                <Title>
                    积分发放申请
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
                            label="申请发行积分数"
                            name="amount"
                            rules={[
                                {
                                    required: true, message: '请填写申请发行积分数!'
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

export default withRouter(Apply);