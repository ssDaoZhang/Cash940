import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './BorrowAmount.css';
import myAjax from '../../../../../../tools/myAjax';
import Mycalendar from '../../../../../../components/Mycalendar/Mycalendar';
class BorrowAmount extends Component{
    constructor(props){
        super(props);
        this.state = {
            //返回的现金详情
            borrowDetails : '',
            //查询日期
            nowTime :  this.props.selectDate || new Date()
        };
    }
    componentDidMount(){
        const { nowTime } = this.state;        
        //请求现金详情
        myAjax({
            url : '/shop/getShopToShopAmount',
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
            success : this.handBorrowDetils,
            // heforeSend : this.handTirps,
            // error : this.errorTirps
        });
    }
    //处理返回的借款数据
    handBorrowDetils = (data) => {
        console.log('获取的借款详情：', data);
        if(data.statusCode == 0){
            if(data.list.length != 0){
                var shopName = data.list[0].shopName||data.list[0].simpleName,
                    shopID = data.list[0].shopID,
                    dataArr = [];
                
                data.list.forEach((ele, index)=>{
                    dataArr.push({
                        currencyCode : ele.currencyCode,
                        currencyName:ele.currencyName,
                        //借入
                        inAmount:ele.inAmount ? ele.inAmount/100 : 0,
                        //借出
                        outAmount:ele.outAmount ? ele.outAmount/100 : 0,                  
                    });
                });
                this.setState({
                    borrowDetails:{
                        shopName:shopName,
                        shopID:shopID,
                        detailsList : dataArr
                    }
                });
            }
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
        myAjax({
            url : '/shop/getShopToShopAmount',
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
            success : this.handBorrowDetils,
            // heforeSend : this.handTirps,
            // error : this.errorTirps
        });
    }
    render(){
        const { borrowDetails, nowTime } = this.state;
        const { callFuc } = this.props;
        // console.log('1111111111:', borrowDetails);
        return(
            <div className='borrowamount'>
                <div className='borrowamount__title'>{borrowDetails&&borrowDetails.shopName}各币种借入借出金额</div>
                <div className='borrowamount__calendar'>
                    <Mycalendar     getDateFuc={this.getNowTime}
                                    selectDate = {nowTime}
                                    timeMess='查询日期:'/> 
                    <div className='borrowamount__calendar__btn'
                        onClick={this.getQueryData}>查&nbsp;&nbsp;询</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                币种
                            </th>
                            <th>
                                借出
                            </th>
                            <th>
                                借入
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           borrowDetails != '' &&  borrowDetails.detailsList.map((ele, index) =>{
                               return <tr key={ele.currencyCode + index}>
                                   <td>{ele.currencyName}</td>
                                   <td  className='boutcom'
                                        onClick={e => {callFuc('借款', {
                                            currencyCode : ele.currencyCode,
                                            currencyName :ele.currencyName
                                        },'同行借入'
                                        )}}>{(ele.outAmount + '').match(/\d{1,3}/g).join(',')}</td>
                                   <td  className='bincom'
                                        onClick={e => {callFuc('借款', {
                                            currencyCode : ele.currencyCode,
                                            currencyName :ele.currencyName
                                        },'同行借出'
                                        )}}>{(ele.inAmount + '').match(/\d{1,3}/g).join(',')}</td>
                               </tr>
                           })
                        }
                    </tbody>                
                </table>
            </div>
        );
    }
}
export default BorrowAmount;