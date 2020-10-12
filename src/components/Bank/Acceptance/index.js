import React, { Component } from 'react'
import { List, Button, } from 'antd'
import { withRouter } from 'react-router-dom'
import { getPublishApproveList, confirmPublishApproval } from '../../../api/request'
import { ButtonBlock, Title } from './style'
import '../../../style/style.css'

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditList: []
        };
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    componentWillMount() {
        getPublishApproveList().then(res => {
            this.setState({ creditList: res.data.list });
        }).catch(err => {

        })
    }

    handleConfirm() {
        console.log(`confirm${this.props.id}`);
        this.props.handleConfirm();
    }

    handleReject() {
        console.log(`reject${this.props.id}`);
        this.props.handleReject();
    }

    render() {
        return (
            <ButtonBlock>
                <Button type="primary" onClick={this.handleConfirm}>确认申请</Button>
                <Button type="danger" onClick={this.handleReject}>驳回申请</Button>
            </ButtonBlock>
        )
    }
}

class Acceptance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            companyList: [
                {
                    name: "三七互娱",
                    id: 1
                },
                {
                    name: "4399",
                    id: 2
                },
                {
                    name: '达实智能',
                    id: 3
                }
            ],
        };
    }

    componentWillMount() {
        getPublishApproveList().then(res => {
            if (res.status === 200) {
                this.setState({
                    creditList: res.data.detail
                })
                console.log(res);
            } else {
                console.log('请求出错！');
            }
        }).catch(err => {
            console.log(err);
        })


    }

    handleConfirm = (e, id) => {
        console.log('props confirm' + id);
        confirmPublishApproval(id, 1).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                if (res.data.success) {
                    // reload或重新加载列表
                    getPublishApproveList().then(res => {
                        if (res.status === 200) {
                            this.setState({
                                creditList: res.data.detail
                            });
                            console.log(res);
                        } else {
                            console.log('请求出错');
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    console.log(res.data.msg);
                    // reload或重新加载列表
                    getPublishApproveList().then(res => {
                        if (res.status === 200) {
                            this.setState({
                                creditList: res.data.detail
                            });
                            console.log(res);
                        } else {
                            console.log('请求出错');
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        });
    };

    handleReject = (e, id) => {
        console.log('props reject' + id);
        confirmPublishApproval(id, 2).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                // reload或重新加载列表
                getPublishApproveList().then(res => {
                    if (res.status === 200) {
                        this.setState({
                            creditList: res.data.detail
                        });
                        console.log(res);
                    } else {
                        console.log('请求出错！');
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                console.log('请求出错！');
            }
        }).catch(err => {
            console.log(err);
        });
    };


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        // const companyList = [
        //     {
        //         key: '1',
        //         name: "三七互娱",
        //         id: 111
        //     },
        //     {
        //         key: '2',
        //         name: "4399",
        //         id: 222
        //     },
        //     {
        //         key: '3',
        //         name: '达实智能',
        //         id: 333
        //     }
        // ];

        return (
            <div>
                <Title>
                    企业申请审理
                </Title>
                <List
                    bordered
                    dataSource={this.state.creditList}
                    style={{ margin: '30px 0 0 30px', width: '80%' }}
                    renderItem={(item) => (
                        <List.Item
                            style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}
                        >
                            {item.name}
                            <Buttons
                                id={item.id}
                                handleConfirm={(e) => this.handleConfirm(e, item.id)}
                                handleReject={(e) => this.handleReject(e, item.id)}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default withRouter(Acceptance);