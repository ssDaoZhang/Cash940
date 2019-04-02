import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './Beforeicom.css';
import Mycalendar from '../../../../../components/Mycalendar/Mycalendar';
class Beforeicom extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDate : ''
        }
        //已有已付款单表头
        this.tableTitle = {
            exchangeTime : '添加日期',
            customerName : '客户名',
            shopName : '店铺名',
            accountName : '店铺卡账户名',
            bankName : '店铺卡开户行',
            cardID : '店铺卡号',
            preStorage : '预存金额',
            operation : '操作'
        };
        // simpleName;//店铺全称
        // customerName ： 客户名
        // exchangeTime : 交易时间 ‘20181206’
        // transferFromID 应收款流水号
        // "shopName":112, 店铺名简称
        // "bankName":"中国银行", 店铺卡开户行
        // "accountName":"老王", 店铺账户名
        // "cardID":"999", 店铺卡号
        // "currencyCode":"USD",
        // "amount":"100"     
    }
    componentDidMount(){
        var tableDetails = [
            {
                // simpleName :  
                // customerName ： 客户名
                // exchangeTime : 交易时间 ‘20181206’
                // transferFromID 应收款流水号
                // "shopName":112, 店铺名简称
                // "bankName":"中国银行", 店铺卡开户行
                // "accountName":"老王", 店铺账户名
                // "cardID":"999", 店铺卡号
                // "currencyCode":"USD",
                // "amount":"100" 
            },

        ];
    }    
    setShowDate = (date) => {
        this.setState({
            showDate : date
        });
    }

    render(){
        const { 
            showDate
        } = this.state;
        const {
            setShowDate
        } = this;
        var showDateStr = showDate != '' && formatDate( '{year}-{month}-{day}', showDate);
        console.log('被选择的日期：', showDate);
        return(
            <div className='beforeicom itemwarp'>
                <div className='itemtitle'>预收款单处理</div>
                <div className='beforeicom__queryshop'>
                    <span>请选择店铺:</span>
                    <div className='beforeicom__queryshop__item'>
                    </div>
                </div>
                <div className='beforeicom__querydate'>
                    <Mycalendar
                            getDateFuc = {setShowDate }
                            timeMess = { '点击选择查询日期' }
                            showFlag = { true }
                        />
                    <span className='beforeicom__querydate__tirps span'>
                        选择的查询日期:
                    </span>
                    <span   className='beforeicom__querydate__item span' 
                            >{showDateStr}
                    </span>
                </div>
                <div className='beforeicom__querycust'>
                    <span className='beforeicom__querycust__btn1'>选择要查询的客户</span>
                    <i className='beforeicom__querycust__tirps1'>选择的查询客户:</i>
                    <i className='beforeicom__querycust__tirps2'></i>
                    <span className='beforeicom__querycust__btn2'>查&nbsp;&nbsp;&nbsp;&nbsp;询</span>
                </div>
                <div className='beforeicom__add'>
                    添加新预付款单
                </div>
            </div>
        );
    }
}

export default Beforeicom;