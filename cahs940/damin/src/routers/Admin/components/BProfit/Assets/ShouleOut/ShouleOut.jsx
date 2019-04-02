import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './ShouleOut.css';
import Mycalendar from '../../../../../../components/Mycalendar/Mycalendar';
import myAjax from '../../../../../../tools/myAjax';
class ShouleOut extends Component{
    constructor(props){
        super(props);
        this.state = {
            shouleOutdetils : '',
            //查询日期
            nowTime : new Date()
        }
    }
    componentDidMount(){
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
            success : this.handShouleOut,
            // heforeSend : this.handTirps,
            // error : this.errorTirps
        });
    }
    handShouleOut = (data) => {
        // console.log('应付账款详情：', data);
        if(data.statusCode == 0){
            var shopName = data.list[0].simpleName,
                shopID = data.list[0].shopID,
                dataArr = [];

            data.list.forEach((ele, index)=>{
                // if(ele.outAmount != 0){
                    dataArr.push({
                        currencyCode : ele.currencyCode,
                        currencyName:ele.currencyName,
                        //借出
                        outAmount:ele.outAmount ? ele.outAmount/100 : 0                  
                    });
                // }
            });
            this.setState({
                shouleOutdetils:{
                    shopName:shopName,
                    shopID:shopID,
                    detailsList : dataArr
                }
            });
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
            success : this.handShouleOut,
            // heforeSend : this.handTirps,
            // error : this.errorTirps
        });
    }
    render(){
        const { shouleOutdetils, nowTime } = this.state;   
        const {callFuc } =this.props;     
        // console.log('处理过的应付账款：', shouleOutdetils);
        return(
            <div className='shouleout'>
                <div className='shouleout__title'>
                    {shouleOutdetils && shouleOutdetils.shopName}各币种应付款
                </div>
                <div className='shouleout__calendar'>
                    <Mycalendar     getDateFuc={this.getNowTime}
                                    selectDate = {nowTime}
                                    timeMess='查询日期:'/>
                    <div className='shouleout__calendar__btn'
                            onClick={this.getQueryData}>查&nbsp;&nbsp;询</div>
                </div>
                <div className='shouleout__items'>
                    {
                        shouleOutdetils && shouleOutdetils.detailsList.map((ele, index) => {
                            return(
                                <span   key={ele.outAmount + index}
                                onClick={e => { callFuc('付款详情',
                                                {
                                                    currencyCode : ele.currencyCode,
                                                    currencyName :ele.currencyName
                                                },
                                                '应付款'  
                                            )}}
                                >{ (ele.outAmount + ' ' + ele.currencyCode)}</span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default ShouleOut;