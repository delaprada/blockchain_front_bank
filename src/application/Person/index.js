import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Tag } from 'antd'
import { renderRoutes } from 'react-router-config'
import { withRouter, Redirect } from 'react-router-dom'
import { getPersonalInfo, logOut } from '../../api/request'
import { Avatar } from './style'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DollarOutlined,
} from '@ant-design/icons';
import '../../style/style.css'

const { Header, Sider, Content } = Layout;

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            selectItem: ['1'],
            account: '用户名',
            avatar: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
            redirect: false,
            chain_id: null,
        };
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentWillMount() {

        if (localStorage.getItem("userData")) {
            console.log("userData exists");
            const userData = JSON.parse(localStorage.getItem("userData"));
            if (userData.type !== 0) {
                this.setState({ redirect: true });
            }
        } else {
            this.setState({ redirect: true });
        }

        // 获取用户信息
        getPersonalInfo().then(res => {
            console.log("获取用户信息成功");
            if (res.status === 200) {
                if (res.data.success) {
                    console.log(res);
                    console.log(res.data.msg);
                    this.setState({
                        account: res.data.detail.user_name,
                        avatar: res.data.detail.profile_photo,
                        chain_id: res.data.detail.chain_id
                    });
                } else {
                    console.log(res.data.msg);
                }
            } else {
                console.log('请求出错');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    handleClick = e => {
        if (e.key === '1') {
            this.props.history.push('/person/transfer');
        }
    };

    handleLogOut() {
        localStorage.setItem("userData", "");

        logOut().then(res => {
            if (res.status === 200) {
                if (res.data.success) {
                    console.log(res.data.msg);
                    this.props.history.push('/');
                } else {
                    console.log(res.data.msg);
                }
            } else {
                console.log("请求出错！");
            }
        }).catch(err => {
            console.log(err);
        })
        // localStorage.clear();
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { route } = this.props;

        const menu = (
            <Menu>
                <Menu.Item onClick={this.handleLogOut}>
                    退出登陆
                </Menu.Item>
            </Menu>
        );

        if (this.state.redirect) {
            if (!localStorage.getItem("userData")) {
                return <Redirect to={'/'} />;
            }

            const userData = JSON.parse(localStorage.getItem("userData"));
            if (userData.type === 1) {
                return (<Redirect to={'/company'} />)
            } else if (userData.type === 2) {
                return (<Redirect to={'/bank'} />)
            }
        }

        return (
            <Layout style={{ height: '100vh' }}>
                <Sider theme='light' trigger={null} collapsible collapsed={this.state.collapsed} >
                    <div className="logo" />
                    <Menu onClick={this.handleClick} mode="inline" defaultSelectedKeys={this.state.selectItem}>
                        <Menu.Item key="1" icon={<DollarOutlined />}>
                            积分转赠
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" >
                    <Header className="site-layout-background" style={{ paddingLeft: 10, paddingRight: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <Avatar>
                            <Dropdown overlay={menu}>
                                <img src={this.state.avatar} alt="" style={{ width: 25, height: 25, marginRight: 10, borderRadius: 12 }} />
                            </Dropdown>
                            <span style={{ marginRight: '10px' }}>{this.state.account}</span>
                            <Tag color="cyan">{this.state.chain_id}</Tag>
                        </Avatar>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: '',
                        }}
                    >
                        {renderRoutes(route.routes)}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Person);