//时间变成两位数
const toTwo =(n)=> {
    return +n < 10 ? '0' + n : n + '';
};
const Type = (obj)=> {
    var arr = ['null', 'nan', 'function', 'number', 'string', 'array', 'object'];
    if (obj === null) {
        return 'null';
    }
    if (obj !== obj) {
        return 'nan';
    }
    if (typeof Array.isArray === 'function') {
        if (Array.isArray(obj)) { //浏览器支持则使用isArray()方法
            return 'array';
        }
    } else { //否则使用toString方法
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            return 'array';
        }
    }
    return (typeof obj).toLowerCase();
};
//正常化日期
const normalDate=(oDate)=> {
    var oDate = oDate;
    var reg = /\-+/g;

    if (Type(oDate) == 'string') {
        oDate = oDate.split('.')[0]; //解决ie浏览器对yyyy-MM-dd HH:mm:ss.S格式的不兼容
        oDate = oDate.replace(reg, '/'); //解决苹果浏览器对yyyy-MM-dd格式的不兼容性
    }

    oDate = new Date(oDate);
    return oDate;
};
const dateFormat0=(oDate, fmt) =>{
    var fmt = fmt || 'yyyy/MM/dd hh:mm:ss';
    var oDate = normalDate(oDate || new Date());
    var date = {
        'y+': oDate.getFullYear(), //年
        'M+': oDate.getMonth() + 1, //月
        'd+': oDate.getDate(), //日
        'h+': oDate.getHours(), //时
        'm+': oDate.getMinutes(), //分
        's+': oDate.getSeconds(), //秒
        'S': oDate.getMilliseconds(), //毫秒
        'q+': Math.ceil((oDate.getMonth() + 1) / 3), //季度，+3为了好取整
    };
    var result = '';
    var value = '';

    for (var attr in date) {
        if (new RegExp('(' + attr + ')').test(fmt)) {
            result = RegExp.$1;
            value = date[attr] + '';
            fmt = fmt.replace(result, result.length == 1 ? value : (attr == 'y+' ? value.substring(4 - result.length) : toTwo(value)));
        }
    }

    return fmt;
};
//根据出生日期获取年龄
const getAge = (date, real) =>{
    var bDate = normalDate(date);
    var bYear = bDate.getFullYear();
    var bMonth = bDate.getMonth();
    var bDay = bDate.getDate();
    var nDate = new Date();
    var nYear = nDate.getFullYear();
    var nMonth = nDate.getMonth();
    var nDay = nDate.getDate();
    var dYear = nYear - bYear;
    var dMonth = (nMonth - bMonth) / 12;
    var dDay = (nDay - bDay) / 365;
    var diff = dYear + dMonth + dDay;
    var age = diff > 0 ? (real ? diff : Math.floor(diff)) : 0;

    return age;
};
var idCardNo = {
    citys: { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }, //省,直辖市代码
    powers: ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'], //每位加权因子
    lastCodes: ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'], //第18位校检码
    normalIdCardNo: function (idCardNo) { //格式化15身份证号码为18位
        var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);

        return idCardNo.length == 15 ? id17 + this.getLastCode(id17) : idCardNo;
    },
    getLastCode: function (idCardNo) { //根据身份证前17位计算出最后一位校检码
        var idCardNo = this.normalIdCardNo(idCardNo);
        var id17 = idCardNo.substring(0, 17);
        var sum = 0;
        var codeIndex = 0;

        for (var i = 0; i < 17; i++) {
            sum += id17.charAt(i) * this.powers[i];
        }

        codeIndex = sum % 11;

        return this.lastCodes[codeIndex];
    },
    getIdCardNoInfo: function (idCardNo) { //获取身份证信息
        var idCardNo = this.normalIdCardNo(idCardNo);
        var cityCode = idCardNo.substring(0, 2);
        var dobCode = idCardNo.substring(6, 14);
        var sexCode = idCardNo.substring(idCardNo.length - 2, idCardNo.length - 1);
        var bYear = dobCode.substring(0, 4);
        var bMonth = dobCode.substring(4, 6);
        var bDay = dobCode.substring(6);
        var bDate = new Date(bYear, bMonth - 1, bDay);
        var dob = dateFormat0(bDate, 'yyyy-MM-dd');
        var ageCode = getAge(dob) + '';
        var idCardNoInfo = {
            city: this.citys[cityCode],
            dob: dob,
            sex: sexCode & 1 == 1 ? '男' : '女',
            age: getAge(dob) + '岁',
            cityCode: cityCode,
            dobCode: dobCode,
            sexCode: sexCode,
            ageCode: ageCode,
        };

        return this.checkIdCardNo(idCardNo) ? idCardNoInfo : this.getIdCardNoCheckInfo(idCardNo);
    },
    checkAddressCode: function (idCardNo) { //检查地址码
        var idCardNo = this.normalIdCardNo(idCardNo);
        var addressCode = idCardNo.substring(0, 6);
        var reg = /[1-8]\d{5}/;

        return reg.test(addressCode) && this.citys[addressCode.substring(0, 2)] ? true : false;
    },
    checkDobCode: function (idCardNo) { //检查日期码
        var idCardNo = this.normalIdCardNo(idCardNo);
        var dobCode = idCardNo.substring(6, 14);
        var reg = /[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])/;
        var oDate = new Date();
        var bYear = dobCode.substring(0, 4);
        var bMonth = dobCode.substring(4, 6);
        var bDay = dobCode.substring(6);
        var bDate = new Date(bYear, bMonth - 1, bDay);
        var cYear = bDate.getFullYear();
        var cMonth = bDate.getMonth() + 1;
        var cDay = bDate.getDate();

        return reg.test(dobCode) && bDate <= oDate && cYear == bYear && cMonth == bMonth && cDay == bDay ? true : false;
    },
    checkLastCode: function (idCardNo) { //检查身份证最后一位校验码
        var idCardNo = this.normalIdCardNo(idCardNo);
        var lastCode = idCardNo.charAt(idCardNo.length - 1);

        return lastCode == this.getLastCode(idCardNo) ? true : false;
    },
    getIdCardNoCheckInfo: function (idCardNo) { //获取身份证号码校验信息
        var idCardNo = this.normalIdCardNo(idCardNo);
        var regTestResult = /^[1-8]\d{5}[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[\dxX]$/.test(idCardNo);
        var checkResult = [
            regTestResult,
            this.checkAddressCode(idCardNo),
            this.checkDobCode(idCardNo),
            this.checkLastCode(idCardNo),
        ];
        var posIndex = checkResult.indexOf(false);
        var result = ~posIndex ? posIndex : true;
        var msgJson = {
            '-1': '身份证号码校验通过',
            '0': '身份证号码格式校验不通过',
            '1': '地址码校验不通过',
            '2': '日期码校验不通过',
            '3': '最后一位校验码校验不通过',
        };

        return {
            pass: result === true,
            code: posIndex,
            msg: msgJson[posIndex],
        };
    },
    checkIdCardNo: function (idCardNo) { //检查身份证号码
        var result = this.getIdCardNoCheckInfo(idCardNo);

        return result.pass;
    },
};
export const checkID=(idNum)=> {
    return idCardNo.checkIdCardNo(idNum)
}

export const isVehicleNumber=(vehicleNumber)=> {
    var xreg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    var creg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if(vehicleNumber.length == 7){
        return creg.test(vehicleNumber);
    } else if(vehicleNumber.length == 8){
        return xreg.test(vehicleNumber);
    } else{
        return false;
    }
}
