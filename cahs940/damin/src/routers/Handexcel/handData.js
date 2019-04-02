var handData = {
    minSheng : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var dataArr = [
            {bank : '民生'},
            {carCode : obj.carCode}
        ]
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易时间'],
                tradeTime : -1,
                tradePlace : -1,
                pay : ele['支出金额'] || '0',
                income : ele['存入金额'] || '0',
                balance : ele['账户余额'],
                oppoAccount : ele['对方名称'] || '',
                oppoCode : ele['对方账号'] || '',
                oppoBank : ele['对方开户行'] || '',
                currency : 'rmb',
                type : -1,
                abstract : ele['摘要'],
                PS : -1,
                tradeTbue : -1,
                country : -1,
                method : ele['交易方式'],
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);
        obj.getData(dataArr);
    }, 
    jianHang : (obj)=>{
        console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var dataArr = [
            {bank : '建行'},
            {carCode : obj.carCode}
        ]
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : ele["记账日          "],
                tradeDate : ele["交易日期          "],
                tradeTime : ele["交易时间                "],
                tradePlace : ele["交易地点                "],
                pay : ele["支出                "] || '0',
                income : ele["收入                "] || '0',
                balance : ele["账户余额          "],
                oppoAccount : ele["对方账号          "] || '',
                oppoCode : ele["对方户名          "] || '',
                oppoBank : -1,
                currency : ele["币种          "],
                type : -1,
                abstract : ele["摘要            "],
                PS : -1,
                tradeTbue : -1,
                country : -1,
                method : -1,
                fNum : -1
            })
        });
        console.log('最终的数据：', dataArr);
        obj.getData(dataArr);
    },
    gongShang : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var regD1 = /-/g;
        var dataArr = [
            {bank : '工商'},
            {carCode : obj.carCode}
        ]
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易日期'].replace(regD1, ''),
                tradeTime : -1,
                tradePlace : ele['交易场所'],
                pay : ele['记账金额(支出)'] || '0',
                income : ele['记账金额(收入)'] || '0',
                balance : ele['余额'],
                oppoAccount : ele['对方户名'] || '',
                oppoCode : -1,
                oppoBank : -1,
                currency : ele['记账币种'],
                type : ele['钞/汇'],
                abstract : ele['摘要'],
                PS : -1,
                tradeTbue : -1,
                country : ele['交易国家或地区简称'],
                method : -1,
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);
        obj.getData(dataArr);
    }, 
    cunZhen : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var regD = /\b\d*-\d*-\d*/;
        var regT = /\b\d*:\d*:\d*/;
        var regD1 = /-/g;
        var regT1 = /:/g;
        var dataArr = [
            {bank : '村镇'},
            {carCode : obj.carCode}
        ]
        obj.data.reverse().forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易时间'].match(regD)[0].replace(regD1, ''),
                tradeTime : ele['交易时间'].match(regT)[0],
                tradePlace : -1,
                pay : ele['支出'] || '0',
                income : ele['收入'] || '0',
                balance : ele['余额'] || '0',
                oppoAccount : ele['对方名称'] || '',
                oppoCode : ele['对方账号'] || '',
                oppoBank : -1,
                currency : -1,
                type : -1,
                abstract : ele['摘要'],
                PS : ele['附言'],
                tradeTbue : -1,
                country : -1,
                method : -1,
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);
        obj.getData(dataArr);
    }, 
    pingAn : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        var regD = /\b\d*-\d*-\d*/;
        var regT = /\b\d*:\d*:\d*/;
        var regD1 = /-/g;
        var regT1 = /:/g;
        var dataArr = [
            {bank : '平安'},
            {carCode : obj.carCode}
        ]
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易时间'].match(regD)[0].replace(regD1, ''),
                tradeTime : ele['交易时间'].match(regT)[0],
                tradePlace : -1,
                pay : ele['交易类型'] == '转出' ? ele['交易金额'] :  '0',
                income : ele['交易类型'] == '转入' ? ele['交易金额'] :  '0',
                balance : ele['账户余额'] || '0',
                oppoAccount : ele['交易方姓名'] || '',
                oppoCode : ele['交易方账号'] || '',
                oppoBank : -1,
                currency : -1,
                type : -1,
                abstract : ele['摘要'] || '',
                PS : ele['备注'] || '',
                tradeTbue : -1,
                country : -1,
                method : -1,
                fNum : ele['交易流水号']
            })
        });
        // console.log('最终的数据：', dataArr);
        obj.getData(dataArr);
    }, 
    nongYe : (obj)=>{
        // console.log('传入处理函数的数据:', obj.data);
        console.log('传入处理函数的卡号：', obj.carCode);
        var dataArr = [
            {bank : '农业'},
            {carCode : obj.carCode}
        ]
        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : ele['交易日期'],
                tradeTime : ele['交易时间'],
                tradePlace : ele['交易行'],
                pay : ele['交易金额'] < 0 ? ele['交易金额'].match(/\d*\b/) :  '0',
                income : ele['交易金额'] > 0  ? ele['交易金额'].match(/\d*\b/) :  '0',
                balance : ele['本次余额'] || '0',
                oppoAccount : ele['对方户名'] || '',
                oppoCode : ele['对方账号'] || '',
                oppoBank : -1,
                currency : -1,
                type : -1,
                abstract : ele['交易摘要'] || '',
                PS : ele['备注'] || '',
                tradeTbue : ele['交易渠道'] || '',
                country : -1,
                method : ele['交易类型'] || '',
                fNum : -1
            })
        });
        // console.log('最终的数据：', dataArr);
        obj.getData(dataArr);
    },
    zhongHang : (obj)=>{
        console.log('传入处理函数的数据:', obj.data);
        // console.log('传入处理函数的卡号：', obj.carCode);
        console.log('建行', obj.data[0]);
        console.log('建行', obj.data[1]);
        console.log('建行', obj.data[2]);
        console.log('建行', obj.data[3]);
        console.log('建行', Object.keys(obj.data[0]));
        // var _this = this;
        var dataArr = [
            {bank : '中国银行'},
            {carCode : obj.carCode}
        ]

        obj.data.forEach((ele, index) =>{
            // console.log(ele);
            dataArr.push({
                tallyDate : -1,
                tradeDate : handData.handDate(ele['交易日期']),
                tradeTime : -1,
                tradePlace : -1,
                pay : ele['支出金额'] ? ele['支出金额'] + '' : '0',
                income : ele['收入金额'] ? ele['收入金额'] + '' : '0',
                balance : ele['余额'] ? ele['余额'] + '' : '0',
                oppoAccount : ele['对方账户名称'] || '',
                oppoCode : ele['对方账户账号'] || '',
                oppoBank : -1,
                currency : ele['币种'] || '',
                type : ele['钞/汇'] || '',
                abstract : ele['业务摘要'] || '',
                PS : ele['附言'] || '',
                tradeTbue : ele['交易渠道/场所'] || '',
                country : -1,
                method : -1,
                fNum : -1
            })
        });
        console.log('最终的数据：', dataArr);
        obj.getData(dataArr);
    },     
    handDate: (daynum) => {
        var daynumbase = 25569;  //计算计时原点 1970/01/01
        var dValue = ( daynum  - daynumbase ) * 24 * 60 * 60 * 1000;
        var d = new Date();
        d.setTime(dValue);
        var datestr =d.toLocaleDateString();
        var regCenter = /\/\d{1}\//;
        var regLast = /\/\d{1}$/g;
        var centerstr = datestr.match(regCenter) && datestr.match(regCenter)[0]; 
        var laststr = datestr.match(regLast) && datestr.match(regLast)[0];
        var deststr;
        if(centerstr){
            deststr = datestr.replace(regCenter, '0' + centerstr.match(/\d/)[0] + '/');
            console.log('centerstr为真：', deststr);
         }else if(laststr){
            deststr = datestr;
                console.log('laststr为真, centerstr为null：', deststr);
        } 
        if(laststr){
            deststr = deststr.replace(regLast , '0' + laststr.match(/\d/)[0]); 
            console.log('laststr为真:', deststr);
        }
        if(!centerstr || !laststr){
            deststr = deststr.replace(/\//g ,''); 
            console.log('centerstr和laststr有一个为null:', deststr);
         }
        if(!centerstr && !laststr){
            deststr = datestr.replace(/\//g ,''); 
            console.log('centerstr和laststr均为null:', deststr);
        }
        return deststr;
    }
}

export default handData;