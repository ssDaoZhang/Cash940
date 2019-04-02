import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './CashAmount.css';
import myAjax from '../../../../../../tools/myAjax';
import Mycalendar from '../../../../../../components/Mycalendar/Mycalendar';
class CashAmount extends Component{
    constructor(props){
        super(props);
        this.state = {
            //返回的现金详情
            cashDetails : '',
            //查询日期
            nowTime : this.props.selectDate || new Date()
        };
    }
    componentDidMount(){
        const { nowTime } = this.state;
        //请求现金详情
        myAjax({
            url : '/shop/getShopCashAmountList',
            data : { 
                appID:JSON.parse(sessionStorage['appID']),
                //店铺ID
                shopID:this.props.selectedShopID.mark,
                //语言
                lan:'zh_CN', 
                //时间戳
                timemstamp:new Date().getTime(),
                token:JSON.parse(sessionStorage['token']),
                date : formatDate( '{year}-{month}-{day}', nowTime)
            },
            type : 'GET',
            success : this.handCashdetils,
        });
    }
    //处理现金详情数据
    handCashdetils = (data) => {
        if(data.statusCode == 0){
            var shopName = data.list[0].shopName||data.list[0].simpleName,
                shopID = data.list[0].shopID,
                dataArr = [];

            data.list.forEach((ele, index)=>{
                dataArr.push({
                    currencyCode : ele.currencyCode,
                    amount: ele.amount ? ele.amount/100 : '',
                    currencyName:ele.currencyName,
                    
                });
            });
            this.setState({
                cashDetails:{
                    shopName:shopName,
                    shopID:shopID,
                    detailsList : dataArr
                }
            });
        }
        // console.log('获取的现金详情：', data);
    }
    //获取查询日期
    getNowTime = (time) => {
        this.setState(
            {
                nowTime : time
            }
        );
    }
    //点击查询
    getQueryData = (e) => {
        const { nowTime } = this.state;
        //请求现金详情
        myAjax({
            url : '/shop/getShopCashAmountList',
            data : { 
                appID:JSON.parse(sessionStorage['appID']),
                //店铺ID
                shopID:this.props.selectedShopID.mark,
                //语言
                lan:'zh_CN', 
                //时间戳
                timemstamp:new Date().getTime(),
                token:JSON.parse(sessionStorage['token']),
                date : formatDate( '{year}-{month}-{day}', nowTime)
            },
            type : 'GET',
            success : this.handCashdetils,
        });
    }
    render(){
        const { selectedShopID, callFuc} = this.props;
        const {cashDetails, nowTime} =this.state;
        // console.log('传入的店铺信息：', selectedShopID);
        // console.log('处理过的详情:', cashDetails);
        // console.log('传入的时间:', nowTime);
        return(
            <div className='cashamount'>
                {cashDetails != '' && <div className='cashamount__content'>
                    <div    className='cashamount__content__title'
                        >{cashDetails.shopName}各币种余额</div>
                    <div className='cashamount__content__calendar'>
                        <Mycalendar getDateFuc={this.getNowTime}
                                    selectDate = {nowTime}
                                    timeMess='查询日期:'/>
                        <div className='cashamount__content__calendar__btn'
                            onClick={this.getQueryData}>查&nbsp;&nbsp;询</div>
                    </div>
                    <div className='cashamount__content__items'>
                        {
                            cashDetails.detailsList.map((ele, index) => {
                                return(
                                    <span   key={ele.currencyCode +index}
                                            onClick={e => {callFuc('现金详情', {
                                                                                currencyCode : ele.currencyCode,
                                                                                currencyName :ele.currencyName
                                                                            },
                                                                    '')}}
                                    >{ele.amount && ((ele.amount + '').match(/\d{1,3}/g).join(',') + ' ' + ele.currencyCode)}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>}
            </div>
        );
    }
}

export default CashAmount;