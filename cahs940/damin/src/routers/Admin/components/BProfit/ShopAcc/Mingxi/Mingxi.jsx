import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './Mingxi.css';
import myAjax from '../../../../../../tools/myAjax';
import Pagination from '../../../../../../components/Pagination/Pagination';
import Mycalendar from '../../../../../../components/Mycalendar/Mycalendar';
import DropList from '../../../../../../components/DropList/DropList';
class Mingxi extends Component{
    constructor(props){
        super(props);
        this.state = {
            //要显示的详细信息
            cashDetailsObj : '',
            //分页符的总页数
            pageAllNum : '',
            //查询日期
            //开始
            nowTime :  new Date(),
            //结束
            endTime :  new Date(),
            //店铺币种
            dropCurry : '',
            // //显示外部时间
            // showarpTFlag : false
        };
        this.singlePageNum = 25;
    }
    componentDidMount(){
        myAjax({
            url : '/commos/getCurrencys',
            data : {
                mainCurrencyCode:JSON.parse(sessionStorage['shop']).currencyCode,
                appID : JSON.parse(sessionStorage['appID']),
                lan : 'zh_CN',
                timemstamp : new Date().getTime()
            },
            type : 'GET',
            success : this.handCurrencyList,
            // complete: this.ajax2
        });
    }
    //处理返回的店铺币种列表
    handCurrencyList = (data) => {
        // console.log('币种列表：',data);
        var dropArrt = [];
        const { nowTime, endTime } = this.state;
        const {selectedDetMess} = this.props;
        // const { nowTime} = this.state;
        if(data.statusCode == 0){
            data.currencies.forEach((ele, index) => {
                dropArrt.push({
                    name : ele.currencyName,
                    mark : ele.currencyCode,
                    code : ''
                });
            });
            this.setState({
                dropCurry : dropArrt
            });
            myAjax({
                url : '/shop/getAccountDetailList',
                data : {
                    subject : selectedDetMess.subject,
                    cardID : selectedDetMess.internalAccount,
                    //第几页
                    pageNumber:1,
                    //每一页数据条数
                    pageSize : this.singlePageNum,                
                    appID:JSON.parse(sessionStorage['appID']),
                    //语言
                    lan:'zh_CN', 
                    //时间戳
                    timestamp:new Date().getTime(),
                    token:JSON.parse(sessionStorage['token']), 
                    startTime : formatDate( '{year}-{month}-{day}', nowTime),
                    endTime : formatDate( '{year}-{month}-{day}', endTime),
                    currencyCode : data.currencies[0].currencyCode
                },
                type : 'GET',
                success : this.handBackDetails,
            });
        }      
    }

    //点击查询
    getQueryData = (e) => {
        const { nowTime, endTime, dropCurry } = this.state;
        const {selectedDetMess} = this.props;
        myAjax({
            url : '/shop/getAccountDetailList',
            data : {
                subject : selectedDetMess.subject,
                cardID : selectedDetMess.internalAccount,
                //第几页
                pageNumber:1,
                //每一页数据条数
                pageSize : this.singlePageNum,                
                appID:JSON.parse(sessionStorage['appID']),
                //语言
                lan:'zh_CN', 
                //时间戳
                timestamp:new Date().getTime(),
                token:JSON.parse(sessionStorage['token']), 
                startTime : formatDate( '{year}-{month}-{day}', nowTime),
                endTime : formatDate( '{year}-{month}-{day}', endTime),
                currencyCode : dropCurry.mark
            },
            type : 'GET',
            success : this.handBackDetails,
        });
    }
    //处理返回的数据1
    handBackDetails = (data) =>{
        if(data.statusCode == 0){
            // console.log('返回的数据：', data);
            if(data.list.length != 0){
                var messArr = [];
                data.list.forEach((ele, index) => {
                    messArr.push(ele);
                });
                this.setState({
                    cashDetailsObj : messArr,
                    pageAllNum : data.count / this.singlePageNum <= 1 ? 0 :  Math.ceil(data.count / this.singlePageNum)
                });
            }
        }
    }
    //处理返回的数据2
    handBackDetails2 = (data) =>{
        if(data.statusCode == 0){
            // console.log('返回的数据：', data);
            if(data.list.length != 0){
                var messArr = [];
                data.list.forEach((ele, index) => {
                    messArr.push(ele);
                });
                this.setState({
                    cashDetailsObj : messArr
                });
            }
        }
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
    //处理标题显示
    handTitleMess = (ele) => {
        if(ele.subject == '101'){
            return ele.shopName + '店' + (ele.id ? ele.id + '窗口台' : '') + '现金明细' 
        }else if(ele.subject == '102'){
            return ele.shopName + '店' + (ele.alias ? '(别名)' + ele.alias : '') + '银行卡明细' 
        }
    }
    //选择的店铺币种
    setShopCurry = (curry) => {
        //shopId.mark为币种代码 name为名字
        this.seletedCurry = curry;
        this.setState({
            seletedCurry : curry
        });
        // console.log('获取选择的店铺币种:', this.seletedCurry);
    }
    //设置今天
    setNowDay = (e) => {
        this.setState({
            //开始
            nowTime : new Date(),
            //结束
            endTime : new Date()
        });
    }
    //设置一周前
    setOneWeek = (e) => {
        var nowDay = new Date();
        nowDay.setDate(nowDay.getDate() - 7);
        console.log('前一周：',nowDay);
        this.setState({
                //开始
                nowTime : nowDay,
                //结束
                endTime : new Date()    
            });
    }
    //设置一月前
    setOneMonth = (e) => {
        var nowDay = new Date();
        nowDay.setMonth(nowDay.getMonth() - 1);
        console.log('前一月：',nowDay);
        this.setState({
            //开始
            nowTime : nowDay,
            //结束
            endTime : new Date()    
        });
    }
    render(){
        const { 
            nowTime,
            endTime,
            //要显示的详细信息
            cashDetailsObj,
            //分页符的总页数
            pageAllNum,
            //选择币种
            dropCurry
        } = this.state;
        const {
            //选择的账户信息
            selectedDetMess
        } = this.props;
        return (
            <div    className='mingxi'>
                <div className='cashdetails__title'>
                    {this.handTitleMess(selectedDetMess)}
                </div>
                <div className='cashdetails__calendar'>
                    <Mycalendar getDateFuc={this.getNowTime}
                                selectDate = {nowTime}
                                timeMess='查询开始日期:'
                                />
                    <Mycalendar getDateFuc={this.getEndTime}
                                selectDate = {endTime}
                                mDate = {nowTime}
                                timeMess='查询结束日期:'
                                />
                </div>
                <div    className='mingxi__btn'>
                    <div    className='mingxibtn'
                            onClick={this.setNowDay}
                            >
                        今天
                    </div>
                    <div    className='mingxibtn'
                            onClick={this.setOneWeek}
                            >
                        最近一周
                    </div>
                    <div    className='mingxibtn'
                            onClick={this.setOneMonth}
                            >
                        最近一月
                    </div>
                    <div className='mingxibz'>
                        { dropCurry != '' &&  <DropList 
                                data={dropCurry}
                                iconHeight={'1.375em'}
                                opWarpPosTop={'1.375em'}
                                opWarpwidth={'6em'}
                                opheight={'1.375em'}
                                callFuc={this.setShopCurry}
                            />}
                    </div>
                    <div className='cashdetails__calendar__btn'
                        onClick={this.getQueryData}
                        >查&nbsp;&nbsp;询</div>
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
                                        交易日期
                                    </th>
                                    <th>
                                       交易时间
                                    </th>
                                    <th className='incomr'>
                                        应收款额
                                    </th>
                                    <th className='outcomg'>
                                        已收款额
                                    </th>
                                    <th className='ycomy'>
                                        未收款额
                                    </th>
                                    {/* <th>
                                        账目类型
                                    </th> */}
                                    {/* <th>
                                        借入方
                                    </th> */}
                                    <th>
                                        对方账户
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
                                                {ele.inAmount ? (ele.inAmount/100 + '').match(/\d{1,3}/g).join(','): 0}</td>
                                           <td className='outcomg'>
                                                {ele.outAmount ? ele.outAmount/100 + ' ' + ele.currencyCode  : 0}</td>
                                           <td className='ycomy'>
                                                {ele.amount ? (ele.amount/100 + '').match(/\d{1,3}/g).join(',') : 0}</td>
                                           {/* <td>{ele.tradeType ? ele.tradeType : ''}</td>
                                           <td>{ele.toAccount ? ele.toAccount : ''}</td> */}
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
                                url : '/shop/getAccountDetailList',
                                data : {
                                    subject : selectedDetMess.subject,
                                    cardID : selectedDetMess.internalAccount,
                                    startTime : formatDate( '{year}-{month}-{day}', nowTime),
                                    endTime : formatDate( '{year}-{month}-{day}', endTime),
                                    timestamp:new Date().getTime(),
                                    currencyCode : dropCurry.mark                                     
                                }
                            }}
                            singlePageNum={this.singlePageNum}
                            callfuc = {this.handBackDetails2}
                        />}     
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}
export default Mingxi;