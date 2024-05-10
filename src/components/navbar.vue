<script setup lang="ts">
import {back, forward} from "@/utils/router";
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    background: {
        type: String,
        default: '#FFFFFF',
    },
    titleLeft: {
        type: Boolean,
        default: false,
    },
    showBack: {
        type: Boolean,
        default: false,
    },
    fontColor:{
        type: String,
    }
});

const geStatusBarHeight = () => {
    let a = uni.getSystemInfoSync()["statusBarHeight"];
    return a;
};
const getNavBarHeight = () => {
    let navbarHeight = 44;
    // #ifdef MP-WEIXIN
    let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    navbarHeight =
        menuButtonInfo.height +
        (menuButtonInfo.top - uni.getSystemInfoSync()["statusBarHeight"]) * 2 +
        2;
    // #endif

    return navbarHeight;
};
const navigateBack = () => {
    back(1);
};

const getStyle = reactive({
    background: props.background
})
</script>

<template name="navbar">
    <view class="navbar">
        <view class="common-page-head" :style="getStyle">
            <view :style="{ height: geStatusBarHeight() + 'px' }"></view>
            <view
                class="common-page-head-inline"
                :style="{ height: getNavBarHeight() + 'px' }"
                :class="[titleLeft ? 'title-left' : '',showBack?'showBack':'']"
            >
                <uni-icons  @tap="navigateBack()" class="nav-back" v-if="showBack" type="left" size="22" :color="fontColor"></uni-icons>
                <view  @tap="navigateBack()" class="common-page-head-inline-title" :style="fontColor?'color:'+fontColor:''">{{ title }}</view>
            </view>
        </view>
        <view :style="{ height: geStatusBarHeight() + getNavBarHeight() + 'px' }"></view>
    </view>
</template>

<style scoped lang="scss">
</style>
