import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import Calendar from 'react-calendar';
import './Paycom.css';
import Lockdet from './Lockdet/Lockdet';
class Paycom extends Component{
    constructor(props){
        super(props);
        //待付款记录 表内容
        this.payRecord = [];
        //待付款记录表头
        this.payRecordItem = [
            '客户名',
            '账户名',
            '客户卡开户行',
            '待付金额',
            '锁定后剩余金额',
            '锁定操作',
            '锁定详情'
        ];
        //锁定金额输入数组
        this.inputArr = [];
        //锁定后余额数组
        this.lockBalance = [];
        this.state = {
            //代付款记录
            spayRecord : [],
            //锁定金额输入数组
            sInputArr : [],
            //锁定后 余额数组
            sLockBalance : [],

            //锁定详情中
            //是否显示锁定详情
            slockDetFlag : false,
            //选择的客户卡
            scards:'',
            //选择的客户名
            scustomerName:'',
            //选择的客户卡账户名
            saccountName:'',
            //选择的客户卡 开户行
            sbankName : '',
            //待汇款币种
            scurrencyName:'',
            //币种代码
            scurrencyCode : '',
            //待付款订单号
            stransferToID:''
        }
    }
    componentDidMount(){
        var data = {
            "list":[
                {
                    "transferToID":'1544856323',
                    "currencyName":"美元",
                    "currencyCode":"USD",
                    "cards":'6222034000006751931',
                    "lockAmount":"15000",
                    "amount":"15000",
                    "bankName":'中国工商银行深圳分行',
                    "accountName":'账户名1',
                    "customerName":'客户名1'
                },
                {
                    "transferToID":'4825652232',
                    "currencyName":"美元",
                    "currencyCode":"USD",
                    "cards":'6222034000006751931',
                    "lockAmount":"15000",
                    "amount":"15000",
                    "bankName":'深圳福田银座村镇银行',
                    "accountName":'账户名2',
                    "customerName":'客户名2'
                },
                {
                    "transferToID":'1544846541265',
                    "currencyName":"美元",
                    "currencyCode":"USD",
                    "cards":'6222034000006751931',
                    "lockAmount":"190000",
                    "amount":"190000",
                    "bankName":'深圳福田银座村镇银行',
                    "accountName":'账户名3',
                    "customerName":'客户名3'
                },
                {
                    "transferToID":'154445846541265',
                    "currencyName":"美元",
                    "currencyCode":"USD",
                    "cards":'6222034000006751931',
                    "lockAmount":"100",
                    "amount":"100",
                    "bankName":'中国工商银行深圳福虹支行',
                    "accountName":'账户名4',
                    "customerName":'客户名4'
                },
                {
                    "transferToID":'1544846541943265',
                    "currencyName":"美元",
                    "currencyCode":"USD",
                    "cards":'6222034000006751931',
                    "lockAmount":"100",
                    "amount":"100",
                    "bankName":'中国工商银行深圳福虹支行',
                    "accountName":'账户名5',
                    "customerName":'客户名5'
                }
            ]
        }
        // data.list.forEach(ele => {
        //     this.payRecord.push({
        //         //待付款编号
        //         transferToID : ele.transferToID,
        //         //客户名
        //         customerName : ele.customerName,
        //         //账户名
        //         accountName : ele.accountName,
        //         //待付款客户卡号
        //         cards : ele.cards,
        //         //客户卡开户行
        //         bankName : ele.bankName,

        //         //待付款金额
        //         amount : ele.amount,
        //         //待付金额币种
        //         currencyName : ele.currencyName,
        //         //待付金额币种代码
        //         currencyCode : ele.currencyCode,
        //         //锁定剩余金额
        //         lockAmount : ele.lockAmount
        //     });
        //     this.inputArr.push(ele.amount);
        //     this.lockBalance.push(ele.lockAmount);
        // });
        // this.setState({
        //     spayRecord : this.payRecord.map(ele => ele),
        //     sInputArr : this.inputArr.map(ele => ele),
        //     sLockBalance : this.lockBalance.map(ele => ele)
        // });
        this.getPayRecord(data.list);
    }
    //初始化Ajax
    getPayRecord = (dataArr) => {
        dataArr.forEach(ele => {
            this.payRecord.push({
                //待付款编号
                transferToID : ele.transferToID,
                //客户名
                customerName : ele.customerName,
                //账户名
                accountName : ele.accountName,
                //待付款客户卡号
                cards : ele.cards,
                //客户卡开户行
                bankName : ele.bankName,

                //待付款金额
                amount : ele.amount,
                //待付金额币种
                currencyName : ele.currencyName,
                //待付金额币种代码
                currencyCode : ele.currencyCode,
                //锁定剩余金额
                lockAmount : ele.lockAmount
            });
            this.inputArr.push(ele.amount);
            this.lockBalance.push(ele.lockAmount);
        });
        this.setState({
            spayRecord : this.payRecord.map(ele => ele),
            sInputArr : this.inputArr.map(ele => ele),
            sLockBalance : this.lockBalance.map(ele => ele)
        });
    }
    //锁定金额输入处理
    setLockInput = ( index, value) => {
        this.inputArr[index] = value;
        this.setState({
            sInputArr : this.inputArr.map(ele => ele)
        });
    }
    //设置锁定后余额
    setLockBalance = (index) => {
        if(Number(this.lockBalance[index]) >= Number(this.inputArr[index])){
            this.lockBalance[index] = (Number(this.lockBalance[index]) - Number(this.inputArr[index])) + '';
            this.inputArr[index] = '';
            this.setState({
                sLockBalance : this.lockBalance.map(ele => ele),
                sInputArr : this.inputArr.map(ele => ele)
            });

        }else{
            this.inputArr[index] = '输入超额,请重新输入';
            this.setState({
                sInputArr : this.inputArr.map(ele => ele)
            });
        }        
    }
    //查看锁定详情时，选择的客户信息
    getCustomerMess = (mess) => {
        this.setState({
            slockDetFlag : true,
            scards : mess.cards,
            saccountName : mess.accountName,
            scustomerName : mess.customerName,
            scurrencyName : mess.currencyName,
            scurrencyCode : mess.currencyCode,
            stransferToID : mess.transferToID,
            sbankName : mess.bankName
        });
    }
    //设置是否显示锁定详情
    setSlockDetFlag = (e) => {
        this.setState({
            slockDetFlag : false
        });
    }
    render(){
        var date = new Date();
        // console.log('获取时间：', formatDate('{year}-{month}-{day} {hours}:{minutes}:{seconds}', date));
        const { 
            spayRecord,
            sInputArr,
            sLockBalance,
            slockDetFlag,
            scards,
            saccountName,
            scustomerName,
            scurrencyName,
            scurrencyCode,
            stransferToID,
            sbankName
        } = this.state;
        const {
            payRecordItem,
            setLockInput,
            setLockBalance,
            getCustomerMess,
            setSlockDetFlag
        } = this;
        // console.log('输入的input参数：', sInputArr);
        return(
            <div className='paycom'>
                <div className='paycom__title'>待付款订单处理</div>
                <div className='paycom__queryshop'>
                    <span>请选择店铺:</span>
                    <div>下拉表</div>
                </div>
                <div className='paycom__queryrecord'>
                    <input type="text" />
                    <div>日历</div>
                    <div>查询</div>
                </div>                   
                <div className='paycom__records'>
                    {spayRecord.length != 0 && <table>
                        <thead>
                            <tr>
                                {
                                    payRecordItem.map((ele, index) => {
                                        return <th key={ele + '' + index}
                                                    className={`${ele == '锁定操作' && 'lockitem' }`}>{ele}
                                                </th> 
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                spayRecord.map((ele, index) => {
                                    return<tr key={ele + '' + index}>
                                        <td>{ele.customerName}</td>
                                        <td>{ele.accountName}</td>
                                        <td>{ele.bankName}</td>
                                        <td>{ele.amount} {ele.currencyCode}</td>
                                        <td>{sLockBalance[index]} {ele.currencyCode}</td>
                                        <td className='lockop'>
                                            <input  type="text"
                                                    value={sInputArr[index]} 
                                                    placeholder='请填写锁定金额'
                                                    onChange={e => { setLockInput(index, e.target.value) }}/>
                                            <span   onClick={e => {setLockBalance(index, ele)}}>
                                                    锁定
                                            </span>
                                        </td>
                                        <td className='seedetails'>
                                            <span onClick={e => {getCustomerMess(ele)}}>
                                                查看
                                            </span>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>}
                </div>
                {
                    slockDetFlag && <div className='paycom__lockdetails'>
                        <Lockdet   
                            setSlockDetFlag={setSlockDetFlag}
                            customerMess = {{
                                cards : scards,
                                bankName : sbankName,
                                accountName : saccountName,
                                customerName : scustomerName,
                                currencyName : scurrencyName,
                                currencyCode : scurrencyCode,
                                transferToID : stransferToID
                            }}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default Paycom;