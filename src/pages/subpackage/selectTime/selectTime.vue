<template>
    <view class="parent">
        <navbar background="#FFFFFF" show-back title-left title="预约时间"></navbar>
        <view class="content">
            <uv-input @tap="showCalendar()"  disabled disabledColor="#ffffff"
                      placeholder="请选择日期" border="surround" v-model="value"
                      customStyle="height: 22px;border: 1px solid #d0d5dd;border-radius: 8px;margin-bottom:16px">
                <template v-slot:suffix>
                    <uv-icon color="#27A597" name="calendar" size="26"></uv-icon>
                </template>
            </uv-input>
            <view class="time-title">
                <text class="time-title-img" ></text><text>上午</text>
            </view>
            <view class="time-box">
                <view v-for="item in timeArray.morning" class="time-box-item" :class="[item.isBooking?'disable':'',item.selected?'selected':'']" @tap="changeTime(item)">
                    <text class="time-box-item-text" >{{ item.time[0]+'-'+item.time[1] }}</text>
                </view>
            </view>
            <view class="time-title">
                <text class="time-title-img" ></text><text>下午</text>
            </view>
            <view class="time-box">
                <view v-for="item in timeArray.afternoon" class="time-box-item" :class="[item.isBooking?'disable':'',item.selected?'selected':'']" @tap="changeTime(item)">
                    <text class="time-box-item-text" >{{ item.time[0]+'-'+item.time[1] }}</text>
                </view>
            </view>
            <uv-calendar ref="calendar" @confirm="confirm" color="#27A597" :maxDate="maxDate"></uv-calendar>
            <button class="submit-btn" @tap="selectTime"><text>确定</text></button>
        </view>
    </view>
</template>

<script setup lang="ts">
import {useInit} from "@/hooks/useInit";
import moment from 'moment'
import {back} from "@/utils/router";
const morningArray = [['8:00','8:30'],['8:30','9:00'],['9:00','9:30'],['9:30','10:00'],['10:00','10:30'],['10:30','11:00'],['11:00','11:30'],['11:30','12:00']]
const afternoonArray = [['13:30','14:00'],['14:00','14:30'],['14:30','15:00'],['15:00','15:30'],['15:30','16:00'],['16:00','16:30'],['16:30','17:00'],['17:00','17:30'],['17:30','18:00']]
onLoad(() => {
    const {pageName, pagePath, pageQuery} = useInit();
    pageType.value = pageQuery.key
    timeArray.value={
        morning:morningArray.map((item,index)=>{
            return {
                time:item,
                isBooking:index===1?true:false,
                selected:false,
            }
        }),
        afternoon:afternoonArray.map((item,index)=>{
            return {
                time:item,
                isBooking:index===1?true:false,
                selected:false,
            }
        })
    }
});
const pageType = ref()
const value = ref(moment().format('YYYY-MM-DD'))
const calendar =ref()
const calendarDate =ref(moment().format('YYYY-MM-DD'))
const showCalendar = ()=>{
    calendar.value.open()
}
const confirm =(e)=> {
    resetSelect()
    calendarDate.value = e[0]
    value.value = e[0]
}
const changeTime= (time)=>{
    if(time.isBooking) return
    resetSelect()
    time.selected = true
}
const resetSelect=()=>{
    timeArray.value.morning.map(item=>{
        item.selected=false
    })
    timeArray.value.afternoon.map(item=>{
        item.selected=false
    })
}
const timeArray=ref()
const maxDate = computed(()=>{
    return moment().add(30, 'days').format('YYYY-MM-DD')
})
const selectTime = ()=>{
    let times = timeArray.value.morning.filter(item=>item.selected)
    if(!times.length){
        times = timeArray.value.afternoon.filter(item=>item.selected)
    }
    if(!times.length){
        uni.showToast({
            title: '请选择时间',
            icon: 'none',
            duration: 2000
        });
        return
    }else{
        let time = times[0].time[0]+'-'+times[0].time[1]
        uni.$emit(pageType.value,{msg:calendarDate.value+' '+time})
        back(1)
    }
}
</script>


<style scoped lang="scss">
.parent{
    background: #ffffff;
    .uni-input-placeholder{
        font-size: 15px;
        font-family: Microsoft YaHei, Microsoft YaHei-400;
        font-weight: 400;
        text-align: LEFT;
        color: #d0d5dd;
        line-height: 15px;
    }
    .time-title{
        display: flex;
        .time-title-img{
            width: 8px;
            height: 16px;
            background: linear-gradient(180deg,#27a597, rgba(39,165,151,0.10) 100%);
            margin-right: 8px;
        }
        text{
            height: 16px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-400;
            font-weight: 400;
            text-align: LEFT;
            color: #101828;
            line-height: 16px;
        }
    }
    .time-box{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 16px 0;
        .time-box-item{
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #d0d5dd;
            border-radius: 24px;
            padding:10px 0px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            .time-box-item-text{
                font-size: 14px;
                font-family: Microsoft YaHei, Microsoft YaHei-400;
                font-weight: 400;
                text-align: LEFT;
                color:#101828;
                line-height: 14px;
            }
        }
        .time-box-item.disable{
            background: #f2f4f7;
            .time-box-item-text{
                color: #d0d5dd;
            }
        }
        .time-box-item.selected{
            border: 1px solid #27A597;
            background: #27a597;
            .time-box-item-text{
                color: #ffffff;
            }
        }
    }
    .submit-btn{
        height: 44px;
        background: #27a597;
        border-radius: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: calc(100vw - 32px);
        bottom: 16px;
        text{
            height: 16px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-600;
            font-weight: 600;
            text-align: LEFT;
            color: #ffffff;
            line-height: 16px;
        }
    }
}
</style>
