import React, { Component } from 'react'
import { Table, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { getPointApproveList, confirmPointApproval } from '../../../api/request'
import { Title } from './style'
import '../../../style/style.css'

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            exchangeList: [],
        };
    }

    componentWillMount() {
        // 获取企业审理页列表
        getPointApproveList().then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({
                    exchangeList: res.data.detail
                });
            } else {
                console.log('请求出错！');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    handleApprove = (e, id) => {
        console.log(id);
        confirmPointApproval(id, 1).then(res => {
            if (res.status === 200) {
                // 重新获取企业审理页列表
                getPointApproveList().then(res => {
                    this.setState({
                        exchangeList: res.data.detail
                    });
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            } else {
                console.log('请求出错！');
            }
        }).catch(err => {

        })
    };

    handleReject = (e, id) => {
        console.log(id);
        confirmPointApproval(id, 2).then(res => {
            if (res.status === 200) {
                // 重新获取企业审理页列表
                getPointApproveList().then(res => {
                    if (res.status === 200) {
                        this.setState({
                            exchangeList: res.data.detail
                        })
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

        })
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const companyList = [
            {
                // key: '1',
                name: "三七互娱",
                amount: 10000,
                time: '2016-09-05 15:00'
            },
            {
                // key: '2',
                name: "4399",
                amount: 200000,
                time: '2016-09-05 15:00'
            },
            {
                // key: '3',
                name: '达实智能',
                amount: 200000,
                time: '2016-09-05 15:00'
            }
        ];

        const columns = [
            {
                title: '企业名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '申请兑换积分数',
                dataIndex: 'number',
                key: 'number'
            },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time'
            },
            {
                title: '',
                dataIndex: 'confirm',
                key: 'confirm',
                render: (text, record) => (
                    <div>
                        <Button type='primary' onClick={(e) => { this.handleApprove(e, record.id) }}>确认兑换</Button>
                        <span>   </span>
                        <Button type='danger' onClick={(e) => { this.handleReject(e, record.id) }}>驳回兑换</Button>
                    </div>

                )
            }
        ];

        return (
            <div>
                <Title>
                    企业申请审理
                </Title>
                <Table dataSource={this.state.exchangeList} columns={columns} style={{ margin: '30px 0 0 30px' }} />
            </div>
        )
    }
}

export default withRouter(Review);