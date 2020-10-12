import React, { Component } from 'react'
import { Form, Input, Button, List, Table, Alert } from 'antd'
import { getPointsRecord, transferPoints, getBalance } from '../../../api/request'
import { withRouter } from 'react-router-dom'
import {
    DollarOutlined,
    ProfileOutlined,
} from '@ant-design/icons'
import {
    Container,
    Block,
    Title,
    BlockContent,
    Info
} from './style'
import '../../../style/style.css'

class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            list: [], // 积分变动记录
            point: null, //已有积分数
            show: false,
            showMsg: false,
            failMsg: ''
        }
    }

    formRef = React.createRef();

    componentWillMount() {
        // 获取已有积分数
        getBalance().then(res => {
            console.log(res);
            this.setState({ point: res.data.detail });
        }).catch(err => {
            console.log(err);
        });

        // 获取积分变动记录
        getPointsRecord().then(res => {
            console.log(res);
            this.setState({ list: res.data.detail });
        }).catch(err => {
            console.log(err);
        });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const onFinish = values => {
            transferPoints(values).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    // 清空转赠积分input内容
                    this.formRef.current.setFieldsValue({ username: '', amount: '' });

                    if (res.data.success) {
                        this.setState({ show: true }, () => {
                            // 获取积分变动记录
                            getPointsRecord().then(res => {
                                console.log(res);
                                this.setState({ list: res.data.detail });
                            }).catch(err => {
                                console.log(err);
                            });

                            // 重新加载积分变动记录
                            getBalance().then(res => {
                                console.log(res.data);
                                console.log("重新获取变动记录");
                                this.setState({ point: res.data.detail });
                            }).catch(err => {
                                console.log(err);
                            });

                            setTimeout(() => {
                                this.setState({ show: false });
                            }, 1000)
                        });
                    } else {
                        console.log(res.data.msg);
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
            })
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 20 },
        };

        const tailLayout = {
            wrapperCol: { offset: 6, span: 16 },
        };

        const columns = [
            {
                title: '发送方地址',
                dataIndex: 'senderAddress',
                key: 'senderAddress'
            },
            {
                title: '接收方地址',
                dataIndex: 'receiverAddress',
                key: 'receiverAddress'
            },
            {
                title: '积分数',
                dataIndex: 'amount',
                key: 'amount'
            },
            // {
            //     title: '时间',
            //     dataIndex: 'time',
            //     key: 'time'
            // }
        ];

        const show = this.state.show;
        const showMsg = this.state.showMsg;

        return (
            <Container>
                {show ? <Alert message="转赠成功！" type="success" showIcon style={{ position: 'fixed', top: 50, left: '50%' }} /> : ''}
                {showMsg ? <Alert message={this.state.failMsg} type="error" showIcon style={{ position: 'fixed', top: 50, left: '50%' }} /> : ''}
                <Block>
                    <Title>
                        <DollarOutlined /> 转赠积分
                    </Title>
                    <BlockContent>
                        <Form
                            {...layout}
                            ref={this.formRef}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                        >
                            <Info>
                                已有积分数: {this.state.point}分
                            </Info>
                            <Form.Item
                                label="请输入用户名"
                                name="username"
                                rules={[{ required: true, message: '请输入用户名!' }]}
                                style={{ display: 'inline-block', width: '350px' }}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="请输入转赠积分数"
                                name="amount"
                                rules={[{ required: true, message: '请输入转赠积分数!' }]}
                                style={{ display: 'inline-block', width: '380px' }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" className="transfer-button">
                                    确认转赠
                                </Button>
                            </Form.Item>
                        </Form>
                    </BlockContent>
                </Block>
                <Block>
                    <Title>
                        <ProfileOutlined /> 积分变动记录
                    </Title>
                    <BlockContent>

                        {/* <List
                            itemLayout="horizontal"
                            dataSource={this.state.list}
                            style={{ width: '90%', fontSize: '16px' }}
                            renderItem={item => (
                                <List.Item>
                                    <div>
                                        交易ID: {item.transformID}
                                    </div>
                                    <div>
                                        发送方: {item.senderUsername}
                                    </div>
                                    <div>
                                        接收方: {item.ReceiverUsername}
                                    </div>
                                    <div>
                                        {item.time}
                                    </div>
                                </List.Item>
                            )}
                        /> */}
                        <Table dataSource={this.state.list} columns={columns} style={{ width: '90%', fontSize: '16px' }} />
                    </BlockContent>
                </Block>
            </Container>
        )
    }
}

export default withRouter(Transfer);