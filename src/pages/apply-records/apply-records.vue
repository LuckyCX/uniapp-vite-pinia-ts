<template>
    <view class="parent-gradient">
        <navbar title="预约记录" background="transparent"></navbar>
        <view class="content">
            <uv-tabs :list="list" @click="click"
                     lineColor="#27A597"
                     lineWidth="30"
                     :scrollable="false"
                     :activeStyle="{color: '#303133',fontWeight: 'bold',transform: 'scale(1.05)'}"
                     :inactiveStyle="{color: '#606266',transform: 'scale(0.9)'}"
                     itemStyle="padding-left: 0px; padding-right: 0px; height: 44px;"
            ></uv-tabs>
            <scroll-view show-scrollbar="false" scroll-y="true" class="scroll-Y"
                         refresher-enabled="true"
                         :refresher-triggered="triggered"
                         :refresher-threshold="100"
                         refresher-background=""
                         @refresherrefresh="onRefresh"
                         @refresherrestore="onRestore"
                         @scrolltolower="onToLower"
            >
                <view @tap="toDetails(item)" v-for="item in 10" class="records-container">
                    <view :class="getType">审核中</view>
                    <view class="records-desc">
                        <text class="desc-left">入园事由</text>
                        <text class="desc-right">送货</text>
                    </view>
                    <view class="records-desc">
                        <text class="desc-left">预约时间</text>
                        <text class="desc-right">2024-03-21　09:00~11:30</text>
                    </view>
                    <view class="records-desc">
                        <text class="desc-left">同行人员</text>
                        <text class="desc-right">张三</text>
                    </view>
                    <view class="records-desc">
                        <text class="desc-left">发起时间</text>
                        <text class="desc-right">2024-03-21　07:23:12</text>
                    </view>
                    <view class="records-desc">
                        <text class="desc-left">驳回原因</text>
                        <text class="desc-right color-red">驳回原因</text>
                    </view>
                </view>
                <uni-load-more v-if="showLoadMore" status="loading"></uni-load-more>
            </scroll-view>
        </view>
    </view>
</template>

<script setup lang="ts">
import {useInit} from "@/hooks/useInit";
import {forward} from "@/utils/router";

const recordType=ref(4)
const getType = computed(()=>{
    switch (recordType.value) {
        case 1:
            return 'record-success';
        case 2:
            return 'record-error';
        case 3:
            return 'record-back';
        case 4:
            return 'record-warn';
    }
})
const list = ref([{
    name: '全部',
}, {
    name: '待审核',
}, {
    name: '审核通过'
}, {
    name: '已驳回'
}, {
    name: '已撤销'
}])
const click = item => {
    console.log(item);
}
const _freshing = ref(false)
const triggered = ref(false)
const onRefresh=()=> {
    if (_freshing.value) return;
    _freshing.value = true;
    triggered.value = true;
    setTimeout(() => {
        triggered.value = false;
        _freshing.value = false;
    }, 1000)
}
const onRestore=() =>{
    console.log("onRestore");
}
const showLoadMore = ref(false)
const onToLower=()=>{
    if(showLoadMore.value) return;
    showLoadMore.value = true
    setTimeout(() => {
        showLoadMore.value = false
    }, 1000)
}
const toDetails = item=>{
    console.log(item);
    forward('businessApply',{isDetials:'1'})
    // forward('visitorApply');
}
onLoad(() => {
    const { pageName, pagePath, pageQuery } = useInit();
    console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
});
</script>


<style scoped lang="scss">
.scroll-Y{
    height: calc(100vh - 180px);
    margin-top: 16px;
    .records-container{
        background: #ffffff;
        border-radius: 8px;
        padding: 10px 16px;
        box-sizing: content-box;
        margin-top: 16px;
        .records-desc{
            display: flex;
            align-items:flex-start ;
            .desc-left{
                flex: 1;
                font-size: 14px;
                font-family: Microsoft YaHei, Microsoft YaHei-400;
                font-weight: 400;
                text-align: LEFT;
                color: #667085;
                line-height: 28px;
            }
            .desc-right{
                flex: 3;
                font-size: 14px;
                font-family: Microsoft YaHei, Microsoft YaHei-600;
                font-weight: 600;
                text-align: LEFT;
                color: #101828;
                line-height: 28px;
            }
            .desc-right.color-red{
                color:#F04438
            }
        }
        @mixin record-type{
            margin-right: 0;
            margin-left: auto;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 66px;
            height: 24px;
            margin-bottom: -24px;
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-400;
            font-weight: 400;
            line-height: 14px;
        }
        .record-success{
            @include record-type;
            background: rgba(18,183,106,0.16);
            color: #12B76A;
        }
        .record-error{
            @include record-type;
            background: rgba(240,68,56,0.16);
            color: #F04438;
        }
        .record-back{
            @include record-type;
            background: rgba(152,162,179,0.16);
            color: #D0D5DD;
        }
        .record-warn{
            @include record-type;
            background: rgba(253,176,34,0.16);
            color: #FDB022;
        }
    }
    .records-container:first-child{
        margin-top: 0;
    }
}
</style>
