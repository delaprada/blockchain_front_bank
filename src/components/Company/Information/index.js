import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Alert, Descriptions, Badge, Table } from 'antd'
import { getPointsRecord } from '../../../api/request'
import '../../../style/style.css'

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            helpDocPath: '',
            privateKey: '',
            publicKey: '',
            address: null,
            blockChainIP: '',
            blockChainPort: null,
            authority: false,
            list: []
        };
    }

    componentWillMount() {
        // displayInfo().then(res => {
        //     if (res.status === 200) {
        //         console.log(res);
        //         if (res.data.data.authority === 1) {
        //             this.setState({authority: true});
        //         }

        //         this.setState({
        //             helpDocPath: res.data.data.helpDocPath,
        //             privateKey: res.data.data.privateKey,
        //             publicKey: res.data.data.publicKey,
        //             address: res.data.data.address,
        //             blockChainIP: res.data.data.BlockChainIP,
        //             blockChainPort: res.data.data.BlockChainPort
        //         })
        //     } else {
        //         console.log("请求出错！");
        //     }
        // }).catch(err => {
        //     console.log(err);
        // })

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

        const authority = this.state.authority;

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

        return (
            <div>
                {/* {authority ? 
                <Descriptions title="区块链文档信息" layout="vertical" bordered>
                    <Descriptions.Item label="帮助文档">
                        <a href={this.state.helpDocPath} style={{color: 'blue'}}>
                            {this.state.helpDocPath}
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="私钥">
                        {this.state.privateKey}
                    </Descriptions.Item>
                    <Descriptions.Item label="公钥">
                        {this.state.publicKey}
                    </Descriptions.Item>
                    <Descriptions.Item label="地址" span={3}>
                        {this.state.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="接入IP">
                        {this.state.blockChainIP}
                    </Descriptions.Item>
                    <Descriptions.Item label="接入端口号">
                        {this.state.blockChainPort}
                    </Descriptions.Item>
                </Descriptions>
                : <Alert message="请前往积分发行申请页 申请获得发放积分权限" type="error" />} */}
                <Table dataSource={this.state.list} columns={columns} style={{ width: '90%', fontSize: '16px' }} />
            </div>
        )
    }
}

export default withRouter(Information);