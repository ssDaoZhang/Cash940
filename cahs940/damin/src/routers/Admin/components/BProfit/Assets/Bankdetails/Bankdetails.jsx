import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './Bankdetails.css';
import Mycalendar from '../../../../../../components/Mycalendar/Mycalendar';
import myAjax from '../../../../../../tools/myAjax';
class Bankdetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            //返回的应收账款详情
            shouleIndetils : '',
            //查询日期
            nowTime : this.props.selectDate || new Date()
        };
    }
    componentDidMount(){
        console.log('银行卡详情');
        const { nowTime } = this.state;
        //请求应收账款详情
        myAjax({
            url : '/shop/getShopCardAmountList',
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
            success : this.handShouleIn,
            // heforeSend : this.handTirps,
            // error : this.errorTirps
        });
    }
    handShouleIn = (data) => {
        console.log('银行卡返回数据：', data);
        if(data.statusCode == 0){
            if(data.list.length != 0){
                var //shopName = data.list[0].shopName || data.list[0].simpleName,
                    shopID = data.list[0].shopID,
                    dataArr = [];

                data.list.forEach((ele, index)=>{
                    dataArr.push({
                        currencyCode : ele.currencyCode,
                        currencyName:ele.currencyName,
                        //应收
                        amount:ele.amount ? ele.amount/100 : 0                  
                    });                    
                });
                this.setState({
                    shouleIndetils:{
                        //shopName:shopName,
                        shopID:shopID,
                        detailsList : dataArr
                    }
                });
            }
        }
    }
    //查询日期
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
        //请求应收账款详情
        myAjax({
            url : '/shop/getShopTransferFromTo',
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
            success : this.handShouleIn,
            // heforeSend : this.handTirps,
            // error : this.errorTirps
        });
    }
    render(){
        const {shouleIndetils, nowTime} = this.state;
        const {callFuc, selectedShopID} = this.props;
        // console.log('处理过的应收：', shouleIndetils);
        return(
            <div className='bankdetails'>
                <div className='bankdetails__title'>
                    {selectedShopID && selectedShopID.name}各币种银行卡余额
                </div>
                <div className='bankdetails__calendar'>
                    <Mycalendar     getDateFuc={this.getNowTime}
                                    selectDate = {nowTime}
                                    timeMess='查询日期: '/>
                    <div    className='shoulein__calendar__btn'
                            onClick={this.getQueryData}>查&nbsp;&nbsp;询</div>
                </div>
                <div className='bankdetails__items'>
                    {
                        shouleIndetils && shouleIndetils.detailsList.map((ele, index) => {
                            return(
                                <span   key={ele.currencyCode + index}
                                        onClick={e => { callFuc('银行卡',
                                            {
                                                currencyCode : ele.currencyCode,
                                                currencyName :ele.currencyName
                                            },
                                            ''  
                                        )}}
                                >{ele.amount != '' ? ((ele.amount + '').match(/\d{1,3}/g).join(',') + ' ' + ele.currencyCode) : ele.amount + ' ' + ele.currencyCode}</span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default Bankdetails;