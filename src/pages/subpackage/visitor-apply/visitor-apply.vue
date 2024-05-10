<template>
    <view v-if="!isDetials"  class="parent-apply">
        <navbar :font-color="fontColor" :background="background" show-back title-left :title="navBarTitle"></navbar>
        <view class="content apply">
            <view class="zhanwei">
                <uv-form labelPosition="top" :model="model" :rules="rules" ref="form">
                    <view class="apply-block-title">
                        <text class="apply-block-title-text">个人信息</text>
                    </view>
                    <view class="apply-block">
                        <uv-form-item  prop="userInfo.name">
                            <template #default>
                                <view class="apply-block name">
                                    <view>
                                        <view class="form-label">
                                            <text>申请人姓名</text>
                                            <text class="label-required">*</text>
                                        </view>
                                        <uv-input v-model="model.userInfo.name" placeholder="请输入" border="none"></uv-input>
                                        <view class="bottom-line"></view>
                                    </view>
                                    <uv-upload :fileList="fileList" :maxCount="1" width="100" height="100" name="headImg"
                                               @afterRead="afterRead" @delete="deletePic" :previewFullImage="true">
                                        <view class="head-box">
                                            <image class="head-img" src="/static/index/add.png"/>
                                            <view class="head-img-text">请上传本人照片</view>
                                        </view>
                                    </uv-upload>
                                </view>
                            </template>
                        </uv-form-item>
                        <uv-form-item  prop="userInfo.phone" borderBottom>
                            <template #default>
                                <view>
                                    <view class="form-label">
                                        <text>申请人联系方式</text>
                                        <text class="label-required">*</text>
                                    </view>
                                    <uv-input disabled disabledColor="#ffffff" v-model="model.userInfo.phone" placeholder="请获取" border="none"></uv-input>
                                </view>
                            </template>
                            <template #right>
                                <button class="get-phone" open-type="getPhoneNumber" @getphonenumber="getWXPhoneNumber"><text class="text">一键获取</text></button>
                            </template>
                        </uv-form-item>
                        <!--                        <uv-form-item @tap="showKeyboard" prop="userInfo.idNum" borderBottom>-->
                        <uv-form-item  prop="userInfo.idNum" borderBottom>
                            <template #default>
                                <view>
                                    <view class="form-label">
                                        <text>申请人身份证号</text>
                                        <text class="label-required">*</text>
                                    </view>
                                    <uv-input v-model="model.userInfo.idNum" placeholder="请输入" border="none"></uv-input>
                                </view>
                            </template>
                        </uv-form-item>
                        <uv-form-item  prop="userInfo.companyName" borderBottom>
                            <template #default>
                                <view>
                                    <view class="form-label">
                                        <text>所属公司名称</text>
                                        <text class="label-required">*</text>
                                    </view>
                                    <uv-input v-model="model.userInfo.companyName" placeholder="请输入" border="none"></uv-input>
                                </view>
                            </template>
                        </uv-form-item>
                    </view>
                    <view class="apply-block-title">
                        <text class="apply-block-title-text">预约信息</text>
                    </view>
                    <view class="apply-block">
                        <uv-form-item prop="business.time" borderBottom @tap="selectTime" >
                            <template #default>
                                <view >
                                    <view class="form-label">
                                        <text>预约时间</text>
                                        <text class="label-required">*</text>
                                    </view>
                                    <uv-input disabled disabledColor="#ffffff" v-model="model.business.time" placeholder="请选择" border="none"></uv-input>
                                </view>
                            </template>
                            <template v-slot:right>
                                <uv-icon name="arrow-right"></uv-icon>
                            </template>
                        </uv-form-item>
                        <uv-form-item prop="business.reason" borderBottom >
                            <template #default>
                                <view>
                                    <view class="form-label">
                                        <text>入园事由</text>
                                        <text class="label-required">*</text>
                                    </view>
                                    <uv-input v-model="model.business.reason" disabled disabledColor="#ffffff" border="none"></uv-input>
                                </view>
                            </template>
                        </uv-form-item>
                        <view class="form-add-numbers">
                            <view class="form-add-numbers-label">
                                <text>车牌号</text>
                                <uv-icon @tap="addOrRemoveCarNumber()" color="#27A597" name="plus-circle" size="18"></uv-icon>
                            </view>
                            <view>
                                <uv-form-item v-for="(item,key) in model.business.carNumbers" :prop="item.key" customStyle="background: #ffffff;border-radius: 8px; padding:15px 10px;" >
                                    <template #default>
                                        <view class="form-label inline">
                                            <text style="margin-right: 5px">车牌号{{key+1}}</text>
                                            <uv-input v-model="item.carNumber" inputAlign="right" placeholder="请输入" border="none">
                                                <template #suffix>
                                                    <uv-icon @tap="addOrRemoveCarNumber(item.key)" size="18" color="#F04438" name="minus-circle"></uv-icon>
                                                </template>
                                            </uv-input>
                                        </view>
                                    </template>
                                </uv-form-item>
                            </view>
                        </view>
                    </view>
                    <view class="apply-block-title">
                        <text class="apply-block-title-text">同行人</text>
                        <uv-icon @tap="addOrRemovefellowPeoples()" color="#27A597" size="18" name="plus-circle"></uv-icon>
                    </view>
                    <view class="apply-block">
                        <view v-for="(item,key) in model.fellowPeoples"  class="form-add-numbers">
                            <view class="form-add-numbers-label">
                                <text>同行人{{ key+1 }}</text>
                                <uv-icon @tap="addOrRemovefellowPeoples(item.key)" size="18" color="#E4E7EC" name="close-circle-fill"></uv-icon>
                            </view>
                            <view>
                                <uv-form-item :prop="item.key+'name'" customStyle="background: #ffffff;border-radius: 8px; padding:15px 10px;" >
                                    <template #default>
                                        <view class="form-label inline">
                                            <view>
                                                <text style="margin-right: 5px">姓名</text>
                                                <text class="label-required">*</text>
                                            </view>
                                            <uv-input v-model="item.name" inputAlign="right" placeholder="请输入" border="none"></uv-input>
                                        </view>
                                    </template>
                                </uv-form-item>
                                <!--                                <uv-form-item @tap="showKeyboard(item.key)" customStyle="background: #ffffff;border-radius: 8px; padding:15px 10px;"  prop="userInfo.sex" >-->
                                <uv-form-item :prop="item.key" customStyle="background: #ffffff;border-radius: 8px; padding:15px 10px;">
                                    <template #default>
                                        <view class="form-label inline">
                                            <view>
                                                <text style="margin-right: 5px">身份证号</text>
                                                <text class="label-required">*</text>
                                            </view>
                                            <uv-input  v-model="item.idNumber" inputAlign="right" placeholder="请输入" border="none"></uv-input>
                                        </view>
                                    </template>
                                </uv-form-item>
                            </view>
                        </view>
                    </view>
                </uv-form>
                <view class="add-buttons">
                    <view @tap="cancel" class="cancel-btn"><text>取消</text></view>
                    <view @tap="submit" class="submit-btn"><text>提交</text></view>
                </view>
            </view>
        </view>
        <!--        <uv-keyboard ref="keyboard"  @change="keyboardChange" @backspace="backspace" @close="close" mode="car"></uv-keyboard>-->
    </view>
    <view v-else class="parent-white">
        <navbar :font-color="fontColor" :background="background" show-back title-left :title="navBarTitle"></navbar>
        <view class="content">
            <apply-details :model="model"></apply-details>
        </view>
    </view>
</template>

<script setup lang="ts">
import {useInit} from "@/hooks/useInit";
import {back, forward} from "@/utils/router";
import { onReady} from '@dcloudio/uni-app';
import { idCard,carNo,empty } from '@climblee/uv-ui/libs/function/test.js';
import throttle from '@climblee/uv-ui/libs/function/throttle.js';
import {getPhoneNumber} from "@/hooks/getWXUserInfo";

const isDetials = ref(false);
const navBarTitle = ref('业务办理申请')
const background =ref('transparent');
const fontColor =ref('#FFFFFF')
onLoad(() => {
    const {pageName, pagePath, pageQuery} = useInit();
    console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
    if(pageQuery.isDetials){
        isDetials.value = true
        setNavBar(isDetials.value)
    }else{
        setNavBar(isDetials.value)
    }
    addOrRemoveCarNumber()
    addOrRemovefellowPeoples()
});
const setNavBar=(showType)=>{
    if(showType){
        console.log(111);
        navBarTitle.value = '详情'
        background.value = '#FFFFFF'
        fontColor.value = undefined
    }else{
        navBarTitle.value = '业务办理申请'
        background.value = 'transparent'
        fontColor.value = '#FFFFFF'
    }
}
// const keyboard = ref()
// const isFellowPeoples = ref(null)
// const showKeyboard = (key)=>{
//     if(key != undefined){
//         isFellowPeoples.value = key
//         uni.pageScrollTo({
//             scrollTop: 10000,
//             duration: 300
//         });
//     }
//     keyboard.value.open()
// }
//
// const keyboardChange = val=>{
//     if(isFellowPeoples.value !=null){
//         let obj = model.value.fellowPeoples.filter(item=>item.key == isFellowPeoples.value)
//         obj[0].idNumber += val
//     }else{
//         model.value.userInfo.idNum += val
//     }
// }
//
// const backspace = ()=>{
//     if(isFellowPeoples.value !=null){
//         let obj = model.value.fellowPeoples.filter(item=>item.key == isFellowPeoples.value)[0]
//         if(obj.idNumber.length){
//             obj.idNumber = obj.idNumber.substr(0, obj.idNumber.length - 1)
//         }
//     }else{
//         if(model.value.userInfo.idNum.length){
//             model.value.userInfo.idNum = model.value.userInfo.idNum.substr(0, model.value.userInfo.idNum.length - 1)
//         }
//     }
// }
//
// const close =()=>{}

const fileList = ref([])

const deletePic = (event)=>{
    fileList.value = []
}

const afterRead = (event)=>{
    fileList.value.push(event.file)
}

const labelTextFromReason =ref('采购订单号')
const onRadioChange = e =>{
    if(e == '1'){
        labelTextFromReason.value = '采购订单号'
    }else if(e == '2'){
        labelTextFromReason.value = '领料单号'
    }
    form.value.clearValidate()
}

const form = ref()

const rules={
    'userInfo.name': [{
        required: true,
        message: '请输入申请人姓名',
        trigger: ['blur', 'change']
    }],
    'userInfo.phone': [{
        required: true,
        message: '请获取申请人联系方式',
        trigger: ['blur', 'change']
    }],
    'userInfo.idNum': [{
        required: true,
        validator: (rule, value, callback) => {
            return idCard(value);
        },
        message: '请输入正确的身份证号',
        trigger: ['blur', 'change']
    }],
    'userInfo.companyName': [{
        required: true,
        message: '请输入所属公司名称',
        trigger: ['blur', 'change']
    }],
    'business.time': [{
        required: true,
        message: '请选择预约时间',
        trigger: ['blur', 'change']
    }],
    'business.reason': [{
        required: true,
        message: '请选择入园事由',
        trigger: ['blur', 'change']
    }],
}

const model = ref({
    userInfo: {
        name: '',
        phone: '',
        idNum:'',
        companyName:''
    },
    business:{
        time:'',
        reason:'访客',
        carNumbers:[]
    },
    fellowPeoples:[],
})

const addOrRemoveCarNumber = (key)=>{
    if(key){
        model.value.business.carNumbers = model.value.business.carNumbers.filter(item=>item.key !==key);
        delete rules[key] ;
    }else{
        let length = model.value.business.carNumbers.length
        let key = 'business'+length
        model.value.business.carNumbers.push({carNumber:'',key})
        rules[key]= [{
            required: true,
            validator: (rule, value, callback) => {
                let obj = model.value.business.carNumbers.filter(item=>item.key ==rule.fullField)?.[0];
                return carNo(obj?.carNumber);
            },
            message: '请输入正确的车牌号',
            trigger: ['blur', 'change']
        }]
    }
}

const addOrRemovefellowPeoples = (key)=>{
    if(key){
        model.value.fellowPeoples = model.value.fellowPeoples.filter(item=>item.key !==key);
        delete rules[key+'name']
        delete rules[key]
    }else{
        let length = model.value.fellowPeoples.length
        let key = 'fellowpeoples'+length
        model.value.fellowPeoples.push({name:'',idNumber:'',key})
        console.log(key + 'name');
        rules[key+'name']= [{
            required: true,
            validator: (rule, value, callback) => {
                console.log(rule,model.value.fellowPeoples);
                let obj = model.value.fellowPeoples.filter(item=>item.key+'name' ==rule.fullField)?.[0];
                return !empty(obj?.name);
            },
            message: '请输入姓名',
            trigger: ['blur', 'change']
        }]
        rules[key]= [{
            required: true,
            validator: (rule, value, callback) => {
                let obj = model.value.fellowPeoples.filter(item=>item.key ==rule.fullField)?.[0];
                return idCard(obj?.idNumber);
            },
            message: '请输入正确的身份证号',
            trigger: ['blur', 'change']
        }]
    }
}

const selectTime = ()=>{
    forward('selectTime',{key:'selectTimeForVisitor'})
    uni.$on('selectTimeForVisitor',(data)=>{
        console.log(data.msg);
        model.value.business.time = data.msg
    })
}

const submit =()=>{
    throttle(()=>{
        form.value.validate().then(res=>{
            console.log(model.value);
        }).catch(errors=>{
            console.log(errors);
        })
    },2000,true)

}

const cancel = ()=>{
    back(1)
}

onReady(() => {
})

const getWXPhoneNumber=(e)   => {
    getPhoneNumber(e)
}
</script>

<style scoped lang="scss">
.content.apply{
    padding: 20px 0;
    .zhanwei{
        padding: 16px 16px 70px;
        background: #f2f4f7;
        border-radius: 30px 30px 0px 0px;
        .apply-block-title{
            margin: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .apply-block-title-text{
                height: 16px;
                font-size: 16px;
                font-family: Microsoft YaHei, Microsoft YaHei-400;
                font-weight: 400;
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
            .form-label{
                width: 100%;
                margin-bottom: 16px;
                .label-required{
                    color: red;
                    margin-left: 5px;
                }
            }
            .form-label.inline{
                margin-bottom: 0;
                display: flex;
                align-items: center;
            }
            .form-radio-group{
                :deep(.uv-radio-group.uv-radio-group--row) {
                    width: calc(100vw - 64px);
                    justify-content: space-around;
                }
            }
            .get-phone{
                height: 30px;
                border: 0.5px solid #27a597;
                border-radius: 2px;
                display: flex;
                align-items: center;
                background-color: #ffffff;
                justify-content: center;
                .text{
                    height: 14px;
                    font-size: 14px;
                    font-family: Microsoft YaHei, Microsoft YaHei-400;
                    font-weight: 400;
                    text-align: CENTER;
                    color: #27a597;
                    line-height: 14px;
                }
                &::after{
                    border: 0;
                }
            }
            :deep(.uv-form-item__body__right__content) {
                align-items: flex-end;
            }
            .form-add-numbers{
                background: #f9fafb;
                border-radius: 8px;
                padding: 18px 10px;
                margin-top: 15px;
                .form-add-numbers-label{
                    display: flex;
                    margin-bottom: 16px;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
        .apply-block:last-child{
            margin-bottom: 0;
        }
        .apply-block.name{
            display: flex;
            width: 100%;
            padding: 0;
            align-items: flex-start;
            justify-content: space-between;
            .form-label{
                width: calc(100vw - 100px - 80px);
            }
            .bottom-line{
                border-bottom: 1px solid rgb(214, 215, 217);
                transform: scaleY(0.5);
                padding: 10px 0;
            }
            .head-img-text{
                height: 10px;
                font-size: 10px;
                font-family: Microsoft YaHei, Microsoft YaHei-400;
                font-weight: 400;
                text-align: CENTER;
                color: #475467;
                line-height: 10px;
            }
            .head-box{
                width: 100px;
                height: 100px;
                flex-direction: column;
                align-items: center;
                display: flex;
                justify-content: center;
                background: #f7f8fa;
                border-radius: 1px;
                .head-img{
                    width: 18px;
                    height: 18px;
                    margin-bottom: 15px;
                }
                .head-img-text{
                    height: 10px;
                    font-size: 10px;
                    font-family: Microsoft YaHei, Microsoft YaHei-400;
                    font-weight: 400;
                    text-align: CENTER;
                    color: #475467;
                    line-height: 10px;
                }
            }
            :deep(.uv-upload){
                flex: 0;
                margin:0;
            }
            :deep(.uv-upload__button){
                margin: 0 !important;
            }
        }
    }
    .zhanwei-keyboard{
        padding-bottom:300px ;
        background: red;
    }
    .add-buttons{
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
        .cancel-btn{
            padding: 14px 60px;
            border: 0.5px solid #27a597;
            border-radius: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            text{
                height: 16px;
                font-size: 16px;
                font-family: Microsoft YaHei, Microsoft YaHei-600;
                font-weight: 600;
                text-align: LEFT;
                color: #27a597;
                line-height: 16px;
            }
        }
        .submit-btn{
            padding: 14px 60px;
            background: #27a597;
            border-radius: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
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
    :deep(.uv-overlay) {
        background-color: transparent !important;
    }
}
</style>
