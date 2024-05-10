<template>
    <view class="story-index">
        <image mode="aspectFill" src="@/static/storyboard.png"></image>
       <view class="pass" @tap="pass">
           <text>跳过{{num}}s</text>
       </view>
    </view>
</template>

<script setup lang="ts">
import {forward} from "@/utils/router";
let intervalId = 0;
let num= ref(1)
onReady(()=> {
    intervalId = setInterval(()=>{
        num.value--
        if (num.value === 0){
            clearInterval(intervalId);
            forward('index');
        }
    },1*1000)
})
const pass =()=>{
    clearInterval(intervalId);
    forward('index');
}
</script>


<style scoped lang="scss">
.story-index{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .pass{
        position: absolute;
        box-sizing: border-box;
        right: 15px;
        top: 85px;
        height: 33px;
        background: rgba(0,0,0,0.30);
        border-radius: 20px;
        padding: 13px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text{
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-400;
            font-weight: 400;
            text-align: LEFT;
            color: #ffffff;
            line-height: 10px;
        }
    }
    image{
        width: 100%;
        height: 100%;

    }
}
</style>
