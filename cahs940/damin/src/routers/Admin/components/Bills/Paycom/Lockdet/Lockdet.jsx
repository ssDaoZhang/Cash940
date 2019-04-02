import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Lockdet.css';
class Lockdet extends Component{
    constructor(props){
        super(props);
        //锁定详情表头
        this.lockTableItem = [
            '锁定时间',
            '锁定人',
            '锁定金额',
            '解锁操作',
            '已汇确认'
        ];
        this.state = {
            //锁定详情数组
            slockMess : [],
            //已汇确认 显示我的银行卡 标志
            scheckFlag : false,
            //我的卡数据
            sMyCards : '',
            //解锁金额输入数组
            sunLockInputArr : [],
            //解锁剩余锁定金额
            sunLockBalanceArr : []
        }
        //锁定详情数组
        this.lockMess = [];
        //解锁金额输入数组
        this.unLockInputArr = [];
        //解锁剩余锁定金额
        this.unLockBalanceArr = [];
        //确认的是那一单
        this.selectIndex = '';
        //确认的拆分单笔信息
        this.selectMess = '';
    }
    componentDidMount(){
        var lockMess = [
            {
                lockTime : '2018-07-12 09:21:12',
                lockMoney : '1000',
            },
            {
                lockTime : '2018-07-12 09:21:12',
                lockMoney : '2000',
            },
            {
                lockTime : '2018-07-12 09:21:12',
                lockMoney : '3000',
            },
            {
                lockTime : '2018-07-12 09:21:12',
                lockMoney : '4000',
            },
            {
                lockTime : '2018-07-12 09:21:12',
                lockMoney : '5000',
            },
            {
                lockTime : '2018-07-12 09:21:12',
                lockMoney : '6000',
            },
            {
                lockTime : '2018-07-12 09:21:12',
                lockMoney : '7000',
            }
        ];
        this.getSlockMess(lockMess);
    }
    //初始Ajax
    getSlockMess = (data) => {
        data.forEach((ele, index) => {
            this.lockMess.push(ele);
            this.unLockInputArr.push(ele.lockMoney);
            this.unLockBalanceArr.push(ele.lockMoney);
        });
        this.setState({
            slockMess : this.lockMess.map(ele => ele),
            sunLockInputArr : this.unLockInputArr.map(ele => ele),
            sunLockBalanceArr : this.unLockBalanceArr.map(ele => ele)
        });
    }

    //设置显示我的卡 标志
    // setScheckFlag = (e) => {
    //     this.setState({
    //         scheckFlag : true
    //     });
    // }

    //Ajax 获取我的卡信息
    getMyCards = (index, mess) => {
        var myCards = {
            "list":[
                {
                    "accountName":"徐泽雷",
                    "bankAddress":"北京",
                    "bankCode":"BJRCB",
                    "bankName":"北京农商",
                    "shopCardCode":"12345678963",
                    "shopID":147,
                    "shopName":"店1",
                    "amounts":[
                        {
                            "currencyCode":"CAD",
                            'currencyName':'加元',
                            "amount":1,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        }
                    ]
                },
                {
                    "accountName":"徐泽雷",
                    "bankAddress":"北京",
                    "bankCode":"BJRCB",
                    "bankName":"北京农商",
                    "shopCardCode":"12345678963",
                    "shopID":147,
                    "shopName":"店2",
                    "amounts":[
                        {
                            "currencyCode":"CAD",
                            'currencyName':'加元',
                            "amount":1,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        }
                    ]
                },
                {
                    "accountName":"徐泽雷",
                    "bankAddress":"北京",
                    "bankCode":"BJRCB",
                    "bankName":"北京农商",
                    "shopCardCode":"12345678963",
                    "shopID":147,
                    "shopName":"店3",
                    "amounts":[
                        {
                            "currencyCode":"CAD",
                            'currencyName':'加元',
                            "amount":1,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        }
                    ]
                },
                {
                    "accountName":"徐泽雷",
                    "bankAddress":"北京",
                    "bankCode":"BJRCB",
                    "bankName":"北京农商",
                    "shopCardCode":"12345678963",
                    "shopID":147,
                    "shopName":"店4",
                    "amounts":[
                        {
                            "currencyCode":"CAD",
                            'currencyName':'加元',
                            "amount":1,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        }
                    ]
                },
                {
                    "accountName":"徐泽雷",
                    "bankAddress":"北京",
                    "bankCode":"BJRCB",
                    "bankName":"北京农商",
                    "shopCardCode":"12345678963",
                    "shopID":147,
                    "shopName":"店5",
                    "amounts":[
                        {
                            "currencyCode":"CAD",
                            'currencyName':'加元',
                            "amount":1,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'加元',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'加元',
                            "amount":3,
                            "cardCode":"12345678963"
                        }
                    ]
                },
                {
                    "accountName":"徐泽雷",
                    "bankAddress":"北京",
                    "bankCode":"BJRCB",
                    "bankName":"北京农商",
                    "shopCardCode":"12345678963",
                    "shopID":147,
                    "shopName":"店6",
                    "amounts":[
                        {
                            "currencyCode":"CAD",
                            'currencyName':'加元',
                            "amount":1,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'港币',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'人民币',
                            "amount":3,
                            "cardCode":"12345678963"
                        }
                    ]
                },
                {
                    "accountName":"徐泽雷",
                    "bankAddress":"北京",
                    "bankCode":"BJRCB",
                    "bankName":"北京农商",
                    "shopCardCode":"12345678963",
                    "shopID":147,
                    "shopName":"店7",
                    "amounts":[
                        {
                            "currencyCode":"CAD",
                            'currencyName':'加元',
                            "amount":1,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CHF",
                            'currencyName':'港币',
                            "amount":2,
                            "cardCode":"12345678963"
                        },
                        {
                            "currencyCode":"CNH",
                            'currencyName':'港币',
                            "amount":3,
                            "cardCode":"12345678963"
                        }
                    ]
                }
            ],
            'statusCode' : 1, // 0成功 1失败
            'detailMsg' : 'ok',                 
        };
        this.selectIndex = index;
        this.selectMess = mess;
        this.handMyCards(myCards.list);
        // console.log('确认的索引1：', index);
        // console.log('确认的索引2：', this.selectIndex);
        // console.log('确认的信息：', this.selectMess);
    }
    //Ajax 处理返回的卡号
    handMyCards = (cardsMess) => {
        this.setState({
            scheckFlag : true,
            sMyCards : cardsMess
        });
    }
    //设置卡余额显示 标记
    // setShowMonyDetFlag = (e) => {
    //     this.setState({
    //         showMonyDetFlag : true
    //     });
    // }

    //设置解锁余额输入
    setSunlockInputArr = (index, value) => {
        this.unLockInputArr[index] = value;        
        this.setState({
            sunLockInputArr : this.unLockInputArr.map(ele => ele)
        })
    }
    //修改解锁余额
    handSunlockBalanceArr = (index) => {
        var tempUlockBele = Number(this.unLockBalanceArr[index]),
        tempUlockIele = Number(this.unLockInputArr[index]);
        if(tempUlockBele >= tempUlockIele){
            this.unLockBalanceArr[index] = (tempUlockBele - tempUlockIele) + '';
            this.unLockInputArr[index] = this.unLockBalanceArr[index];
        }else{
            this.unLockInputArr[index] = '输入超额,重新输入';
        }
        this.setState({
            sunLockBalanceArr : this.unLockBalanceArr.map(ele => ele),
            sunLockInputArr : this.unLockInputArr.map(ele => ele)
        })
    }
    //提交我的银行卡列表中确认付款Ajax请求
    submitDetalis = (index) => {
        this.lockMess.splice(index, 1);
        this.unLockInputArr.splice(index, 1);
        this.unLockBalanceArr.splice(index, 1);
        this.setState({
            slockMess : this.lockMess.map(ele => ele),
            sunLockInputArr : this.unLockInputArr.map(ele => ele),
            sunLockBalanceArr : this.unLockBalanceArr.map(ele => ele),
            scheckFlag : false
        });
    }
    render(){
        const { customerMess, setSlockDetFlag } = this.props;
        const { 
                lockTableItem,  
                setScheckFlag,
                getMyCards,
                setSunlockInputArr,
                handSunlockBalanceArr,
                submitDetalis,
                selectIndex,
                selectMess
        } = this;
        const { 
                slockMess, 
                scheckFlag,
                sMyCards,
                showMonyDetFlag,
                sunLockInputArr,
                sunLockBalanceArr
        } = this.state;
        // console.log('选择的客户信息：', customerMess);
        // console.log('出入的参数：', setSlockDetFlag);
        // console.log('我的卡信息:', sMyCards);
        // console.log('slockMess:', slockMess);
        return(
            <div    className='lockdet'>
                <i  className='lockdet__close'
                    onClick={setSlockDetFlag}>
                </i>
                <div    className='lockdet__custMess'>
                    <div    className='lockdet__custMess__item1'>
                        <span className='lcit1'>客户名：</span>
                        <span className='lcit1'>{customerMess.customerName}</span>
                    </div>
                    <div    className='lockdet__custMess__item2'>
                        <span className='lcit2'>账户名：</span>
                        <span className='lcit2'>{customerMess.accountName}</span>
                    </div>
                    <div    className='lockdet__custMess__item3'>
                        <span className='lcit3'>开户行：</span>
                        <span className='lcit3'>{customerMess.bankName}</span>
                    </div>
                    <div    className='lockdet__custMess__item4'>
                        <span className='lcit4'>卡号：</span>
                        <span className='lcit4'>{customerMess.cards.match(/\d{1,4}/g).join(' ')}</span>
                    </div>
                    <div    className='lockdet__custMess__item5'>
                        <span className='lcit5'>汇款币种：</span>
                        <span className='lcit5'>{customerMess.currencyCode}</span>
                    </div>
                </div>
                    {
                        slockMess.length != 0 && <div    className='lockdet__lockMess'>
                            <div    className='lockdet__lockMess__item1'>
                                <table>
                                    <thead>
                                        <tr>
                                            {
                                                 lockTableItem.map((ele, index) => {
                                                   return <th   className={`${lockTableItem[index] == '解锁操作' && 'unlockitem'}`}
                                                                key={ele + index}>
                                                            {ele}
                                                        </th>
                                               })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            slockMess.map((ele, index) => {
                                                return <tr  key={ele.lockTime + index}>
                                                    <td>{ele.lockTime}</td>
                                                    <td>小米{index}</td>
                                                    <td>{sunLockBalanceArr[index]}</td>
                                                    <td className='unlock'>
                                                        <input  type="text"
                                                                value={sunLockInputArr[index]}
                                                                onChange={e => {setSunlockInputArr(index, e.target.value)}}
                                                                placeholder='请输入解锁金额'/>
                                                        <span   className='lockbtn'
                                                                onClick={e => {handSunlockBalanceArr(index)}}>解锁</span>
                                                    </td>
                                                    <td><span   className='lockbtn'
                                                                onClick={e => {getMyCards(index, ele)}}>确认</span></td>
                                                </tr>
                                            })
                                        }   
                                    </tbody>
                                </table>
                            </div>
                            {
                                scheckFlag && <div className='lockdet__lockMess__cards'>
                                    <div    className='lockdet__lockMess__cards__title'>
                                        请选择我的汇款卡
                                    </div>
                                    <div className='lockdet__lockMess__cards__tirps'>
                                        <div className='lockdet__lockMess__cards__tirps__t1'>
                                            <span>锁定时间:</span>
                                            <span>{selectMess.lockTime}</span>
                                        </div>
                                        <div className='lockdet__lockMess__cards__tirps__t1'>
                                            <span>锁定金额:</span>
                                            <span>{sunLockBalanceArr[selectIndex]}</span>
                                        </div>
                                    </div>
                                    <div    className='lockdet__lockMess__cards__item'>
                                        {
                                            sMyCards && sMyCards.map((ele, index) => {
                                                return <div     key={ele.shopCardCode + '' + index}
                                                                className='lockdet__lockMess__cards__item__it1'
                                                                onClick={e => {submitDetalis(selectIndex)}}>
                                                            <div className='lockdet__lockMess__cards__item__it1__title'>
                                                                <div className='llcii llcii1'>
                                                                    <span>店铺名:</span>
                                                                    <span className='llcii__it llcii1__it'>{ele.shopName}</span>
                                                                </div>
                                                                <div className='llcii llcii2'>
                                                                    <span>开户行:</span>
                                                                    <span className='llcii__it llcii2__it'>{ele.bankName}</span>
                                                                </div>
                                                            </div>
                                                            <div className='lockdet__lockMess__cards__item__it1__content'>
                                                                <div className='llciic'>
                                                                    <span>账户名:</span>
                                                                    <span className='llciic__it'>{ele.accountName}</span>
                                                                </div>
                                                                <div className='llciic'>
                                                                    <span>卡号:</span>
                                                                    <span className='llciic__it'>{ele.shopCardCode.match(/\d{1,4}/g).join(' ')}</span>
                                                                </div>
                                                                <div className='llciic3'>
                                                                    <div    className='llciic3__it1'
                                                                            >卡余额>></div>
                                                                    <div className='llciic3__it2'>
                                                                        {
                                                                            ele.amounts && ele.amounts.map((ele, index) => {
                                                                                return <span key={ele.currencyCode + index}>
                                                                                        {ele.amount} {ele.currencyCode}
                                                                                    </span>
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    }
            </div>
        );
    }    
}

export default Lockdet;