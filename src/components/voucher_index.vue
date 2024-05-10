<script setup lang="ts">
defineProps({
    toBusinessApply:Function,
    toVisitorApply:Function
})
</script>
<!--凭证首页 未申请-->
<template name="voucher_index">
    <view class="content">
        <view class="business">
            <image class="business-img" src="/static/index/icon-no-cert.png"></image>
<!--            <image class="business-img mini" src="/static/index/waitng-pass.png"></image>-->
<!--            <image class="business-img mini2" src="/static/index/apply-reject.png"></image>-->
<!--            首页-->
            <view>
                <text class="business-desc" :user-select="false">当前无凭证展示</text>
                <text class="business-desc" :user-select="false">入园预约成功后即可生成相关凭证</text>
            </view>
<!--        预约申请 待审核   -->
<!--            <view>-->
<!--                <text class="business-application" :user-select="false">预约申请已提交，请耐心等待</text>-->
<!--            </view>-->
            <button style="display: none" class="business-btn-detail" type="default">
                <text class="business-btn-text" :user-select="false">查看详情</text>
            </button>
            <button @tap="toBusinessApply" class="business-btn" type="default">
                <image class="business-btn-img" src="/static/index/business.png"></image>
                <text class="business-btn-text" :user-select="false">业务办理申请</text>
            </button>
            <button @tap="toVisitorApply" class="business-btn" type="default">
                <image class="business-btn-img" src="/static/index/visitor.png"></image>
                <text class="business-btn-text" :user-select="false">访客预约申请</text>
            </button>
        </view>
    </view>
</template>

<style scoped lang="scss">
    .business {
        padding: 20px;
        background: #ffffff;
        border-radius: 12px;

        &-img {
            margin: 32px auto 25px;
            display: block;
            width: 160px;
            height: 160px;
        }
        &-img.mini{
            width: 100px;
            height: 100px;
        }
        &-img.mini2{
            width: 84px;
            height: 84px;
        }
        &-desc {
            margin: 0 auto 5px;
            display: block;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-400;
            font-weight: 400;
            text-align: CENTER;
            color: #101828;
            line-height: 24.5px;
        }

        &-desc:last-child {
            margin-bottom: 30px;
        }

        &-btn,
        &-btn-detail {
            height: 44px;
            border: 1px solid #27a597;
            border-radius: 4px;
            background: #ffffff;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;

            &-img {
                width: 20px;
                height: 20px;
                margin-right: 10px;
            }

            &-text {
                height: 16px;
                font-size: 16px;
                font-family: Microsoft YaHei, Microsoft YaHei-400;
                font-weight: 400;
                text-align: CENTER;
                color: #101828;
                line-height: 16px;
            }

            &::after {
                border: 0px;
            }

            &:active {
                background: #27a5962b;
            }
        }

        &-btn:last-child {
            margin-bottom: 20px;
        }

        &-btn-detail {
            background: #27a597;

            .business-btn-text {
                color: #ffffff;
            }

            &:active {
                background: #27a59683;
                border: 1px solid #27a59683;
            }
        }

        &-application{
            margin: 0 auto 43px;
            display: block;
            height: 24.5px;
            font-size: 18px;
            font-family: Microsoft YaHei, Microsoft YaHei-700;
            font-weight: 700;
            text-align: CENTER;
            color: #101828;
            line-height: 24.5px;
        }
    }
</style>
