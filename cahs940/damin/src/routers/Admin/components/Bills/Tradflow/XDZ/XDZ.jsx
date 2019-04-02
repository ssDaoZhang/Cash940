import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './XDZ.css';
import Tablebody from '../Tablebody';
class XDZ extends Component{
    constructor(props){
        super(props);
        this.bankData = {
            'list' : [
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6230580000071278522',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '兴业银行股份',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6230580000071278522',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '平安银行',
                    "simpleBankNam":'平安'
                },
                {
                    'cardID' : 123456,
                    'bankCode' : '156532332284',
                    'shopCardCode' : '6213471011000956110',
                    'accountAddress' : '北京',
                    'accountName' : '小米',
                    'bankName' : '中国民生银行深圳分行',
                    "simpleBankNam":'平安'
                }                
            ]
        };
        this.bankDataArr = [];
        this.custBankCardItem = [
            '账户名',
            '开户行',
            '卡号'
        ];
        this.state = {
            //后端获取的客户卡信息
            customerBankCard : '',
            //自带金额
            bringMoney : '',
            //自取金额
            takeMoney : '',
            //手续费
            commission : ''
        };
    }
    componentDidMount(){
        this.bankData.list.forEach( (ele, index) => {
            this.bankDataArr.push({
                cardID : ele.cardID,
                accountAddress : ele.accountAddress,
                bankName : ele.bankName,
                accountName : ele.accountName,
                bankCode : ele.bankCode,
                shopCardCode : ele.shopCardCode
            });
        })
        this.setState({
            customerBankCard : this.bankDataArr        
        });
    }
    
    //设置自带金额
    setBringMoney = (e) => {
        var valueStr = e.target.value,
            tempStrArr = valueStr.match(/\D/g),
            strFlag ;
        var { getBringMoney }  = this.props;      
        if(tempStrArr){
            strFlag = (tempStrArr.length == 1  && tempStrArr[0] == '.');
        }else{
            strFlag = true;
        }
        if(strFlag){
            this.setState({
                bringMoney : valueStr
            });
            getBringMoney(valueStr);
        }else{
            this.setState({
                bringMoney : ''
            });
            getBringMoney('');
        }
    }
    //设置自取金额
    setTakeMoney = (e) => {
        var valueStr = e.target.value,
            tempStrArr = valueStr.match(/\D/g),
            strFlag ; 
        var {getTakeMoney} = this.props;       
        if(tempStrArr){
            strFlag = (tempStrArr.length == 1  && tempStrArr[0] == '.');
        }else{
            strFlag = true;
        }
        if(strFlag){
            this.setState({
                takeMoney : valueStr
            });
            getTakeMoney(valueStr);
        }else{
            this.setState({
                takeMoney : ''
            });
            getTakeMoney('');
        }
    }
    //设置手续费金额
    setCommission = (e) => {
        var valueStr = e.target.value,
            tempStrArr = valueStr.match(/\D/g),
            strFlag ;        
        var {getCommission} = this.props;
        if(tempStrArr){
            strFlag = (tempStrArr.length == 1  && tempStrArr[0] == '.');
        }else{
            strFlag = true;
        }
        if(strFlag){
            this.setState({
                commission : valueStr
            });
            getCommission(valueStr);
        }else{
            this.setState({
                commission : ''
            });
            getCommission('');
        }
    }
    //选择汇款方式
    // setSelectedMethod = (flagStr) => {
    //     this.setState({
    //         selectedMethod : flagStr
    //     });

    // }

    render(){
        const {
            //传入的客户订单信息
            dataObj,
            //选择定的用户卡
            getCustomerBankCards,
            //选定的汇款方法
            setSelectedMethod
        } = this.props;
        const { 
            //后端获取的客户卡信息
            customerBankCard,
            //自带金额
            bringMoney,
            //自取金额
            takeMoney,
            //手续费
            commission,
            //选择的汇款方法
            selectedMethod
        } = this.state;
        const {
            custBankCardItem,
            // setSelectedMethod
        } = this;
        // console.log('传入的数据：', dataObj);
        // console.log('自带金额：', bringMoney);
        // console.log('自取金额：', takeMoney);
        // console.log('手续费:', commission);
        // console.log('传入的获取客户卡信息的函数:', getCustomerBankCards);
        return(
            <div className='xdz'>
                <div className='xdz__title'>请补充为客户汇款信息</div>
                <div className='xdz__re1'>
                    <div className='xdz__re1__item1'>
                        <span>客户名：</span>
                        <i>{dataObj.customerName&&dataObj.customerName}</i>
                    </div>
                    <div className='xdz__re1__item1'>
                        <span>汇款金额：</span>
                        <i>
                            {dataObj.outAmount&&dataObj.outAmount}
                            {dataObj.outCurrencyName&&dataObj.outCurrencyName}
                        </i>
                    </div>
                </div>
                <div className='xdz__re2'>
                    <label className='xdz__re2__item2'>
                        自带：
                        <input  type="text" 
                                onChange={this.setBringMoney}
                                value={bringMoney} />
                        <span>{dataObj.outCurrencyName&&dataObj.outCurrencyName}</span>
                    </label>
                    <label className='xdz__re2__item2'>
                        自取：
                        <input  type="text" 
                                onChange={this.setTakeMoney}
                                value={takeMoney} />
                        <span>{dataObj.outCurrencyName&&dataObj.outCurrencyName}</span>
                    </label>
                </div>
                <div className='xdz__re3'>
                        <label className='xdz__re3__item3'>
                            手续费：
                            <input  type="text" 
                                    onChange={this.setCommission}
                                    value={commission}/>
                        </label>
                        <div    className='xdz__re3__item3'
                                >币种：
                                <div    className='xdz__re3__item3__it'>
                                </div>
                        </div>
                    </div>
                <div className='xdz__re4'>
                    <span>请选择给客户汇款方式：</span> 
                    <label><input   type="radio"  value='op1' 
                                    name='remitM' defaultChecked
                                    onClick={ (e) => {setSelectedMethod('或')} }/>或</label>
                    <label><input   type="radio" value='op2' 
                                    name='remitM'                                    
                                    onClick={ (e) => {setSelectedMethod('和')} }/>和</label>
                </div>
                <div className='xdz__re5'>
                    <div className='xdz__re5__title'>请选择客户收款银行卡</div>
                    <div className='xdz__re5__table'>
                        <table>
                            <thead>
                                <tr>
                                    {   
                                        customerBankCard !== '' &&
                                        custBankCardItem.map((ele, index) => {
                                            return <th key={ele + '' + index}>{ele}</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        customerBankCard !== '' &&
                                        customerBankCard.map((ele, index) => { 
                                                return  <tr     key={ele + '' + index}
                                                                onClick={e => {getCustomerBankCards(ele)}}
                                                            >
                                                            <td>{ele.accountName}</td>
                                                            <td>{ele.bankName}</td>
                                                            <td>{ele.shopCardCode.match(/\d{1,4}/g).join(' ')}</td>
                                                        </tr>                                 
                                        })
                                    }
                                </tbody>            
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default XDZ;