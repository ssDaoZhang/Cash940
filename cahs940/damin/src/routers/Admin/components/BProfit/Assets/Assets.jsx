import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './Assets.css';
// import '../../../../../tools/myAjax';
import DropList from '../../../../../components/DropList/DropList';
import myAjax from '../../../../../tools/myAjax';

//第一层详情
import CashAmount from './CashAmount/CashAmount';
import BorrowAmount from './BorrowAmount/BorrowAmount';
import ShouleIn from './ShouleIn/ShouleIn';
import ShouleOut from './ShouleOut/ShouleOut';
//第二层详情
import CashDetails from './CashDetails/CashDetails';
//日历插件
import Mycalendar from '../../../../../components/Mycalendar/Mycalendar';
import BorrowAmountDet from './BorrowAmountDet/BorrowAmountDet';
import ShouleOutDet from './ShouleOutDet/ShouleOutDet';
import ShouleInDet from './ShouleInDet/ShouleInDet';
import Bankdetails from './Bankdetails/Bankdetails';
import BankDet from './BankDet/BankDet';
// appID:软件序列号
// lan zh_CN
// timemstamp时间戳
// token  
class Assets extends Component{
    constructor(props){
        super(props);
        this.state = {
            //店铺下拉列表数组
            dropArr : '',
            //店铺币种
            dropCurry : '',
            //店铺余额列表
            shopBalance : '',
            //现金/银行卡Index
            // selectIndex : 'cash',
            //弹窗标记
            popupFlag : false,
            //主货币
            mainCurrencyCode:'',
            //第一层详情字符
            itemStr:'',
            //已选店铺
            sSeletedShopId : '',
            //第一层详情中选择的币种 
            nowCurryCode : '',

            //店铺资产负债
            shopAssets : '',
            //选择的店铺信息
            shopMess : '',
            //查询日期
            nowTime : new Date(),
            //选择的币种 mark代码 name名字
            seletedCurry : '',
            //选择的查询类型
            tradeType:''
        }
        //已选店铺
        this.seletedShopId = '';
        //已选币种
        this.seletedCurry = '';
    }
    componentDidMount(){
        const { nowTime} = this.state;
        // //获取币种
        myAjax({
            url : '/commos/getCurrencys',
            data : {
                mainCurrencyCode:JSON.parse(sessionStorage['shop']).currencyCode,
                appID : JSON.parse(sessionStorage['appID']),
                lan : 'zh_CN',
                timemstamp : new Date().getTime()
            },
            type : 'GET',
            success : this.handCurrencyList,
            complete: this.ajax2
        });
    }

    //处理返回的店铺列表
    // handShopList = (data) => {
    //     console.log('获取的店铺列表：',data);
    //     var dropArrt = [];
    //     if(data.statusCode == 0){
    //         data.shops.forEach((ele, index) => {
    //             dropArrt.push({
    //                 name : ele.simpleName,
    //                 mark : ele.shopId,
    //                 code : ''
    //             });
    //         });
    //         this.setState({
    //             dropArr : dropArrt
    //         });
    //     }        
    // }

    //处理返回的店铺币种列表
    handCurrencyList = (data) => {
        // console.log('币种列表：',data);
        var dropArrt = [];
        const { nowTime} = this.state;
        if(data.statusCode == 0){
            data.currencies.forEach((ele, index) => {
                dropArrt.push({
                    name : ele.currencyName,
                    mark : ele.currencyCode,
                    code : ''
                });
            });
            this.setState({
                dropCurry : dropArrt
            });
        }      
    }
    //ajax2
    ajax2 = (DATA) =>{
        const { nowTime} = this.state;
        myAjax({
            url : '/shop/getShopCount',
            data : { 
                appID : JSON.parse(sessionStorage['appID']),
                //店铺ID
                // shopID:this.seletedShopId.mark,
                //语言
                lan:'zh_CN', 
                //时间戳
                timemstamp : new Date().getTime(),
                token : JSON.parse(sessionStorage['token']),
                //选择的币种
                currencyCode : 'CNY',//JSON.parse(sessionStorage['shop']).currencyCode,
                //选择的时间
                date : formatDate( '{year}-{month}-{day}', nowTime)
            },
            type : 'GET',
            success : this.handBackShopAssets,
        });
    }
    //选择的店铺
    setShopId = (shopId) => {
        //shopId.mark为id name为名字
        this.seletedShopId = shopId;
        this.setState({
            sSeletedShopId : shopId
        });
        // console.log('选择的店铺ID:', this.seletedShopId);
    }
    //选择的店铺币种
    setShopCurry = (curry) => {
        //shopId.mark为币种代码 name为名字
        this.seletedCurry = curry;
        this.setState({
            seletedCurry : curry
        });
        // console.log('获取选择的店铺币种:', this.seletedCurry);
    }

    // 第一层详情 关闭弹窗
    setPopupFlag = (flag, str, shopMess) => {
        this.setState(preState => {
            if(preState.itemStr == '现金详情'){
                return{
                    popupFlag : true,
                    itemStr : '现金',
                    shopMess : shopMess
                }
            }else if(preState.itemStr == '借款'){
                return{
                    popupFlag : true,
                    itemStr : '借',
                    shopMess : shopMess
                }
            }else if(preState.itemStr == '收款详情'){
                return{
                    popupFlag : true,
                    itemStr : '应收账款',
                    shopMess : shopMess
                }
            }else if(preState.itemStr == '付款详情'){
                return{
                    popupFlag : true,
                    itemStr : '应付账款',
                    shopMess : shopMess
                }
            }else if(preState.itemStr == '银行卡'){
                return{
                    popupFlag : true,
                    itemStr : '银行存款',
                    shopMess : shopMess
                }
            }else{
                return{
                    popupFlag : flag,
                    itemStr : str,
                    shopMess : ''
                }
            }
        })      
    }
    setPopupFlag1 = (flag, str, shopMess) => {
        this.setState({
            popupFlag : flag,
            itemStr : str,
            shopMess : shopMess
        });
    }
    // 第二层详情 中获取的信息
    set2DetailsMess = ( str, curryCode, str2) => {
        this.setState({
            itemStr : str,
            nowCurryCode : curryCode,
            tradeType : str2
        });
    }
    //查询店铺资产负债
    ajaxGetShopAssets = (e) => {
        const { nowTime, seletedCurry } = this.state;
        myAjax({
            url : '/shop/getShopCount',
            data : { 
                appID:JSON.parse(sessionStorage['appID']),
                //店铺ID
                shopID:this.seletedShopId.mark,
                //语言
                lan:'zh_CN', 
                //时间戳
                timemstamp:new Date().getTime(),
                token:JSON.parse(sessionStorage['token']),
                //选择的币种
                currencyCode:seletedCurry.mark,//seletedCurry.mark,
                //选择的时间
                date : formatDate( '{year}-{month}-{day}', nowTime)
            },
            type : 'GET',
            success : this.handBackShopAssets,
        });
    }
    //处理ajaxGetShopAssets的返回的数据
    handBackShopAssets = (data) =>{
        // console.log('资产负债：', data);
        if( data.statusCode == 0 ){
            // console.log('资产返回的数据：',data);
            // console.log('资产返回的数据：',data.countVo.mainCurrencyCode);
            if(data.list.length != 0){
                var dataArr = [];
                data.list.forEach((ele, index) => {
                    dataArr.push({
                        //应收总额
                        inAmountShopTransferFromTo : ele.inAmountShopTransferFromTo/100, 
                        //应付总额 outAmountShopTransferFromTo
                        outAmountShopTransferFromTo : (ele.outAmountShopTransferFromTo - ele.inAmountShopToShopAmount) > 0 ? (ele.outAmountShopTransferFromTo - ele.inAmountShopToShopAmount)/100 : '',
                        //借入总额
                        inAmountShopToShopAmount : (ele.outAmountShopTransferFromTo - ele.inAmountShopToShopAmount) < 0 ? -(ele.outAmountShopTransferFromTo - ele.inAmountShopToShopAmount)/100 :'',
                        //借出总额
                        outAmountShopToShopAmount : ele.outAmountShopToShopAmount/100,
                        //现金存款总额
                        cashAmount : ele.cashAmount/100,
                        //银行存款总额
                        bankAmount  : ele.bankAmount/100,
                        //主货币
                        mainCurrencyCode : ele.mainCurrencyCode,
                        mainCurrencyName : ele.mainCurrencyName,
                        //店铺信息
                        shopName : ele.shopName || ele.simpleName,
                        shopID : ele.shopID
                    });
                    this.setState({
                        shopAssets : dataArr
                    });
                });
            }
        }
    }
    //获取查询日期
    getNowTime = (time) => {
        this.setState(
            {
                nowTime : time
            }
        );
    }
    //处理金额数据
    handMoneyNum = (num) => {
        var str = num + '',
        arr = str.split('.'),
        str1 = arr[0],
        str2 = arr[1],
        str3 = str1.match(/\d{1,3}/g).join(',');
        return str3 + '.' +str2;
    }
    render(){
        // console.log('获取的店铺列表：', this.state.dropArr);
        const {
            dropCurry,
            dropArr,
            shopBalance,
            // selectIndex,
            //弹窗标记
            popupFlag,
            //主货币
            mainCurrencyCode,
            //第一层详情字符
            itemStr,
            //已选的店铺id
            // sSeletedShopId,
            //第二层选择的币种
            nowCurryCode,

            //店铺资产负债
            shopAssets,
            //已选店铺信息
            shopMess,
            //查询日期
            nowTime,
            //选择的查询类型
            tradeType
        } = this.state;
        // console.log('当前日期：', formatDate( '{year}-{month}-{day}', nowTime));
        return(
            <div className='assets itemwarp'>
                <div className='itemtitle'>查看店铺资产负债</div>
                <div className='assets__selectshop'>
                    <div className='assets__selectshop__item2'>
                        <Mycalendar getDateFuc={this.getNowTime}
                                    timeMess='查询日期:'/>
                    </div>
                    <span className='assets__selectshop__item4'>
                        请选择结算币种：
                    </span>
                    <div className='assets__selectshop__item5'>
                        { dropCurry != '' &&  <DropList 
                            data={dropCurry}
                            iconHeight={'1.375em'}
                            opWarpPosTop={'1.375em'}
                            opWarpwidth={'6em'}
                            opheight={'1.375em'}
                            callFuc={this.setShopCurry}
                        />}
                    </div>
                    <div className='assets__selectshop__item3'
                            onClick={this.ajaxGetShopAssets}>
                        查&nbsp;&nbsp;询
                    </div>
                </div>
                <div className='assets__conwarp'>
                    {shopAssets != '' &&  shopAssets.map((ele, index) => {
                        return(
                            <div className='assets__content' key={ele.shopID + '' +index}>
                            <div className='assets__content__item'>
                                <i className='iconimgred'></i>
                                <div    className='assets__content__item__it1 colorRed'>{ele.shopName}&nbsp;&nbsp;资产</div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '现金', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span   className='assets__content__item__it2__i1 colorRed'>
                                        现金(1001):
                                    </span>
                                    <span    className='assets__content__item__it2__i1'>
                                        {ele.cashAmount && (this.handMoneyNum(ele.cashAmount.toFixed(3)) + ' ' + ele.mainCurrencyCode)}
                                    </span>
                                </div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '银行存款', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__item__it2__i1 colorRed'>
                                        银行存款(1002):
                                    </span>
                                    <span className='assets__content__item__it2__i1'>
                                        {ele.bankAmount && (this.handMoneyNum(ele.bankAmount.toFixed(3)) + ' ' + ele.mainCurrencyCode)}
                                    </span>
                                </div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '借', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__item__it2__i1 colorRed'>
                                        同业-借出(1011):
                                    </span>
                                    <span className='assets__content__item__it2__i1'>
                                        {ele.outAmountShopToShopAmount && this.handMoneyNum(ele.outAmountShopToShopAmount.toFixed(3)) + ' ' + ele.mainCurrencyCode}
                                    </span>
                                </div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '应收利息', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__item__it2__i1 colorRed'>
                                        应收利息(1132):
                                    </span>
                                    <span className='assets__content__item__it2__i1'>
                                        暂无
                                    </span>
                                </div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '应收账款', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__item__it2__i1 colorRed'>
                                        应收账款(1122):
                                    </span>
                                    <span className='assets__content__item__it2__i1'>
                                        {ele.inAmountShopTransferFromTo && this.handMoneyNum(ele.inAmountShopTransferFromTo.toFixed(3)) + ' ' + ele.mainCurrencyCode}
                                    </span>
                                </div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '预付账款', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__item__it2__i1 colorRed'>
                                        预付账款(1123):
                                    </span>
                                    <span className='assets__content__item__it2__i1'>
                                        暂无
                                    </span>
                                </div>                     
                            </div>
                            <div className='assets__content__item'>
                                <i className='iconimggreen'></i>
                                <div className='assets__content__item__it1 colorGreen'>{ele.shopName}&nbsp;&nbsp;负债</div>
                                <div    className='assets__content__itemit2'
                                        onClick={e => { this.setPopupFlag1(true, '借', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__itemit2__i1 colorGreen'>
                                        同业-借入(2004):
                                    </span>
                                    <span className='assets__content__itemit2__i1'>
                                        {ele.inAmountShopToShopAmount && this.handMoneyNum(ele.inAmountShopToShopAmount.toFixed(3)) + ' ' + ele.mainCurrencyCode}
                                    </span>
                                </div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '应付利息', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__item__it2__i1 colorGreen'>
                                        应付利息(2232):
                                    </span>
                                    <span className='assets__content__item__it2__i1'>
                                        暂无  
                                    </span>
                                </div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '应付账款', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__item__it2__i1 colorGreen'>
                                        应付账款(2202):
                                    </span>
                                    <span className='assets__content__item__it2__i1'>
                                        {ele.outAmountShopTransferFromTo && this.handMoneyNum(ele.outAmountShopTransferFromTo.toFixed(3)) + ' ' + ele.mainCurrencyCode}
                                    </span>
                                </div>
                                <div    className='assets__content__item__it2'
                                        onClick={e => { this.setPopupFlag1(true, '预收账款', {mark: ele.shopID, name : ele.shopName}) }}>
                                    <span className='assets__content__item__it2__i1 colorGreen'>
                                        预收账款(2205):
                                    </span>
                                    <span className='assets__content__item__it2__i1'>
                                        暂无
                                    </span>
                                </div>
                            </div>
                        </div>
                        );
                    })
                    }
                </div>
                {popupFlag && <div className='assets__popup'>
                    <i className='apopclose' onClick={e => { this.setPopupFlag(false, '', shopMess)}}
                    ></i>
                    {itemStr == '现金' && <CashAmount 
                                            selectedShopID = {shopMess}
                                            selectDate = {nowTime}
                                            callFuc = {this.set2DetailsMess}/>}
                    {itemStr == '银行存款' && <Bankdetails 
                                            selectedShopID = {shopMess}
                                            selectDate = {nowTime}
                                            callFuc = {this.set2DetailsMess}/>}
                    {itemStr == '借' && <BorrowAmount selectedShopID = {shopMess}
                                            selectDate = {nowTime}
                                            callFuc = {this.set2DetailsMess}/>}
                    {itemStr == '应收账款' && <ShouleIn selectedShopID = {shopMess}
                                                selectDate = {nowTime}
                                                callFuc = {this.set2DetailsMess}/>}
                    {itemStr == '应付账款' && <ShouleOut selectedShopID = {shopMess}
                                                selectDate = {nowTime}
                                                callFuc = {this.set2DetailsMess}/>}
                    {itemStr == '现金详情' && <CashDetails 
                                                selectedShopID = {shopMess}
                                                selectDate = {nowTime}
                                                nowCurryCode = {nowCurryCode}/>}
                    {itemStr == '借款' && <BorrowAmountDet 
                                                selectedShopID = {shopMess}
                                                selectDate = {nowTime}
                                                nowCurryCode = {nowCurryCode}
                                                tradeType = {tradeType}
                                                />}
                    {itemStr == '收款详情' && <ShouleInDet 
                                                selectedShopID = {shopMess}
                                                selectDate = {nowTime}
                                                nowCurryCode = {nowCurryCode}
                                                tradeType = {tradeType}
                                                />}
                    {itemStr == '付款详情' && <ShouleOutDet 
                                                selectedShopID = {shopMess}
                                                selectDate = {nowTime}
                                                nowCurryCode = {nowCurryCode}
                                                tradeType = {tradeType}
                                                />}
                    {itemStr == '银行卡' && <BankDet 
                                                selectedShopID = {shopMess}
                                                selectDate = {nowTime}
                                                nowCurryCode = {nowCurryCode}
                                                tradeType = {tradeType}
                                                />}                            
                </div>}
            </div>
        );
    }
}

export default Assets;