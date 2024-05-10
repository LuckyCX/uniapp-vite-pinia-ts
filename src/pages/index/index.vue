<template>
    <view class="parent">
        <navbar background="tranparent"></navbar>
        <voucher_index :toBusinessApply="toBusinessApply" :toVisitorApply="toVisitorApply" class="max-width"/>
<!--        <admission-voucher :toBusinessApply="toBusinessApply" :toVisitorApply="toVisitorApply"  class="max-width"/>-->
        <view class="index_map">
            <map class="custom_map" :latitude="latitude" :longitude="longitude" :markers="covers" :enable-zoom="false" :enable-scroll="true" :enable-rotate="false"></map>
        </view>
        <view class="contact-info">联系电话：400-5463289</view>
        <view style="visibility: hidden">1</view>
    </view>
</template>
<script setup lang="ts">
import {forward} from "@/utils/router";
import AdmissionVoucher from "@/components/admission-voucher.vue";
import Voucher_index from "@/components/voucher_index.vue";
import universalApi from '@/api/universalApi';
import {getLocationSetting, getWxLocation,showGetLocationModel} from "@/hooks/getWXUserInfo";
const toBusinessApply = ()=>{
    forward('businessApply');
}

const toVisitorApply = ()=>{
    forward('visitorApply');
}
const latitude = ref()
const longitude = ref()
const covers= ref()
const isLogin = ref(false)
onReady(()=>{
    // universalApi.getInfo().then(res=>{
    //     console.log(res);
    // })
    userLogin();
})
onShow(() => {
    uni.getSetting({
        success(res) {
            let setting = res.authSetting
            console.log(setting);
            if(setting['scope.userInfo'] && isLogin.value){
                getWxLocationSetting()
            }
        },
        fail:function(result) {
            console.log(result);
        },
    })
});

const getWxLocationSetting = ()=>{
    getLocationSetting().then(()=>{
        getLocation()
    }).catch(()=>{
        showModel()
    })
}

const getLocation =()=>{
    getWxLocation().then(res=>{
        longitude.value = res.longitude
        latitude.value =res.latitude
        covers.value =res.covers
    }).catch(()=>{
        showModel()
    })
}

const showModel = ()=>{
    showGetLocationModel().then(res=>{
        getLocation()
    })
}


const userLogin = ()=>{
    uni.login({
        provider: 'weixin',
        success: (loginRes) => {
            console.log(loginRes);
            let code = loginRes.code;
            universalApi.loginByCode({
                code:code,
                phoneCode:code
            }).then(res=>{
                console.log(res);
                getWxLocationSetting();
                const {setUserInfo} = useStore('user')
                setUserInfo({
                    token:res.token,
                })
                isLogin.value = true;
            }).catch(e=>{
                console.log(e);
            })
        },
        fail: (error) => {
            console.error('登录失败:', error);
        }
    });
}
</script>

<style scoped lang="scss">
.index_map{
    width: calc(100vw - 40px);
    box-sizing: border-box;
    height: 320px;
    border: 1px solid #FFFFFF;
    border-radius: 16px;
    margin-bottom: 5px;
    position: relative;
    .custom_map{
        border-radius: 16px;
        width: 100%;
        height: 300px;
        z-index: 1;
    }
    .custom_map_cover{
        z-index: 2;
        position: absolute;
        background: black;
        top: 0;
        border-radius: 16px;
        width: 100%;
        height: 300px;
    }
}
.contact-info{
    height: 21px;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-400;
    font-weight: 400;
    text-align: CENTER;
    color: #475467;
    line-height: 21px;
    margin-bottom: 10px;
}
/* #ifdef MP-WEIXIN */
.contact-info{
    margin-bottom: 30px;
}
/* #endif */

</style>
