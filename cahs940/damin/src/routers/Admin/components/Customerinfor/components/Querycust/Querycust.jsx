import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';
import './Querycust.css';
import ShowBankCard from './components/ShowBankCard/ShowBankCard';
import AddBankCard from './components/AddBankCard/AddBankCard';
class Querycust extends Component {
    constructor(props){
        super(props);
        this.cardType = ['', '身份证', '护照', '学生证', '居住证'];
        this.state = {
            custMessList : [
                {
                    customerID : 0,
                    name : '韩梅梅',
                    gender : 1,
                    certificateCode : '1',
                    cardCode : '123456789',
                    cardImg : './images/02.jpg',
                    contact : 196358742
                },
                {
                    customerID : 1,
                    name : '李磊',
                    gender : 0,
                    certificateCode : '1',
                    cardCode : '12345678911',
                    cardImg : './images/03.jpg',
                    contact : 19635128742
                },
                {
                    customerID : 2,
                    name : 'tom',
                    gender : 0,
                    certificateCode : '1',
                    cardCode : '123asas456789',
                    cardImg : './images/04.jpg',
                    contact : 1963587151242
                },
                {
                    customerID : 3,
                    name : 'tom',
                    gender : 0,
                    certificateCode : '1',
                    cardCode : '123asas456789',
                    cardImg : './images/05.jpg',
                    contact : 1963587151242
                }
            ],
            moreResFlag : false,
            moreResShowIndex : 1,
            showImgUrl : '',
            bankCardResList : "",
            customerID : ''
        };
    }
    showCardImg = (imgUrl) => {
        this.setState({
            showImgUrl : imgUrl,
            moreResShowIndex : 1,
            moreResFlag : true
        });
    }
    closeMroeMessBox = (e) => {
        this.setState({
            moreResFlag : false
        });
    }
    showBankCard = (customerID) => {
        var bankCardResLists = [
            [
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '黄豆'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '北京农业支行',
                    accountAddress : '北京',
                    bankName : '农业银行',
                    accountName : '小米'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '大米'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '绿豆'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '芝麻绿豆'
                }
            ],
            [
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '香菜'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '北京农业支行',
                    accountAddress : '北京',
                    bankName : '农业银行',
                    accountName : '大葱豆腐'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '韭菜韭黄'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '洋葱'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '青菜'
                }
            ],
            [
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '白萝卜'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '北京农业支行',
                    accountAddress : '北京',
                    bankName : '农业银行',
                    accountName : '水萝卜'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '青萝卜'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '胡萝卜'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '不吃萝卜'
                }
            ],
            [
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '豆腐'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '北京农业支行',
                    accountAddress : '北京',
                    bankName : '农业银行',
                    accountName : '豆腐脑'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '豆腐乳'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '豆干'
                },
                {
                    cardID : '123456789012345678',
                    bankCode : '深圳平安支行',
                    accountAddress : '深圳',
                    bankName : '平安银行',
                    accountName : '腐竹'
                }
            ]
        ];
        //ajax请求是需要参数  customerID 客户ID
            //appID 软件序列号
            //lan 语言
            //timemstamp 时间戳
            //token
        this.setState({
            bankCardResList : bankCardResLists[customerID],
            moreResFlag : true,
            moreResShowIndex : 2
        });
    }

    addBankCard = (customerID) => {
        this.setState({
            customerID : customerID,
            moreResFlag : true,
            moreResShowIndex : 3
        });
    }
    render(){
        const { custMessList, 
                moreResFlag, 
                moreResShowIndex, 
                showImgUrl, 
                bankCardResList,
                customerID
            } = this.state;
        const { cardType } = this;
        return(
            <div className='query'>
                <div className='query__top'>老客户资料查询与维护</div>
                <div className='query__search'>
                    <input type="text" placeholder='请输入客户姓名、手机或证件号'/>
                    <span></span>
                </div>
                <div className='query__tablebox'>
                <div className='query__tablewarp'>
                <table className='query__table'>
                    <thead>
                        <tr>
                            <th>客户名</th>
                            <th>性别</th>
                            <th>联系方式</th>
                            <th>证件类型</th>
                            <th>证件号</th>
                            <th>证件照</th>
                            <th>客户相关银行卡</th>
                            <th>增加客户银行卡</th>
                            <th>修改客户信息</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                custMessList && custMessList.map((ele, index) => {
                                        return <tr key={ele+''+index}>
                                                <td>{ele.name}</td>
                                                <td>{ele.gender == 1 ?'女':'男'}</td>
                                                <td>{ele.contact}</td>
                                                <td>{cardType[ele.certificateCode]}</td>
                                                <td>{ele.cardCode}</td>
                                                <td><span onClick={() => { this.showCardImg(ele.cardImg)}}>查看</span></td>
                                                <td><span onClick={() => { this.showBankCard(ele.customerID)}}>查看</span></td>
                                                <td><span onClick={() => { this.addBankCard(ele.customerID)}}>增加</span></td>
                                                <td><span onClick={()=>{this.deleteAccArrEle(ele.index)}}>删除</span><span onClick={()=>{this.changeAccArr(index)}}>修改</span></td>
                                        </tr>                                            
                                })
                            }
                    </tbody>            
                </table>
                </div>
                </div>
                {   
                   moreResFlag && <div className='query__more'>
                                    <div className='query__more__close' onClick={this.closeMroeMessBox}></div>
                                    { moreResShowIndex == 1 &&  <img src={showImgUrl} alt=""/>}
                                    { moreResShowIndex == 2 && <div className='query__more__bankcardwarp'>
                                            <div className='query__more__bankcard'>
                                                <ShowBankCard dataArr={bankCardResList}/>
                                            </div>
                                        </div> 
                                    }
                                    { moreResShowIndex == 3 && <div className='query__more__addbankcard'>
                                            <AddBankCard customerID={customerID}/>
                                    </div>
                                    }
                    </div>
                }
            </div>
        );
    }
}
export default Querycust;