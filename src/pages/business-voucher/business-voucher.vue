<script setup lang="ts">
</script>
<!--业务凭证-->
<template>
    <view class="parent">
        <navbar background="transparent"></navbar>
        <view class="content">
            <view class="business">
                <text class="business-title" :user-select="false">送货</text>
                <view class="business-img">
                    <uv-qrcode  ref="qrcode" size="160px" value="https://www.baidu.com"></uv-qrcode>
                </view>
                <text class="business-time" :user-select="false">2024年3月6日 18:06:15</text>
                <view class="horizontal-box">
                    <view class="horizontal-box-left"></view>
                    <view class="horizontal-box-line"></view>
                    <view class="horizontal-box-right"></view>
                </view>
                <view class="business-desc">
                    <view class="text-desc">工单单号：20240307001</view>
                    <view class="text-desc">供应商名称：万宝电缆有限公司</view>
                    <view class="text-desc">姓名：张三</view>
                    <view class="text-desc">二维码有效期：
                        <text class="text-desc-time">2024-03-05 19:00</text>
                        <text>&ensp;前</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
    .content {
        .business {
            margin-top: -11px;
            z-index: 2;
            padding: 30px 20px 5px;
            background: #ffffff;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &-title{
                width: 80px;
                height: 20px;
                font-size: 20px;
                font-family: Microsoft YaHei, Microsoft YaHei-700;
                font-weight: 700;
                text-align: CENTER;
                color: #1d2939;
                line-height: 20px;
            }
            &-img {
                margin: 27px auto 25px;
                display: block;
                width: 160px;
                height: 160px;
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
                margin: 20px 0 13px;
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
                    font-size: 14px;
                    font-family: Microsoft YaHei, Microsoft YaHei-400;
                    font-weight: 400;
                    text-align: left;
                    color: #101828;
                    line-height: 28px;
                    margin-bottom: 10px;
                    .text-desc-time{
                        color:#fdb022 ;
                    }
                }
            }
        }
    }
</style>
