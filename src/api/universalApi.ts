import http ,{parseUrlWithParams}from '@/utils/request';

const universalApi = {
    //获取用户信息
    getInfo: () => {
        return http.get('/reserve-api/wechat/getInfo')
    },
    //微信CODE登录
    loginByCode: (params) => {
        return http.post('/reserve-api/wechat/loginByCode', params)
    },
    //获取微信手机号
    getPhoneByCode: (params) => {
        return http.get('/reserve-api/wechat/getPhoneByCode', params)
    }
};

export default universalApi;
