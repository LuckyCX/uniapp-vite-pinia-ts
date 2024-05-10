import { isDevelopment, isH5 } from './platform';
import { forward } from './router';
import { getCommonParams } from '@/config/commonParams';
import env from '@/config/env';
import { hideLoading, showLoading } from '@/config/serviceLoading';

function reject(err: { code: number; msg: string }) {
    const { msg = '服务异常，稍候片刻！',  code = -1 } = err;
    switch (code) {
        case 401:
            uni.showToast({
                title: msg
            });
            // 特殊异常处理
            forward('index');
            break;

        default:
            uni.showToast({
                title: msg
            });
            break;
    }
}

// h5环境开启代理
const apiBaseUrl = isH5 && isDevelopment ? env.apiBaseUrl : env.apiBaseUrl;

function baseRequest(
    method:
        | 'OPTIONS'
        | 'GET'
        | 'HEAD'
        | 'POST'
        | 'PUT'
        | 'DELETE'
        | 'TRACE'
        | 'CONNECT'
        | undefined,
    url: string,
    data: { isLoading: any },
    isFormPost?: boolean
) {
    return new Promise((resolve) => {
        showLoading(data.isLoading);
        const {token} = useStore('user')
        delete data.isLoading;
        // let responseData: unknown;
        const requestPatams = {
            url: apiBaseUrl + url,
            method,
            timeout: 60*1000,
            header: {
                'content-type': method === 'GET' ? 'application/json; charset=utf-8' : isFormPost ? 'application/x-www-form-urlencoded' : 'application/json',
            },
            data,
            success: (res: any) => {
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    if (res.data.code == 200) {
                        // responseData = res.data;
                        resolve(res.data)
                    } else {
                        reject(res.data);
                    }
                } else {
                    reject({
                        code: res.statusCode,
                        msg: '服务异常，稍候片刻！'
                    });
                }
            },
            fail: () => {
                reject({
                    code: -1,
                    msg: '网络不给力，请检查你的网络设置~'
                });
            },
            complete: (data) => {
                // console.log(data, 'data');
                // resolve(responseData);
                hideLoading();
            }
        }
        if(token.value){
            requestPatams.header['Authorization'] = 'Bearer '+token.value;
        }
        uni.request(requestPatams);
    });
}

const http = {
    get: <T>(api: string, params?: any,showLoading?:boolean | false) =>
        baseRequest('GET', api, {
            // ...getCommonParams(),
            isLoading:showLoading,
            ...params
        }) as Http.Response<T>,
    post: <T>(api: string, params: any) =>
        baseRequest('POST', api, {
            // ...getCommonParams(),
            isLoading:showLoading,
            ...params
        }) as Http.Response<T>,
    post_form: <T>(api: string, params: any) =>
        baseRequest('POST', api, {
            // ...getCommonParams(),
            isLoading:showLoading,
            ...params
        },true) as Http.Response<T>,
};

export const parseUrlWithParams = (url:string,params: object)=>{
    url += "?"
    Object.keys(params).forEach((key,index)=>{
        if(index === Object.keys(params).length-1){
            url += `${key}=${params[key]}`
        }else{
            url += `${key}=${params[key]}&`
        }
    })
    return url
}

export default http;
