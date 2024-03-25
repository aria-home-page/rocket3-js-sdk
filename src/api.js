import Axios from 'axios';
import { HOST_API, ACCESS_TOKEN_ITEM_NAME } from 'src/constants';
// import FormData from 'form-data';

export const axiosInstance = Axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem(ACCESS_TOKEN_ITEM_NAME)
    if (token) {
        return {
            ...config,
            headers: {
                ...config.headers,
                'Authorization': token
            }
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

export const updateAuth = (accessToken) => {
    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axiosInstance.defaults.headers.common.Authorization = `${accessToken}`;
}

export const disconnectX = () => {
    localStorage.removeItem('jwt_token');
    axiosInstance.get('/api/user/login/v1/logout');
    return Promise.resolve();
}

//获取twitter 重定向url
export const connectX = () => {
    return axiosInstance.get('/api/user/login/v1/twitter?businessType=0').then(ret => {
        window.location.href = ret.data?.data;
        return ret.data;
    })
}
//twitter  call_back 成功
export const connectXCallback = (oauth_token, oauth_verifier) => {
    return axiosInstance.post('/api/user/login/v1/call_back/twitter', { oauth_token, oauth_verifier }).then(ret => {
        if (ret?.data?.token && ret?.code === 200) {
            localStorage.setItem(ACCESS_TOKEN_ITEM_NAME, ret.data.token);
        }
        return ret.data;
    })
}

//获取用户信息 
export const getUserInfo = () => {
    return axiosInstance.get('/api/aria/v1/user/info').then(ret => {
        return ret.data
    });
}

//Newbie任务列表
export const getNewbieTaskList = () => {
    return axiosInstance.get('/api/activity/v1/newbie/tasks').then(ret => {
        // console.log('[debug]getNewbieTasks',ret.data);
        return ret.data;
    })
}
//Daily任务列表
export const getDailyTaskList = () => {
    // return axiosInstance.get(`/api/activity/v1/daily/activity/${id}/tasks`).then(ret=>{
    return axiosInstance.get(`/api/activity/v1/daily/tasks`).then(ret => {
        // console.log('[debug]getDailyTasks', ret.data);
        return ret.data;
    })
}

// 验证任务
export const verifyTask = (activityId, taskInfoId) => {
    // return axiosInstance.get(`/api/activity/v1/daily/activity/${id}/tasks`).then(ret=>{
    return axiosInstance.post(`/api/activity/v1/socialMedia/task/common/verify/${activityId}/${taskInfoId}`).then(ret => {
        return ret.data;
    })
}

// const replyTwitterId = '1758521788617965740'

//获取推特评论信息
export const getTwitterComment = (tweetid) => {
    return axiosInstance.get(`/api/activity/v1/generate/reply?tweetId=${tweetid}`)
        .then(ret => ret.data);
}

//发送推特
export const postTwitterComment = (activityId, taskInfoId, postText, replyId) => {
    // const replyId = replyTwitterId;
    return axiosInstance.post('/api/activity/v1/socialMedia/post/tweet', { activityId, taskInfoId, postText, replyId }).then(ret => ret.data);
}

//获取签名msg
export const getSignMessage = (chainId, address) => {
    return axiosInstance.post('/api/aria/v1/sign/walletconnect', {
        chainId, address
    }).then(ret => ret.data)
}
//首次登陆成功设置邀请码
export const setInvitationCode = (code) => {
    return axiosInstance.post('/api/aria/v1/user/set/invitation/code', { code }).then(ret => ret.data);
}

//绑定验证签名
export const bindSignature = (keyId, signature) => {
    return axiosInstance.post('/api/aria/v1/bind/verify/sign/walletconnect', { keyId, signature }).then(ret => ret.data);
}

//discord 授权完成回调绑定
export const discordCallback = (code, state, error) => {
    return axiosInstance.post('/api/aria/v1/bind/discord', { code, state, error }).then(ret => ret.data);
}
//获取第三方授权url
export const socialMediaAuthorize = (type) => {
    return axiosInstance.get(`/api/activity/v1/socialMedia/authorize/${type || 'discord'}`).then(ret => ret.data);
}


// 第三方回调
export const socialMediaCallBack = (type, oauth_token, oauth_verifier) => {
    return axiosInstance.post(`/api/activity/v1/socialMedia/call_back/${type}`, { oauth_token, oauth_verifier }).then(ret => ret.data);
}

// Get sign for web3 wallet connect
export const getSign = (taskId) => {
    return axiosInstance.post('/api/activity/v1/sign/get_sign', { taskId }).then(ret => ret.data);
}

// Remove social bind
export const removeBind = (type) => {
    return axiosInstance.post(`/api/aria/v1/remove/bind/${type}`, {}).then(ret => ret.data);
}

// Sign notice
export const signNotice = (taskId, hash) => {
    return axiosInstance.post('/api/activity/v1/sign/notice', { taskId, hash }).then(ret => ret.data);
}

// Query social media authorize info
export function socialMediaAuthorizeInfo() {
    return axiosInstance.get(`/api/activity/v1/socialMedia/authorize/info`).then(ret => ret.data)
}

// Logout
export function logout() {
    localStorage.removeItem(ACCESS_TOKEN_ITEM_NAME);
}