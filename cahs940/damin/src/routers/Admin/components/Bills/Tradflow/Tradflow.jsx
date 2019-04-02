import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import Calendar from 'react-calendar';
import './Tradflow.css';
import Mycalendar from '../../../../../components/Mycalendar/Mycalendar';
import DropList from '../../../../../components/DropList/DropList';
import ZDX from './ZDX/ZDX';
import XDZ from './XDZ/XDZ';
// import ZDZ from './ZDZ/ZDZ';
class Tradflow extends Component{
    constructor(props){
        super(props);
        this.shopData = [
            { mark : 'shopID1', name : '小店一'},
            { mark : 'shopID2', name : '小店二'},
            { mark : 'shopID3', name : '小店三'},
            { mark : 'shopID4', name : '小店四'},
            { mark : 'shopID5', name : '小店五'},
            { mark : 'shopID6', name : '小店六'},
            { mark : 'shopID7', name : '小店七'},
            { mark : 'shopID8', name : '小店八'},
            { mark : 'shopID9', name : '小店九'},
            { mark : 'shopID10', name : '小店十'},
            { mark : 'shopID11', name : '小店11'},
            { mark : 'shopID12', name : '小店12'},
            { mark : 'shopID13', name : '小店13'},
            { mark : 'shopID14', name : '小店14'},
            { mark : 'shopID15', name : '小店15'},
            { mark : 'shopID16', name : '小店16'},
            { mark : 'shopID17', name : '小店17'},
            { mark : 'shopID18', name : '小店18'},
            { mark : 'shopID19', name : '小店19'},
            { mark : 'shopID20', name : '小店20'},
            { mark : 'shopID21', name : '小店21'},
            { mark : 'shopID22', name : '小店22'},
            { mark : 'shopID23', name : '小店23'},
            { mark : 'shopID24', name : '小店24'}
        ];
        this.shopExchangeItems = {
            exchangeID : '订单号',
            cTime : '交易时间',
            customerName : '客户名',
            inAmount : '币种/买入金额',
            outAmount : '币种/卖出金额',
            rate : '交易汇率',
            exchangeType : '交易类型',  
            status : '订单状态',
            operation : '操作'        
        }; 
        this.shopExchange = [
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"转账对现金",
                "customerID":0,
                "customerName":'老或来王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"未完成",
                "exchangeType":"现金对转账",
                "customerID":0,
                "customerName":'老或来王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"待付款",
                "exchangeType":"现金对转账",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"待收款",
                "exchangeType":"转账对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"未完成",
                "exchangeType":"转账对现金",
                "customerID":0,
                "customerName":'老或来王来',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"未完成",
                "exchangeType":"转账对转账",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            },
            {
                "exchangeID":"20180927000001001100006",
                "inAmount":5000000,
                "outAmount":641600,
                "rate":7.79404,
                "status":"正常",
                "exchangeType":"现金对现金",
                "customerID":0,
                "customerName":'老王',
                "referenceExchangeID":null,
                "cTime":"2018-09-27 12:17",
                "inCurrencyName":"港币",
                "outCurrencyName":"美元"   
            }
        ];
        //为客户汇款信息数组1
        this.custRemitArrs = [
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            },
            {
                accountName : '大米',
                bankName :'中国民生银行深圳分行',
                shopCardCode : '622908333065904228'
            }
        ];
        //存放选择的客户卡数组
        this.sCustCardArr = [];
        //和方法 输入金额数组
        this.andInputArr = [];
        this.state = {
            currShopID : this.shopData[0].mark,
            startTime : new Date(),
            endTime : new Date(),
            // //自带
            // bring : '',
            // //自取
            // take : '',
            // //手续费币种
            // commissionCurrencyCode : '',
            // //手续费
            // commission : '',
            // //客户卡号 数组
            // customerCards : [],
            // //客户卡对应的钱数 数组
            // customerMoerys:[], 


            //订单ID
            exchangeID : '',
            //客户ID
            customerID:'',
            //交易流水单条记录卖出币种
            outCurrencyName : '',
            //补单组件中的卖出币种 
            outCurrencyCode : '',
            //单条交易记录卖出
            outAmount : '',
            //交易流水单条记录买入币种
            inCurrencyName : '',
            //补单组件中的买入币种
            inCurrencyCode : '',
            //单条交易记录买入
            inAmount : '',


            //店铺卡号
            shopCard : '',
            //店铺ID
            shopID : '',
            //发给后端的数据：0转账对现金，1转账对转账，2现金对转账
            type : '',
            //'web'
            appID : 'web',
            //'CN'
            lan : 'CN',

            // //时间戳
            // timemstamp
            // token 
            //为客户汇款信息数组2
            custRemitArr : '',
            
            //未完成状态，补单模块标志
            addBillFlag : false,
            //代付款状态，付款模块
            waitPayFlag : false,
            //代收款状态，收款模块
            waitGetFlag : false,
            //已选择的客户卡数组
            selectedCustomerCard : [],
            //选择的汇款方式
            selectedMethod : '或',
            //自带金额
            bringMoney : '',
            //自取金额
            takeMoney : '',
            //手续费
            commission : '',
            //和方法 输入金额数组
            sandInputArr : [],
            //和方法 分配后的剩余金额
            outSaldo : '',

            //店铺卡号
            SshopCard : '',
            //店铺卡账户名
            SaccountName:'',
            //店铺卡开户地
            SbankAddress:'',
            //店铺卡开户行 名 代码
            SbankCode:'',
            SbankName:'',
            //店铺名 ID
            SshopName:'',
            SshopID:''
        }
    }
    componentDidMount(){
        this.setState({
            custRemitArr : this.custRemitArrs
        });
    }
    setStartT = (date) => {
        this.setState({
            startTime : date
        });
    }
    setEndT = (date) => {
        this.setState({
            endTime : date
        });
    }
    selectedShopiD = ( currshopID ) => {
        this.setState({
            currShopID : currshopID
        });
    }
    setStatusColor = ( status ) => {
        var fontColorClass ;
        switch(status){
            case '未完成' : fontColorClass = 'coloryellow';
            break;
            case '待付款' : fontColorClass = 'colorred';
            break;
            case '待收款' : fontColorClass = 'colorgreen';
            break;
            default:
                fontColorClass = '';
        }
        // console.log('状态的颜色：', fontColorClass);
        return fontColorClass;
    }
    //获取非正常状态下的交易记录信息
    getBillRecord = (obj) => {
        if(obj.status == '正常'){
            return;
        }else{
            //需要传到补单组件中的数据：
            //exchangeID 订单ID
            //customerName 客户名
            //customerID 客户ID
            //type 交易类型
            //店中收汇款(即客户向店汇款)ZDN:ZDX、ZDZ
            //inCurrencyName 买入币种
            //inAmount 买入额度
            //客户收汇款(即店向客户汇款)NDZ:XDZ、ZDZ
            //outCurrencyName 卖出币种
            //outAmount 买入额度
            this.setState({
                customerID : obj.customerID,
                exchangeID : obj.exchangeID,
                customerName : obj.customerName,
                inAmount : obj.inAmount,
                outAmount : obj.outAmount,
                inCurrencyName : obj.inCurrencyName,
                outCurrencyName : obj.outCurrencyName,
                type : obj.exchangeType,
                outSaldo : obj.outAmount
            });
            if( obj.status == '未完成' ){
                this.setState({
                    addBillFlag : true
                }); 
            }else if( obj.status == '待付款' ){
                this.setState({
                    waitPayFlag : true
                });
            }else if( obj.status == '待收款' ){
                this.setState({
                    waitPayFlag : true
                });
            }
        }
    }
    //已添加补单信息中处理选择卡号
    handSshopCardCode = (str) => {
        var strArr = (str + '').match(/\d{1,4}/g);
        return strArr[0] + '***' + strArr[strArr.length - 1];
    }
    //设置是否显示补单界面
    setAddBillFlag = (e) => {
        this.setState({
            addBillFlag : false
        });
    }
    //选择定的用户卡
    getCustomerBankCards = (messObj) => {
        const { selectedMethod, outAmount } = this.state;
        console.log('获取用户卡信息');
        const { sCustCardArr, andInputArr } = this;
        sCustCardArr.push({
            cardID : messObj.cardID,
            bankCode : messObj.bankCode, 
            bankName : messObj.bankName,           
            accountName : messObj.accountName,
            shopCardCode : messObj.shopCardCode,
            accountAddress : messObj.accountAddress,          
        });
        if( selectedMethod == '和' ){
            andInputArr.push('');
        }else{
            andInputArr.push(outAmount);
        }
        this.setState({
            selectedCustomerCard :  sCustCardArr.map(ele => ele),
            sandInputArr : andInputArr.map(ele => ele)
        });
    }
    //选定的汇款方法
    setSelectedMethod = (flagStr) => {
        this.setState({
            selectedMethod : flagStr
        });

    }
    //获取自带金额
    getBringMoney = (str) => {
        this.setState({
            bringMoney : str
        });
    }
    //获取自取金额
    getTakeMoney = (str) => {
        this.setState({
            takeMoney : str
        });
    }
    //获取手续费
    getCommission = (str) => {
        this.setState({
            commission : str
        });        
    }
    //设置单个卡的金额
    setAndIuptArr = (index, str) => {
        var { outAmount } = this.state;
        var tempSaldo = Number(outAmount);
        this.andInputArr[index]  =  str;
        this.setState({
            sandInputArr : this.andInputArr.map(ele => ele)
        });
        this.andInputArr.forEach((ele, index) => {
            tempSaldo = tempSaldo - Number(ele);
        });
        // console.log('分配后余额:', tempSaldo);
        this.setState({
            outSaldo : tempSaldo + ''
        });
    }
    //获取店铺卡信息
    getShopCardMess = (dataObj) => {
        this.setState({
            //店铺卡号
            SshopCard : dataObj.shopCardCode,
            //店铺卡账户名
            SaccountName : dataObj.accountName,
            //店铺卡开户地
            SbankAddress : dataObj.bankAddress,
            //店铺卡开户行 代码 名
            SbankCode : dataObj.bankCode,
            SbankName : dataObj.bankName,
            //店铺名 ID
            SshopName : dataObj.shopName,
            SshopID : dataObj.shopID,
        });
    }
    //提交信息
    submitMess = (e) =>{
        //Ajax
        
        this.setState({
            //已选择的客户卡数组
            selectedCustomerCard : [],
            //选择的汇款方式
            selectedMethod : '或',
            //自带金额
            bringMoney : '',
            //自取金额
            takeMoney : '',
            //手续费
            commission : '',
            //和方法 输入金额数组
            sandInputArr : [],
            //和方法 分配后的剩余金额
            outSaldo : '',
            //店铺卡号
            SshopCard : '',
            //店铺卡账户名
            SaccountName:'',
            //店铺卡开户地
            SbankAddress:'',
            //店铺卡开户行 名 代码
            SbankCode:'',
            SbankName:'',
            //店铺名 ID
            SshopName:'',
            SshopID:'',
            //订单ID
            exchangeID : '',
            //客户ID
            customerID:'',
            //交易流水单条记录卖出币种
            outCurrencyName : '',
            //补单组件中的卖出币种 
            outCurrencyCode : '',
            //单条交易记录卖出
            outAmount : '',
            //交易流水单条记录买入币种
            inCurrencyName : '',
            //补单组件中的买入币种
            inCurrencyCode : '',
            //单条交易记录买入
            inAmount : '',
        });
        this.andInputArr = [];
    }
    render(){
        const { 
                startTime, 
                endTime, 
                currShopID,
                //单笔交易记录
                exchangeID,
                customerName,
                inAmount,
                outAmount,
                outCurrencyName,
                inCurrencyName,
                type,
                custRemitArr,
                addBillFlag,
                customerID,
                //已选的客户卡
                selectedCustomerCard,
                //已选的汇款方法
                selectedMethod,
                //自带金额
                bringMoney,
                //自取金额
                takeMoney,
                //手续费
                commission,
                ////和方法 输入金额数组
                sandInputArr,
                //和方法 分配后的剩余金额
                outSaldo,

                //店铺卡号
                SshopCard,
                //店铺卡账户名
                SaccountName,
                //店铺卡开户地
                SbankAddress,
                //店铺卡开户行
                SbankName
        } = this.state;
        const { 
                shopData, 
                selectedShopiD, 
                shopExchangeItems, 
                shopExchange, 
                setStatusColor, 
                getBillRecord,
                getCustomerBankCards,
                //已选的客户卡
                sCustCardArr,
                //选定的汇款方法
                setSelectedMethod,
                //获取自带金额
                getBringMoney,
                //获取自取金额
                getTakeMoney,
                //获取手续费
                getCommission,
                //设置单个卡的金额
                setAndIuptArr,
                //获取店铺卡信息
                getShopCardMess,
                andInputArr
            } = this;
        // console.log('单笔交易订单编号：', exchangeID);
        // console.log('单笔交易客户名：', customerName);
        // console.log('单笔交易买入：', inAmount);
        // console.log('单笔交易卖出：', outAmount);
        // console.log('单笔交易卖出币种：', outCurrencyName);
        // console.log('单笔交易类型：', type);
        // console.log('外部时间start：',formatDate('{year}/{month}/{day}', startTime));
        // console.log('外部时间end：',formatDate('{year}/{month}/{day}', endTime));
        // console.log('currShopID：', currShopID);
        // console.log('已选择的客户卡1：', sCustCardArr);
        // console.log('已选择的客户2：', selectedCustomerCard);
        // console.log('已选的汇款方法：',  selectedMethod);
        // console.log('输入的金额：', andInputArr);
        return(
            <div className='tradflow'>
                <h2 className='tradflow__top'>日常交易流水</h2>
                <div className='tradflow__content'>
                    <div className='tradflow__content__seleshop'>
                        <span>请选择您要查看的店铺：</span>
                        <div className='tradflow__content__seleshop__iconbox'>
                            <DropList   data={shopData}
                                        callFuc={selectedShopiD}
                                        iconHeight='1.3em'
                                        opWarpPosTop='1.3em'
                                        opWarpwidth='8em'
                                        opheight='1em'
                                        />
                        </div>
                    </div>
                    <div className='tradflow__content__setdate'>
                    <span className='tradflow__content__setdate__label'>请选择您要查询的时间：</span>
                    <Mycalendar 
                        getDateFuc={this.setStartT}
                        timeMess={'开始日期:'}
                    />
                    <Mycalendar 
                        getDateFuc={this.setEndT}
                        timeMess={'结束日期:'}
                        mDate={startTime}
                    />
                    </div>
                    <div className='tradflow__content__tablewarp'>
                        <table className ='tradflow__content__tablewarp__table'>
                            <thead>
                                <tr>
                                    <th>{shopExchangeItems.exchangeID}</th>
                                    <th>{shopExchangeItems.cTime}</th>
                                    <th>{shopExchangeItems.customerName}</th>
                                    <th>{shopExchangeItems.inAmount}</th>
                                    <th>{shopExchangeItems.outAmount}</th>
                                    <th>{shopExchangeItems.rate}</th>
                                    <th>{shopExchangeItems.exchangeType}</th>
                                    <th>{shopExchangeItems.status}</th>
                                    <th>{shopExchangeItems.operation}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    shopExchange && shopExchange.map((ele, index) => {
                                        return <tr key={ele+''+index}>
                                            <td>{ele.exchangeID}</td>
                                            <td>{ele.cTime}</td>
                                            <td>{ele.customerName}</td>
                                            <td className='income'>{ele.inCurrencyName}&nbsp;&nbsp;{ele.inAmount}</td>
                                            <td className='say'>{ele.outCurrencyName}&nbsp;&nbsp;{ele.outAmount}</td>
                                            <td>{ele.rate}</td>
                                            <td>{ele.exchangeType}</td>
                                            <td><i  className={setStatusColor(ele.status)}
                                                    onClick={(e) => { getBillRecord(ele)}}
                                                    >{ele.status}
                                                </i>
                                            </td>
                                            <td><span>操作1</span><span>操作2</span><span>操作3</span></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                { addBillFlag && <div className='tradflow__operation'>
                    <div className='closebox' onClick={this.setAddBillFlag}></div>
                    <div className='tradflow__operation__content'>
                        {
                            (type == '转账对现金') && <ZDX
                                getShopCardMess = {getShopCardMess}
                            />
                        }
                        {
                            (type == '现金对转账') && <XDZ dataObj = {
                                {   exchangeID : exchangeID,
                                    customerName : customerName,
                                    outAmount : outAmount,
                                    outCurrencyName : outCurrencyName,
                                    customerID : customerID
                                }}
                                getCustomerBankCards = {getCustomerBankCards}
                                setSelectedMethod = {setSelectedMethod}
                                getBringMoney = {getBringMoney}
                                getTakeMoney = {getTakeMoney}
                                getCommission = {getCommission}
                            />
                        }
                        {
                            (type == '转账对转账') && <div className='tradflow__operation__content__ZDZ'>
                                <div className='tradflow__operation__content__ZDZ__item1'>
                                    <XDZ dataObj = {
                                        {   exchangeID : exchangeID,
                                            customerName : customerName,
                                            outAmount : outAmount,
                                            outCurrencyName : outCurrencyName,
                                            customerID : customerID
                                        }}
                                        getCustomerBankCards = {getCustomerBankCards}
                                        setSelectedMethod = {setSelectedMethod}
                                        getBringMoney = {getBringMoney}
                                        getTakeMoney = {getTakeMoney}
                                        getCommission = {getCommission}
                                    />
                                </div>
                                <div className='tradflow__operation__content__ZDZ__item1 tirusd'>
                                    <ZDX
                                        getShopCardMess = {getShopCardMess}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    <div className='tradflow__operation__bottom'>
                        <div className='tradflow__operation__bottom__item'>
                            <div className='tradflow__operation__bottom__item__title'>
                                已添加的补单信息
                            </div>
                            <div className='tradflow__operation__bottom__item__re1'>
                                <div>客户名:<span  className='tobirname'>{customerName}</span></div>
                                { (type == '转账对现金' || type == '转账对转账') && <div>待收款金额:<span className='tobirmoney'>{inAmount} {inCurrencyName}</span></div>}
                                { (type == '现金对转账' || type == '转账对转账') && <div>待付款金额:<span className='tobirmoney'>{outAmount} {outCurrencyName}</span></div>}
                                {(type == '现金对转账' || type == '转账对转账') && <div>自带:<span className='tobirbring'>{bringMoney}</span></div>}
                                {(type == '现金对转账' || type == '转账对转账') && <div>自取:<span className='tobirtake'>{takeMoney}</span></div>}
                                {(type == '现金对转账' || type == '转账对转账') && <div>手续费:<span className='tobircost'>{commission} 币种</span></div>}
                                {(type == '现金对转账' || type == '转账对转账') && <div>汇款方式:<span className='tobirmethod'>{selectedMethod}</span></div>}
                            </div>
                            <div className='tradflow__operation__bottom__item__re2'>
                                <div className='tradflow__operation__bottom__item__re2__item1'>
                                    <div className='tradflow__operation__bottom__item__re2__item1__title'>
                                        已选择客户收款卡&nbsp;&nbsp;&nbsp;
                                        { selectedMethod === '和' && ('分配剩余金额' + outSaldo)}
                                    </div>
                                    <div className='tradflow__operation__bottom__item__re2__item1__content'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>账户名</th>
                                                    <th>开户行</th>
                                                    <th>卡号</th>
                                                    <th>汇款额度</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { selectedCustomerCard.length != 0 && selectedCustomerCard.map( (ele, index) => {
                                                    return <tr key={ele + '' + index}>
                                                                <td>{ele.accountName}</td>
                                                                <td>{ele.bankName}</td>
                                                                <td>{this.handSshopCardCode(ele.shopCardCode)}</td>
                                                                <td className='inputbox'>
                                                                    {selectedMethod == '或' && outAmount}
                                                                    {selectedMethod == '和' && <input type="text"
                                                                        value={sandInputArr[index]} 
                                                                        onChange={ e => { setAndIuptArr(index, e.target.value)}}/>}
                                                                </td>
                                                    </tr> 
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div  className='tradflow__operation__bottom__item__re2__item2'>
                                    <div className='tradflow__operation__bottom__item__re2__item2__title'>
                                        已选择店铺收款卡
                                    </div>
                                    <div className='tradflow__operation__bottom__item__re2__item2__content'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>账户名</th>
                                                    <th>开户行</th>
                                                    <th>卡号</th>
                                                    <th>汇款额度</th> 
                                                </tr>                                           
                                            </thead>
                                            {   SaccountName != '' &&<tbody>
                                                <tr>
                                                    <td>{SaccountName}</td>
                                                    <td>{SbankName}</td>
                                                    <td>{SshopCard && this.handSshopCardCode(SshopCard)}</td>
                                                    <td>{inAmount}</td>
                                                </tr>
                                            </tbody>}
                                        </table>
                                        <div    className='tradflow__operation__bottom__item__re2__item2__content__sub'
                                                onClick={this.submitMess}>
                                                提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交
                                        </div>
                                        <span className='tradflow__operation__bottom__item__re2__item2__content__tript'>
                                            提示信息
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default Tradflow;