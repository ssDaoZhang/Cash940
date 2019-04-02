var handStr = {
    //time1 '20181025'
    timeStr1 : (str) => {
        var strArr = str.match(/\d{2}/g);
        return strArr[0] + strArr[1] + '-' + strArr[2] + '-' + strArr[3]; 
    },
    bankCode : (str) => {
        var strArr = str.match(/\d{1,3}/g);
        return strArr.join(' ');
    } 
}
export default handStr;