<!--详情页组件-->
<template name="apply_details">
    <view style="margin-bottom: 70px">
        <uv-form labelPosition="top" :model="model" ref="form">
            <view class="apply-block">
                <view class="apply-block-info">
                    <view class="apply-block-info-left">
                        <text class="apply-block-title">古力娜扎提交的送货申请</text>
                        <text  class="apply-block-desc">YY20240307001</text>
                        <text class="success">审核通过</text>
                    </view>
                    <view class="apply-block-info-right">
<!--                        <image src="/static/index/add.png"></image>-->
                        <uv-icon name="account-fill" color="#f2f4f7" size="100"></uv-icon>
                    </view>
                </view>
            </view>
            <view class="apply-content-title">
                <text class="apply-content-title-text">审核信息</text>
            </view>
            <view class="apply-block">
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>预约单号</text>
                            </view>
                            <text class="form-desc">ADSH20230305006</text>
                        </view>
                    </template>
                </uv-form-item>
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>审核结果</text>
                            </view>
                            <text class="inform-reject">已驳回：今日关闭园区明日再开放</text>
                        </view>
                    </template>
                </uv-form-item>
            </view>
            <view class="apply-content-title">
                <text class="apply-content-title-text">个人信息</text>
            </view>
            <view class="apply-block">
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>姓名</text>
                            </view>
                            <text class="form-desc"></text>
                        </view>
                    </template>
                </uv-form-item>
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>联系方式</text>
                            </view>
                            <text class="form-desc"></text>
                        </view>
                    </template>
                </uv-form-item>
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>身份证号</text>
                            </view>
                            <text class="form-desc"></text>
                        </view>
                    </template>
                </uv-form-item>
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>所属公司名称</text>
                            </view>
                            <text class="form-desc"></text>
                        </view>
                    </template>
                </uv-form-item>
            </view>
            <view class="apply-content-title">
                <text class="apply-content-title-text">预约信息</text>
            </view>
            <view class="apply-block">
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>入园事由</text>
                            </view>
                            <text class="form-desc"></text>
                        </view>
                    </template>
                </uv-form-item>
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>预约时间</text>
                            </view>
                            <text class="form-desc"></text>
                        </view>
                    </template>
                </uv-form-item>
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>采购/领料单号</text>
                            </view>
                            <text class="form-desc"></text>
                        </view>
                    </template>
                </uv-form-item>
                <uv-form-item borderBottom>
                    <template #default>
                        <view class="apply-block-inline">
                            <view class="form-label">
                                <text>车牌号</text>
                            </view>
                            <text class="form-desc">1</text>
                            <view class="form-line"></view>
                            <text class="form-desc">2</text>
                        </view>
                    </template>
                </uv-form-item>
            </view>
            <view class="apply-content-title">
                <text class="apply-content-title-text">同行人</text>
            </view>
            <view class="apply-block">
               <view  class="apply-block-inline" style="margin-bottom: 16px;">
                   <text class="apply-block-inline-text">同行人1</text>
                   <view class="form-line" style="margin: 10px 0 6px"></view>
                   <uv-form-item borderBottom>
                       <template #default>
                           <view class="apply-block-inline">
                               <view class="form-label">
                                   <text>同行人员</text>
                               </view>
                               <text class="form-desc"></text>
                           </view>
                       </template>
                   </uv-form-item>
                   <uv-form-item borderBottom>
                       <template #default>
                           <view class="apply-block-inline">
                               <view class="form-label">
                                   <text>同行人员身份证号</text>
                               </view>
                               <text class="form-desc"></text>
                           </view>
                       </template>
                   </uv-form-item>
               </view>
            </view>
        </uv-form>
        <view class="add-buttons">
            <view @tap="modify" class="cancel-btn">
                <text>修改</text>
            </view>
            <view @tap="submit" class="disabled-btn">
                <text>撤销</text>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">
defineProps({
    model: Object,
})
</script>
<style scoped lang="scss">

.apply-content-title {
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .apply-content-title-text {
        height: 16px;
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-600;
        font-weight: 600;
        text-align: LEFT;
        color: #101828;
        line-height: 16px;
    }
}

.apply-block {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    &-info{
        display: flex;
        justify-content: space-between;
        &-left{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .apply-block-title{
                min-height: 20px;
                font-size: 20px;
                font-family: Microsoft YaHei, Microsoft YaHei-700;
                font-weight: 700;
                text-align: left;
                color: #101828;
                line-height: 30px;
            }
            .apply-block-desc{
                height: 16px;
                font-size: 16px;
                font-family: Microsoft YaHei, Microsoft YaHei-400;
                font-weight: 400;
                text-align: LEFT;
                color: #101828;
                line-height: 16px;
                margin-top: 16px;
            }

            @mixin apply-block-status{
                width: 66px;
                height: 24px;
                border-radius: 4px;
                padding: 5px;
                font-size: 14px;
                font-family: Microsoft YaHei, Microsoft YaHei-400;
                font-weight: 400;
                text-align: LEFT;
                line-height: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 16px;
            }
            .success{
                @include apply-block-status;
                background: rgba(18,183,106,0.16);
                color: #12b76a;
            }
            .reject{
                @include apply-block-status;
                background: rgba(240,68,56,0.16);
                color: #F04438;
            }
        }

        &-right{
            image{
                background: rgba(242, 244, 247, 0.37);
                width: 100px;
                height: 100px;
                border-radius: 3px;
            }
        }
    }
    &-inline{
        width: 100%;
        &-text{
            width: 55px;
            height: 16px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-600;
            font-weight: 600;
            text-align: LEFT;
            color: #27a597;
            line-height: 16px;
        }

        @mixin inFormStatus{
            width: 64px;
            height: 16px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-600;
            font-weight: 600;
            text-align: LEFT;
            line-height: 16px;
        }
        .inform-success{
            @include inFormStatus;
            color: #12b76a;
        }
        .inform-reject{
            @include inFormStatus;
            color: #F04438;
        }
        .form-label {
            width: 100%;
            margin-bottom: 16px;
            height: 14px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-400;
            font-weight: 400;
            text-align: LEFT;
            color: #475467;
            line-height: 14px;
            margin-top: 5px;
        }
        .form-desc{
            height: 16px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-600;
            font-weight: 600;
            text-align: LEFT;
            color: #101828;
            line-height: 16px;
        }
        .form-line{
            margin: 16px 0;
            border-bottom: 1px solid rgb(214, 215, 217);
            width: 100%;
            transform: scaleY(0.5);
            border-top-color: rgb(214, 215, 217);
            border-right-color: rgb(214, 215, 217);
            border-left-color: rgb(214, 215, 217);
        }
    }
}

.apply-block:last-child {
    margin-bottom: 0;
}

.add-buttons {
    position: fixed;
    width: 92vw;
    left: 0;
    bottom: 0;
    height: 60px;
    background: #ffffff;
    border: 0.5px solid #d0d5dd;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 5;

    @mixin text{
        height: 16px;
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-600;
        font-weight: 600;
        text-align: LEFT;
        line-height: 16px;
    }

    @mixin button{
        padding: 14px 60px;
        border-radius: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cancel-btn {
        @include button;
        background: #27a597;
        text {
           @include text;
            color: #ffffff;
        }
    }

    .submit-btn {
        @include button;
        border: 0.5px solid #27a597;
        text {
            @include text;
            color: #27a597;
        }
    }
    .disabled-btn {
        @include button;
        border: 1px solid #d0d5dd;
        text {
            @include text;
            color: #d0d5dd;
        }
    }
}

</style>
