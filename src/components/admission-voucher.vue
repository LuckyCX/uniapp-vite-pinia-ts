<!--入园凭证  凭证正常 凭证过期 凭证驳回 凭证未到时间-->
<template name="adminssionVoucher">
    <view class="content">
        <view class="business">
            <text class="business-title" :user-select="false">允许通行</text><!--not-time-->
            <image class="business-img" src="https://so1.360tres.com/t01e30f02495ad300da.jpg"></image>
            <view class="horizontal-box">
                <view class="horizontal-box-left"></view>
                <view class="horizontal-box-line"></view>
                <view class="horizontal-box-right"></view>
            </view>
            <view class="business-desc">
                <view class="text-desc">姓名：张三</view>
                <view class="text-desc">入园理由：送货</view>
                <view class="text-desc">同行人员：
                    <text class="text-desc-green">2人</text>
                    <view @tap="showPopup" class="text-desc-green right">
                        <uni-icons class="text-desc-icon" type="eye" size="16" color="#12b76a"></uni-icons>
                        查看详情&ensp;>
                    </view>
                </view>
                <view class="text-desc">公司名称：山东科技股份有限公司</view>
                <view class="text-desc">预约时间：2024-03-06 15:00-15:30</view>
                <view class="text-desc">凭证有效期：2024-03-06 18:00</view>
                <view class="business-btn-group">
                    <button @tap="toBusinessApply" class="business-btn" type="default">
                        <image class="business-btn-img" src="/static/index/business-white.png"></image>
                        <text class="business-btn-text" :user-select="false">业务办理申请</text>
                    </button>
                    <button @tap="toVisitorApply" class="business-btn" type="default">
                        <image class="business-btn-img" src="/static/index/visitor-white.png"></image>
                        <text class="business-btn-text" :user-select="false">访客预约申请</text>
                    </button>
                </view>
            </view>
        </view>

        <uv-popup ref="popup" mode='bottom' round="15" @change="change">
            <view  class="popup-container">
                <view class="popup-container-title">同行人员</view>
                <view v-for="item in 20">
                    <view class="popup-container-item">
                        <view class="popup-container-item-label">同行人{{ item }}</view>
                        <view class="popup-container-item-line"/>
                        <view class="popup-container-item-desc"><text class="label-left">姓名</text><text class="lebel-right">张三</text></view>
                        <view class="popup-container-item-desc"><text class="label-left">身份证号</text><text class="lebel-right">372222201110111111</text></view>
                    </view>
                </view>
            </view>
        </uv-popup>
    </view>
</template>
<script setup lang="ts">
defineProps({
    toBusinessApply:Function,
    toVisitorApply:Function
})
const popup = ref()
const showPopup = ()=>{
    uni.hideTabBar({
        animation:false,
        success:(result) =>{
            popup.value.open()
        }
    })
}
const change = (e)=>{
    if(!e.show){
        nextTick(()=>{
            uni.showTabBar()
        })
    }
}
</script>
<style scoped lang="scss">
    .business {
        margin-top: -11px;
        z-index: 2;
        padding: 20px;
        background: #ffffff;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-title{
            margin-top: 12px;
            width: 80px;
            height: 20px;
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-700;
            font-weight: 700;
            text-align: CENTER;
            color: #27a597;
            line-height: 20px;
        }
        &-title.not-time{
            color: #F04438;
        }
        &-img {
            margin: 16px auto 15px;
            display: block;
            width: 160px;
            height: 160px;
        }
        &-img.mini{
            width: 84px;
            height: 84px;
        }
        &-time{
            height: 14px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-400;
            font-weight: 400;
            text-align: CENTER;
            color: #12b76a;
            line-height: 14px;
        }
        .horizontal-box{
            display: flex;
            width: calc(100% + 40px);
            align-items: center;
            margin: 0;
            &-left{
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                width: 15px;
                height: 20px;
                background: #f3f4f6;
            }
            &-line{
                border-top: 1px ;
                border-bottom: 0;
                border-left: 0;
                border-right: 0;
                width: 100%;
                border-top-color: #0000001c;
                border-style: dashed;
                border-spacing: 10px;
            }
            &-right{
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
                width: 15px;
                height: 20px;
                background: #f3f4f6;
            }
        }
        &-desc{
            display: flex;
            flex-direction: column;
            width: 100%;
            .text-desc{
                display: flex;
                align-items: center;
                font-size: 14px;
                font-family: Microsoft YaHei, Microsoft YaHei-400;
                font-weight: 400;
                text-align: left;
                color: #101828;
                line-height: 28px;
                margin-bottom: 10px;
                .text-desc-green{
                    color:#12b76a ;
                    .text-desc-icon{
                        margin-right: 4px;
                    }
                }
                .text-desc-green.right{
                    display: flex;
                    align-items: center;
                    position: absolute;
                    right: 40px;
                    image{
                        margin-right: 5px;
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
        &-btn-group{
            display:flex;
            align-items: center;
            justify-content: space-between;
            .business-btn{
                height: 33px;
                border: 1px solid #27a597;
                border-radius: 4px;
                background: #27a597;
                margin: 0 0 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 7px;
                &-img {
                    width: 14px;
                    height: 14px;
                    margin-right: 5px;
                }

                &-text {
                    height: 14px;
                    font-size: 14px;
                    font-family: Microsoft YaHei, Microsoft YaHei-400;
                    font-weight: 400;
                    text-align: CENTER;
                    color: #FFFFFF;
                    line-height: 14px;
                }

                &::after {
                    border: 0px;
                }

                &:active {
                    background: #27a5962b;
                }
            }
        }
    }
    .popup-container{
            padding: 16px 32px;
            max-height: 60vh;
            overflow: scroll;
            &-title{
                display: flex;
                align-items: center;
                justify-content: center;
                background: #FFFFFF;
                height: 60px;
                margin-top: -30px;
                position: sticky;
                top: -18px;
                font-size: 18px;
                font-family: Microsoft YaHei, Microsoft YaHei-700;
                font-weight: 700;
                text-align: CENTER;
                color: #101828;
                line-height: 18px;
                margin-bottom: 18px;
            }
            &-item{
                height: 122px;
                background: #f2f4f7;
                border-radius: 8px;
                padding: 16px;
                box-sizing: content-box;
                margin-bottom: 18px;
                &-label{
                    height: 14px;
                    font-size: 14px;
                    font-family: Microsoft YaHei, Microsoft YaHei-400;
                    font-weight: 400;
                    text-align: LEFT;
                    color: #101828;
                    line-height: 14px;
                }
                &-desc{
                    display: flex;
                    margin-bottom: 7px;
                    align-items: center;
                    .label-left{
                        width: 70px !important;
                        font-size: 14px;
                        font-family: Microsoft YaHei, Microsoft YaHei-400;
                        font-weight: 400;
                        text-align: LEFT;
                        color: #667085;
                        line-height: 28px;
                        margin-right: 20px;
                    }
                    .label-right{
                        font-size: 14px;
                        font-family: Microsoft YaHei, Microsoft YaHei-600;
                        font-weight: 600;
                        text-align: LEFT;
                        color: #101828;
                        line-height: 28px;
                    }
                }
                &-line{
                    width: 100%;
                    height: 1px;
                    margin: 20px 0;
                    background: #d0d5dd;
                }
            }
        }
</style>
