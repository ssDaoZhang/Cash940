import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './BorrowAmountDet.css';
import myAjax from '../../../../../../tools/myAjax';
import Pagination from '../../../../../../components/Pagination/Pagination';
import Mycalendar from '../../../../../../components/Mycalendar/Mycalendar';
import TradeDet from '../TradeDet/TradeDet';
class BorrowAmountDet extends Component{
    constructor(props){
        super(props);
        this.state = {
            cashDetailsObj : '',
            //分页符的总页数
            pageAllNum : '',
            //查询日期
            nowTime : this.props.selectDate || new Date(),
            //结束
            endTime : this.props.selectDate || new Date(),

            //传给弹窗的订单号
            tradeID : '',
            //传给弹窗的自带自取信息
            summary : '',
            //是否显示弹窗
            closeFalg : false            
        };
        this.singlePageNum = 25;
    }
    componentDidMount(){
        const { nowTime, endTime } = this.state;
        myAjax({
            url : '/shop/getShopToShopAmountDetail',
            data : {
                appID:JSON.parse(sessionStorage['appID']),
                //语言
                lan:'zh_CN', 
                //时间戳
                timemstamp:new Date().getTime(),
                token:JSON.parse(sessionStorage['token']),
                //店铺ID
                shopID:this.props.selectedShopID.mark,
                //币种
                currencyCode : this.props.nowCurryCode.currencyCode, 
                // date : formatDate( '{year}-{month}-{day}', nowTime),
                startTime : formatDate( '{year}-{month}-{day}', nowTime),
                endTime : formatDate( '{year}-{month}-{day}', endTime),
                pageNumber:1,
                pageSize:  this.singlePageNum,
                tradeType:this.props.tradeType
            },
            type : 'GET',
            success : this.handBackDetails,
        });
    }
    handBackDetails = (data) => {
        // console.log('返回的详情信息11111155555555511111111：',data);
        if(data.statusCode == 0){
            if(data.list.length != 0){
                // console.log('1111111');
                var     shopName =  data.list[0].simpleName ||data.list[0].shopName,
                        nowCurryCode = data.list[0].currencyCode,
                        nowCurryName = data.list[0].currencyName,
                        objArr = [];
                data.list.forEach((ele, index) => {
                    objArr.push(ele);
                });
                this.setState({
                    cashDetailsObj : {
                        //店铺名
                        shopName : shopName,
                        //当前币种代码
                        nowCurryCode : nowCurryCode,
                        //当前币种名
                        nowCurryName : nowCurryName,
                        objArr : objArr
                    },
                    pageAllNum : data.count / this.singlePageNum <= 1 ? 0 :  Math.ceil(data.count / this.singlePageNum)
                });
            }else{
                console.log('相近11111111：', data);
            }
        }
    }
    //单个分页插件的处理返回的单币种详情数据
    handBackDetails2 = (data) => {
        // console.log(data);
        if(data.statusCode == 0){
            // console.log('1111111');
            var     shopName =  data.list[0].simpleName ||data.list[0].shopName,
                    nowCurryCode = data.list[0].currencyCode,
                    nowCurryName = data.list[0].currencyName,
                    objArr = [];
            data.list.forEach((ele, index) => {
                objArr.push(ele);
            });
            this.setState({
                cashDetailsObj : {
                    //店铺名
                    shopName : shopName,
                    //当前币种代码
                    nowCurryCode : nowCurryCode,
                    //当前币种名
                    nowCurryName : nowCurryName,
                    objArr : objArr
                }
            });
        }
    }
    //点击查询
    getQueryData = (e) => {
        const { nowTime, endTime } = this.state;
        myAjax({
            url : '/shop/getShopToShopAmountDetail',
            data : {
                appID:JSON.parse(sessionStorage['appID']),
                //语言
                lan:'zh_CN', 
                //时间戳
                timemstamp:new Date().getTime(),
                token:JSON.parse(sessionStorage['token']),
                //店铺ID
                shopID:this.props.selectedShopID.mark,
                //币种
                currencyCode : this.props.nowCurryCode.currencyCode, 
                // date : formatDate( '{year}-{month}-{day}', nowTime),
                startTime : formatDate( '{year}-{month}-{day}', nowTime),
                endTime : formatDate( '{year}-{month}-{day}', endTime),
                pageNumber:1,
                pageSize:  this.singlePageNum,
                tradeType:this.props.tradeType  
            },
            type : 'GET',
            success : this.handBackDetails,
        });
    }
    //获取时间
    getNowTime = (time) => {
        this.setState({
            nowTime : time
        });
    }
    //结束时间
    getEndTime = (time) => {
        this.setState({
            endTime : time
        });
    }
    //获取传给弹窗的信息、弹窗是否显示
    setTradeMess = (tradeCode, mess, falg) => {
        this.setState({
            //传给弹窗的订单号
            tradeID : tradeCode,
            //传给弹窗的自带自取信息
            summary : mess,
            //是否显示弹窗
            closeFalg : falg
        });
    }
    render(){
        const { 
            cashDetailsObj, 
            pageAllNum, 
            nowTime,
            endTime,
            
            //传给弹窗的数据
            //传给弹窗的订单号
            tradeID,
            //传给弹窗的自带自取信息
            summary,
            //是否显示弹窗
            closeFalg
        } = this.state;
        // console.log('cashDetailsObj:',cashDetailsObj);
        // console.log('pageAllNum:', pageAllNum);
        return(
        <div className='borrowdet'>
            <div className='cashdetails__title'>
                {cashDetailsObj && (cashDetailsObj.shopName + ' ' + cashDetailsObj.nowCurryName)}借入借出详情 
            </div>
                <div className='cashdetails__calendar'>
                    <Mycalendar getDateFuc={this.getNowTime}
                                selectDate = {nowTime}
                                timeMess='查询开始日期:'/>
                    <Mycalendar getDateFuc={this.getEndTime}
                                selectDate = {endTime}
                                mDate = {nowTime}
                                timeMess='查询结束日期:'/>                    
                    <div className='cashdetails__calendar__btn'
                        onClick={this.getQueryData}>查&nbsp;&nbsp;询
                    </div>
                </div>
                <div className='cashdetails__content'>
                    <div className='cashdetails__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        操作人
                                    </th>
                                    <th>
                                        订单号
                                    </th>
                                    <th>
                                        记账日期
                                    </th>
                                    <th>
                                        记账时间
                                    </th>
                                    <th className='incomr'>
                                        借入
                                    </th>
                                    <th className='outcomg'>
                                        借出
                                    </th>
                                    <th className='ycomy'>
                                        余额
                                    </th>
                                    <th>
                                        账目类型
                                    </th>
                                    <th>
                                        借入方
                                    </th>
                                    <th>
                                        借出方
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   cashDetailsObj != '' &&  cashDetailsObj.objArr.map((ele, index) =>{
                                       return <tr key={ele.tradeID + index}>
                                           <td>{ele.name ? (ele.name || ele.nickName) : ''}</td>
                                           <td  className = 'tradestyle'
                                                onClick ={e => {this.setTradeMess(ele.tradeID, ele.summary, true)}}
                                                >{ele.tradeID ? ele.tradeID : ''}</td>
                                           <td>{ele.cDateStr ? ele.cDateStr : ''}</td>
                                           <td>{ele.cTimeStr ? ele.cTimeStr : ''}</td>
                                           <td className='incomr'>
                                                {ele.inAmount ? (ele.inAmount/100 + '').match(/\d{1,3}/g).join(',') : 0}</td>
                                           <td className='outcomg'>
                                                {ele.outAmount ? (ele.outAmount/100 + '').match(/\d{1,3}/g).join(',') : 0}</td>
                                           <td className='ycomy'>
                                                {ele.amount ? (ele.amount/100 + '').match(/\d{1,3}/g).join(',') : 0}</td>
                                           <td>{ele.tradeType ? ele.tradeType : ''}</td>
                                           <td>{ele.toAccount ? ele.toAccount : ''}</td>
                                           <td>{ele.fromAccount ? ele.fromAccount : ''}</td>
                                       </tr>
                                   })
                                }
                            </tbody>                
                        </table>
                    </div>
                    <div className='cashdetails__page'>
                        <div className='cashdetails__page__con'>
                            {pageAllNum != '' && <Pagination pageNum={pageAllNum} ajaxObj = {{
                                url : '/shop/getShopToShopAmountDetail',
                                data : {
                                    //店铺ID
                                    shopID : this.props.selectedShopID.mark,
                                    //币种
                                    currencyCode : this.props.nowCurryCode.currencyCode, 
                                    tradeType : this.props.tradeType,
                                    startTime : formatDate( '{year}-{month}-{day}', nowTime),
                                    endTime : formatDate( '{year}-{month}-{day}', endTime)                                     
                                }
                            }}
                            singlePageNum={this.singlePageNum}
                            callfuc = {this.handBackDetails2}
                        />}     
                        </div>    
                    </div>
                </div>
                {
                    closeFalg && <TradeDet  summary = {summary}
                                            tradeID = {tradeID}
                                            callFuc = {this.setTradeMess}
                    />
                }
        </div>
        );
    }
}
export default BorrowAmountDet;