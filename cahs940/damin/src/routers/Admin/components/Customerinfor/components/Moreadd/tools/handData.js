function handData(dataArr){
    var retData = [];
    dataArr.forEach( (ele, index) => {
        retData.push({
            custName : ele['客户名'] || '',
            custPhone : ele['短信通知手机号码'] || '',
            email : ele['E-mail'] || '',
            receiveAccName : ele['收款账户'] || '',
            receiveAccCode : ele['收款账号'] || '',
            receiveBank : ele['开户行名称'] || '',
            phone : ele['手机号'] ? ele['手机号'] + "" : '',
            certificateType : ele['客户证件类型'] || '',
            certificateCode : ele['客户证件号'] || ''
        })
    })
    return retData;
}

export default handData;