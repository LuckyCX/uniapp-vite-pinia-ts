import universalApi from "@/api/universalApi";

export function getPhoneNumber(e) {
    const phoneCode = e.detail.code
    universalApi.getPhoneByCode({
        code:phoneCode,
    }).then(res=>{
        console.log(res);
    })
}
export const getLocationSetting = ()=>{
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                let setting = res.authSetting
                if(!setting['scope.userLocation']){
                    uni.authorize({
                        scope:'scope.userLocation',
                        success() {
                            resolve(1)
                        },
                        fail: function (error) {
                            console.error('获取精确位置失败111：', error);
                            reject()
                        }
                    })
                }
            },
            fail:function(result) {
                console.log(result);
            },
        })
    })
}
export const getWxLocation = ()=>{
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: 'gcj02', // 返回可以用于uni.openLocation的经纬度
            isHighAccuracy:true,
            success: function (res) {
                resolve({
                    longitude : res.longitude,
                    latitude : res.latitude,
                    covers : [{
                        id:1,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        width:45,
                        height:45,
                        iconPath: '../../static/index/location.png'
                    }]
                })
            },
            fail: function (error) {
                console.error('获取位置失败222：', error);
                reject()
            }
        });
    })
}


export const showGetLocationModel = ()=>{
    return new Promise((resolve) =>{
        uni.showModal({
            title: '提示',
            content: '您只有授权位置后，才能使用该小程序',
            success: function (res) {
                if (res.confirm) {
                    uni.openSetting({
                        success(res) {
                            console.log(res.authSetting)
                            let setting = res.authSetting
                            if(!setting['scope.userLocation']){
                            }else{
                                resolve(1)
                            }
                        }
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消');
                    uni.exitMiniProgram({
                        success: function () {
                            console.log('退出成功');
                        },
                        fail: function () {
                            console.log('退出失败');
                        }
                    });
                }
            }
        });
    })
}
