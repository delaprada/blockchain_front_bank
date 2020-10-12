import axios from 'axios'
const qs = require('qs')

const baseUrl = "http://39.108.172.77:8080"

// 携带cookie
axios.defaults.withCredentials = true;

// 登陆
export const signIn = (values) => {
    return axios.post(baseUrl + '/user/login_test', qs.stringify({
        user_name: values.username,
        password: values.password,
    }));
}

// 注册
export const signUp = (obj) => {
    return axios.post(baseUrl + '/user/regist_test', qs.stringify({
        type: obj.identity,
        user_name: obj.username,
        password: obj.password,
    }));
}

// 登出
export const logOut = () => {
    return axios.post(baseUrl + '/user/loginout');
}


// 登陆之后获取用户信息（头像，用户名, 积分数）
export const getPersonalInfo = () => {
    return axios.get(baseUrl + '/user/getlogin');
}

export const getBalance = () => {
    return axios.get(baseUrl + '/trans/b_enquiry');
}

// 积分转赠
export const transferPoints = (values) => {
    return axios.post(baseUrl + '/trans/gift', qs.stringify({
        username: values.username,
        amount: values.amount,
    }))
}

// 获取积分变动记录
export const getPointsRecord = () => {
    return axios.get(baseUrl + '/trans/transaction-record');
}

// 积分发放申请
export const applyForPublish = (values) => {
    return axios.post(baseUrl + '/request/applyget', qs.stringify({
        name: values.companyname,
        scale: values.scale,
        enterprise_email: values.email,
        enterprise_phonenumber: values.phonenumber,
        number: values.amount,
        type: 0,
    }))
}

// 积分兑换申请
export const applyForPoints = (values) => {
    return axios.post(baseUrl + '/request/applyget', qs.stringify({
        name: values.companyname,
        scale: values.scale,
        enterprise_email: values.email,
        enterprise_phonenumber: values.phonenumber,
        number: values.amount,
        type: 1,
    }))
}

// 企业提交申请后获取文档信息
// export const displayInfo = () => {
//     return axios.get(baseUrl + '/company-info');
// }

// 获取企业申请审理列表
export const getPublishApproveList = () => {
    return axios.get(baseUrl + '/request/getlist1');
}

// 确认授权/驳回申请
export const confirmPublishApproval = (id, agree) => {
    return axios.post(baseUrl + '/request/dealapply', qs.stringify({
        id: id,
        approve: agree
    }))
}

// 获取承兑积分列表
export const getPointApproveList = () => {
    return axios.get(baseUrl + '/request/exchangelist');
}

// 确认承兑
export const confirmPointApproval = (id, agree) => {
    return axios.post(baseUrl + '/request/dealapply', qs.stringify({
        id: id,
        approve: agree
    }))
}
