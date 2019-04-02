import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Incom.css';
import handStr from '../../../../../tools/handStr';
import myAjax from '../../../../../tools/myAjax';
class Incom extends Component{
    constructor(props){
        super(props);
        this.shopCard = [
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            },
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            },
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            },
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            },
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            },
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            },
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            },
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            },
            {
                accoumtName : '小花',
                shopName : '店铺1',
                bankName : '中国建设银行深圳分行',
                shopCardCode : '6217 0072 0007 3805 585',
            }
        ]
        this.state = {
            //客户预付款信息
            advancePayArr : '',
            //待收款记录
            stayIncom : '',
            //确认标记
            sconfirmArr : ''
        }
        //待收款 记录表头
        this.items = {
            exchangeTime : '交易时间',
            transferFromID : '订单编号',
            customerName : '客户名',
            shopName : '店铺名',
            accountName : '店铺卡账户名',
            bankName : '店铺卡开户行',
            cardID : '店铺收款卡号',
            currencyCode : '待收币种',
            amount : '待收金额'
        }
        //确认标记
        this.confirmArr = [];
    }
    componentDidMount(){
        var advancePay = [
            {
               currencyCode : '港币',
               advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            },            
            {
                currencyCode : '港币',
                advance : '1232'
            }
        ]
        var list = [
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            },
            {
                customerID : '123',
                simpleName : '店铺全称',
                customerName : '客户名',
                exchangeTime : '20180506', 
                'transferFromID' : '155641254446',
                "shopName" : 112,
                "bankName" : "中国银行",
                "accountName" : "老王",
                "cardID" : "6213471011000956110",
                "currencyCode" : "USD",
                "amount" : "100"
            }
        ]
        list.forEach((ele, index) => {
            this.confirmArr.push(true);
        });
        // myAjax({
        //     type : 'GET',
        //     url : '/shop/getShopTransferFrom',
        //     data :{
        //         appID :'web',
        //         lan : 'CN',
        //         timemstamp : new Date(),
        //         customerID : ''   
        //     },
        //     success : this.handFirstAjax
        // });   
        this.setState({
            advancePayArr : advancePay,
            stayIncom : list,
            sconfirmArr : this.confirmArr
        });
    }
    //读取应收款单信息 函数
    handFirstAjax = (data) => {
        var list = data.list;
        var _this = this;
        if(data.list.length != 0){
            list.forEach((ele, index) => {
                _this.confirmArr.push(true);
            });
            _this.setState({
                stayIncom : list,
                sconfirmArr : _this.confirmArr
            });
        }
    }
    //处理确认操作
    handConfirm = (mess, index) => {
        var _this = this;
        if(_this.confirmArr[index]){
            var dataObj = {
                transferFromID : mess.transferFromID,
                userID : '',
                currencyCode :  mess.currencyCode,
                amount : mess.amount,
                customerID : mess.customerID,
                appID : 'web',
                lan : 'CN',
                timemstamp : new Date(),
                token : ''
            };

            _this.confirmArr[index] = false;
            _this.setState({
                sconfirmArr : _this.confirmArr.map(ele => ele)
            });
        // myAjax({
        //     type : 'GET',
        //     url : '/shop/addShopTransferFromDetail',
        //     data : dataObj,
        //     success : _this.handConfirmAjax
        // });  
        }else{
            return;
        }
    }
    //处理确认 ajax成功
    handConfirmAjax = (data) => {
        console.log(data);
    }
    render(){
        const { 
                shopCard,
                items,
                handConfirm
        } = this;
        const {
            advancePayArr,
            stayIncom,
            sconfirmArr
        } = this.state;
        // console.log('调用的工具函数：',handStr);
        return(
            <div className='incom'>
                <div className='incom__title'>待收款订单处理</div>
                <div className='incom__select'>
                    <span>请选择店铺:</span>
                    <div>下拉列表</div>
                </div>
                <div className='incom__query'>
                    <span>搜索客户未结算订单:</span>
                    <input type="text"/>
                    <div className='incom__query__calendar'>日历</div>
                    <div className='incom__query__quer'>查&nbsp;&nbsp;询</div>
                </div>
                <div className='incom__customerpay'>
                    <div className='incom__customerpay__it'>
                        <div className='incom__customerpay__it__temp'>
                            无预付款
                        </div>
                        <div className='incom__customerpay__it__temp'>
                            有预付款
                        </div>
                    </div>
                    <span className='incom__customerpay__tirps'>提示信息：</span>
                    <div className='incom__customerpay__no'>
                        <div className='incom__customerpay__no__item1'>
                            <div className='incom__customerpay__no__item1__it'>
                                <span className='incom__customerpay__no__item1__it__it1'>
                                    客户名:
                                </span>
                                <span className='incom__customerpay__no__item1__it__it2'>
                                    小狗收到货
                                </span>
                            </div>
                            <div className='incom__customerpay__no__item1__ir'>
                                <span className='incom__customerpay__no__item1__ir__ir1'>
                                    已付金额:
                                </span>
                                <input type="text"/>
                                <span className='incom__customerpay__no__item1__ir__ir2'>
                                    币种
                                </span>
                            </div>
                        </div>
                        <div className='incom__customerpay__no__have'>
                            <div className='incom__customerpay__no__have__tirps'>已付预付款：</div>
                            <div className='incom__customerpay__no__have__box'>
                                {
                                    advancePayArr != '' && advancePayArr.map((ele, index) => {
                                        return <span key={ele + index}>
                                            {ele.advance + ' ' + ele.currencyCode}</span>
                                    })
                                }
                            </div>
                        </div>
                        <div className='incom__customerpay__no__item2'>
                            <span className='incom__customerpay__no__item2__it1'>
                                {'已选店铺收款卡信息>>'}
                            </span>
                            <div className='incom__customerpay__no__item2__warp'>
                                <div className='incom__customerpay__no__item2__warp__wap'>
                                    {shopCard.map((ele, index) => {
                                        return <div className='incom__customerpay__no__item2__it2' key={ele + index}>
                                        <div className='incom__customerpay__no__item2__it2__ir1'>
                                            <span className='itemsname'>
                                                店铺名:
                                            </span>
                                            <span className='incom__customerpay__no__item2__it2__ir1__i1 itemitem'>
                                                {ele.shopName}
                                            </span>
                                        </div>
                                        <div className='incom__customerpay__no__item2__it2__ir1'>
                                            <span className='itemsname'>
                                                账户名:
                                            </span>
                                            <span className='incom__customerpay__no__item2__it2__ir1__i1 itemitem'>
                                                {ele.accoumtName}
                                            </span>
                                        </div>
                                        <div className='incom__customerpay__no__item2__it2__ir1 '>
                                            <span className='itemsname'>
                                                开户行:
                                            </span>
                                            <span className='incom__customerpay__no__item2__it2__ir1__i2 itemitem'>
                                                {ele.bankName}
                                            </span>
                                        </div>
                                        <div className='incom__customerpay__no__item2__it2__ir1'>
                                            <span className='itemsname'>
                                                卡号:
                                            </span>
                                            <span className='incom__customerpay__no__item2__it2__ir1__i3 itemitem'>
                                                {ele.shopCardCode}
                                            </span>
                                        </div>
                                    </div>
                                    })}
                                </div>
                            </div>
                        </div>                      
                    </div>
                </div>  
                <div className='incom__table'>
                    <table>
                        <thead>
                            <tr>
                                <th>{items.exchangeTime}</th>
                                <th>{items.transferFromID}</th>
                                <th>{items.customerName}</th>
                                <th>{items.shopName}</th>
                                <th>{items.accountName}</th>
                                <th>{items.bankName}</th>
                                <th>{items.cardID}</th>
                                <th>{items.amount}</th>
                                <th>收款确认</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                stayIncom != '' && stayIncom.map((ele, index) => {
                                    return <tr key={ele.transferFromID + index}>
                                        <td>{handStr.timeStr1(ele.exchangeTime)}</td>
                                        <td>{ele.transferFromID&&ele.transferFromID}</td>
                                        <td>{ele.customerName&&ele.customerName}</td>
                                        <td>{ele.shopName&&ele.shopName}</td>
                                        <td>{ele.accountName&&ele.accountName}</td>
                                        <td>{ele.bankName && ele.bankName}</td>
                                        <td>{ele.cardID&&handStr.bankCode(ele.cardID)}</td>
                                        <td>{ele.amount  + ' ' + ele.currencyCode}</td>
                                        <td><i  className={`${!sconfirmArr[index] && 'confirmed'}`}
                                                onClick={e => {handConfirm(ele, index)}}
                                                >{sconfirmArr[index] ? '确认' : '已确认'}
                                            </i>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>                                 
            </div>
        );
    }
}

export default Incom;