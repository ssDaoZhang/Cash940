// exchangeID订单交易ID
// appID 软件序列号
// lan 语言
// timestamp时间戳
// token 
//路径：'/exchange/getExchangeDetail'
//this.props.summary 自带自取
//this.props.tradeID 订单编号 
//this.props.callFuc 关闭弹窗
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './TradeDet.css';
import myAjax from '../../../../../../tools/myAjax';

class TradeDet extends Component{
    constructor(props){
        super(props);
        this.state = {
            //收的信息
            inMessObj:'',
            //出的信息
            outMessObj:'',
            //订单信息
            orderMess : ''
        };
    }
    componentDidMount(){
        // var data = {
        //     shopExchange:{
        //         //--交易流水
        //         "exchangeID":"20180927000001001100006",
        //         "inAmount":5000000,
        //         "outAmount":641600,
        //         "rate":7.79404,
        //         "status":"正常",
        //         "exchangeType":"现金对现金",
        //         "customerID":0,
        //         'customerContact':'客户联系方式',
        //         "customerName":'老王',
        //         "referenceExchangeID":null,
        //         "cTime":"2018-09-27 12:17",
        //         "inCurrencyName":"港币",
        //         "outCurrencyName":"美元",
        //         "commission":10000,
        //         "commissionCurrencyCode":'手续费币种代码',
        //         "commissionCurrencyName":'手续费币种名',
        //         take:0,
        //         bring:1,
        //         "shopName":"店铺全称",
        //         "simpleName":"店铺简称",
        //         "address":"店铺地址",
        //         "contact":"联系方式",
        //         "nickName":"昵称",
        //         "name":"名称",
        //         //--收款数据结构
        //         "accountName":"账户名",
        //         "bankName":"银行名称",
        //         "amount":1000000000,
        //         "currencyCode":"收款币种",
        //         "shopCardCode":"2222222222222222222"
        //     },
        //     "list": [{
        //              //--付款数据结构
        //             transferToID:'流水号',
        //             amount:1000000000,
        //             cards:'11111111111111111',
        //             bankCode:'11111111111111111',
        //             bankName:'客户银行卡名称',
        //             accountName:'卡账户名',
        //             customerName:'客户名称'
        //     }],
        //     'statusCode':0,  //0成功 1失败
        //     'detailMsg':'ok'               
        // }
        // this.handDetData(data);
        myAjax({
            url : '/exchange/getExchangeDetail',
            data : {
                appID : JSON.parse(sessionStorage['appID']),
                //语言
                lan :'zh_CN', 
                //时间戳
                timestamp : new Date().getTime(),
                token : JSON.parse(sessionStorage['token']),
                exchangeID : this.props.tradeID       
            },
            type : 'GET',
            success : this.handDetData,
        });
    }
    handDetData = (data) => {
        console.log('流水详情111111111111:', data);
        if(data.statusCode == 0){
            var inmess, outmess, ordermess;
            inmess = {
                //店铺账户名
                accountName : data.shopExchanges[0].accountName || '',
                //店铺卡银行名
                bankName : data.shopExchanges[0].bankName || '',
                //店铺卡号
                shopCardCode : data.shopExchanges[0].shopCardCode ? this.handCodeMoney(data.shopExchanges[0].shopCardCode) : '',
                //币种
                currencyCode : data.shopExchanges[0].currencyCode || '',
                //店铺名
                shopName : data.shopExchanges[0].shopName || data.shopExchanges[0].simpleName || '',
                //店铺地址
                address : data.shopExchanges[0].address || '',
                //联系方式
                contact :  data.shopExchanges[0].contact || '',
                //收款卡收入金额
                amount : data.shopExchanges[0].amount ? this.handCodeMoney(data.shopExchanges[0].amount) : '',               
            };
            if(data.shopExchanges[0].transferTos.length != 0){
                outmess = {
                    //流水号
                    transferToID : data.shopExchanges[0].transferTos[0].transferToID || '',
                    //客户汇款金额
                    amount : data.shopExchanges[0].transferTos[0].amount ? this.handCodeMoney(data.shopExchanges[0].transferTos[0].amount) : '',
                    //客户卡号
                    cards : data.shopExchanges[0].transferTos[0].cards ? this.handCodeMoney(data.shopExchanges[0].transferTos[0].cards) : '',
                    //客户银行代码
                    bankCode : data.shopExchanges[0].transferTos[0].bankCode || '',
                    //客户银行卡名称
                    bankName : data.shopExchanges[0].transferTos[0].bankName || '',
                    //卡账户名
                    accountName : data.shopExchanges[0].transferTos[0].accountName || '',
                    //客户名称
                    customerName : data.shopExchanges[0].transferTos[0].customerName || '',
                    //客户联系方式
                    contact : data.shopExchanges[0].transferTos[0].contact || ''
                };
            }else{
                outmess = {
                    //流水号
                    transferToID : '',
                    //客户汇款金额
                    amount :  '',
                    //客户卡号
                    cards : '',
                    //客户银行代码
                    bankCode :  '',
                    //客户银行卡名称
                    bankName :  '',
                    //卡账户名
                    accountName : '',
                    //客户名称
                    customerName :  '',
                    //客户联系方式
                    contact : ''
                };
            }
            ordermess = {
                //订单编号
                tradeID : this.props.tradeID || '',
                //买入金额
                inAmount : data.shopExchanges[0].inAmount ? this.handCodeMoney(data.shopExchanges[0].inAmount) :  '',
                //买入币种
                inCurrencyName : data.shopExchanges[0].inCurrencyName || '',
                inCurrencyCode : data.shopExchanges[0].inCurrencyCode || '',
                //买入汇率
                buyRate : data.shopExchanges[0].buyRate,

                //卖出金额
                outAmount : data.shopExchanges[0].outAmount ? this.handCodeMoney(data.shopExchanges[0].outAmount) : '',
                //卖出币种
                outCurrencyName : data.shopExchanges[0].outCurrencyName || '',
                outCurrencyCode : data.shopExchanges[0].outCurrencyCode || '',
                //卖出汇率
                sellRate : data.shopExchanges[0].sellRate || '',

                //交易类型
                exchangeType : data.shopExchanges[0].exchangeType || '',
                //店铺名
                shopName : data.shopExchanges[0].shopName || data.shopExchanges[0].simpleName || '',
                //操作人
                name : data.shopExchanges[0].name || data.shopExchanges[0].nickName || '',
                //交易时间
                cTime : data.shopExchanges[0].cTime ? formatDate( '{year}-{month}-{day} {hours}:{minutes}:{seconds} {day-name}', new Date(data.shopExchanges[0].cTime)) : '',
                //自取
                take : data.shopExchanges[0].take != 0 ? this.props.summary : '',
                //自带
                bring : data.shopExchanges[0].bring != 0 ? this.props.summary : '',
                //手续费
                //手续费金额
                commission : data.shopExchanges[0].commission ? this.handCodeMoney(data.shopExchanges[0].commission) : '',
                //手续费币种代码
                commissionCurrencyCode : data.shopExchanges[0].commissionCurrencyCode || '',
                //手续费币种名
                commissionCurrencyName : data.shopExchanges[0].commissionCurrencyName || ''
            }
            this.setState({
                outMessObj : outmess,
                inMessObj : inmess,
                orderMess : ordermess,
            });
        }
    }
    //处理卡号和金额
    handCodeMoney = (para) => {
        var outstr;
        if(typeof(para) == 'number'){
            var numstr = para/100 + '';
            outstr = numstr.match(/\d{1,3}/g).join(',');
            
        }else if(typeof(para) == 'string'){
            outstr = para.match(/\d{1,4}/g).join(' ');
        }
        return outstr;
    }
    render(){
        const { outMessObj, inMessObj, orderMess} = this.state;
        console.log('客户：', outMessObj);
        console.log('店铺:', inMessObj);
        console.log('订单:', orderMess);
        return (
            <div    className='tradedet'>
                <div className='tradedet__top'>
                    <div className='tradedet__top__title'>{ (orderMess.shopName || '') + '订单详情'}</div>
                    <div className='tradedet__top__content'>
                        <div className='tradedet__top__content__item1'>{  '交易类型: '  + (orderMess.exchangeType || '')}</div>
                        <div className='tradedet__top__content__item2'>
                            <span>{ '订单编号: ' + orderMess.tradeID}</span>
                            <span>{ '操作人: '  + orderMess.name }</span>
                            <span>{ '交易时间：'  + orderMess.cTime}</span>
                        </div>
                        <div className='tradedet__top__content__item3'>
                            <div className='tradedet__top__content__item3__it1 borderred'>
                                <div className='tradedet__top__content__item3__it1__i1 fontred'>
                                    { '买入: ' + (orderMess.inAmount ? orderMess.inAmount + ' ' + orderMess.inCurrencyCode : '')}
                                </div>
                                <div className='tradedet__top__content__item3__it1__i2'>
                                    <span>{'买入汇率: ' + orderMess.buyRate}</span>
                                    <span>{'手续费: ' + (orderMess.commission ? orderMess.commission + ' ' + orderMess.commissionCurrencyCode : '')}</span>
                                    <span>{orderMess.bring || ''}</span>
                                </div>
                            </div>
                            <div className='tradedet__top__content__item3__it1 bordergreen'>
                                <div className='tradedet__top__content__item3__it1__i1 fontgreen'>
                                    { '卖出: ' + (orderMess.outAmount ? orderMess.outAmount + ' ' + orderMess.outCurrencyCode : '')}
                                </div>
                                <div className='tradedet__top__content__item3__it1__i2'>
                                    <span>{'买入汇率: ' + orderMess.sellRate}</span>
                                    <span>{orderMess.take || ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tradedet__content'>
                    <div className='tradedet__content__lr'>
                        <div className='tctitle backgroundred'>店铺相关信息</div>
                        <div  className='tctirps backgroundred'>店铺收款卡信息:</div>
                        <div className='trconitem'>
                            <div className='trconit'>
                                <div className='trconit1 bgred'>
                                    <div className='trconit11'>{'卡账户名: ' + (inMessObj.accountName || '') }</div>
                                    <div className='trconit11'>{'开户行: ' + (inMessObj.bankName || '')}</div>
                                </div>
                                <div className='trconit2'>
                                    {'卡号: ' + (inMessObj.shopCardCode || '')}
                                </div>
                            </div>
                        </div>
                        <div className='moneyred moneystyle'>
                            {'店铺卡收款金额: ' + (inMessObj.amount ? inMessObj.amount + ' ' + orderMess.inCurrencyName : '')}
                        </div>
                        <div className='trconitsx'>
                            {'店铺地址：' + (inMessObj.address || '')}
                        </div>
                        <div className='trconitsx'>
                            {'联系方式：' + (inMessObj.contact || '')}
                        </div>
                    </div>
                    <div className='tradedet__content__lr'>
                        <div className='tctitle backgroundgreen'>客户相关信息</div>
                        <div>
                            <div className='trconitsx'>{'客户名：' + (outMessObj.customerName || '')}</div>
                            <div className='trconitsx'>{'客户联系方式：' + (outMessObj.customerContact || '')}</div>
                            <div className='tctirps backgroundgreen'>客户卡信息:</div>
                            <div className='trconitem'>
                                <div className='trconit'>
                                    <div className='trconit1 bggreen'>
                                        <div className='trconit11'>{'卡账户名: ' + (outMessObj.customerName || '')}</div>
                                        <div className='trconit11'>{'开户行: ' + (outMessObj.bankName || '')}</div>
                                    </div>
                                    <div className='trconit2'>
                                        {'卡号: ' + (outMessObj.cards || '')}
                                    </div>
                                </div>
                            </div>
                            <div className='moneygreen moneystyle'>
                                {'店铺卡付款金额: ' + (outMessObj.amount ? outMessObj.amount + ' ' + orderMess.outCurrencyName : '')}
                            </div>
                        </div>
                    </div>
                </div>
                <div    className='tradedet__close'
                        onClick={e => {this.props.callFuc('', '', false)}}>
                    退出
                </div>
            </div>
        )
    }
}
export default TradeDet;