import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';
import './Bills.css';
import NavList from '../../../../components/NavList/NavList';
import Navbar from '../Navbar/index';
import Tradflow from './Tradflow/Tradflow';
import More from './More/More';
import Debt from './Debt/Debt';
import Paycom from './Paycom/Paycom';
import Incom from './Incom/Incom';
import Beforepay from './Beforepay/Beforepay';
import Beforeicom from './Beforeicom/Beforeicom';
import Transfer from './Transfer/Transfer';
import Costsheet from './Costsheet/Costsheet';
class Bills extends Component{
    constructor(props){
        super(props);
        this.navItems = [
            { item : '交易流水', url : '', cflag : 'tradflow'},
            { item : '欠款信息', url : '/debt', cflag : 'debt'},
            { item : '多款信息', url : '/more', cflag : 'more'},
            { item : '店铺单据', url : '/incom', cflag : 'shopbill', itemChild : [
                {item : '收款单', url : '/incom'},
                {item : '预收款单', url : '/preincom'},
                {item : '付款单', url : '/paycom'},
                {item : '预付款单', url : '/prepaycom'},
                {item : '未结算单据', url : '/querybill'},
                {item : '单据明细查询', url : '/detail'},
                {item : '转款单', url : '/transfer'},
                {item : '费用单', url : '/costsheet'}
            ]},
            { item : '个人单据', url : '/morebill', cflag : 'singbill', itemChild : [
                {item : '多款单', url : '/morebill'},
                {item : '欠款单', url : '/debtbill'}                
            ]}
        ];
        this.hashSelect = {
            '#/admin/bill' : 'tradflow',
            '#/admin/bill/debt' : 'debt',
            '#/admin/bill/more' : 'more',
            '#/admin/bill/incom' : 'shopbill',
            '#/admin/bill/preincom' : 'shopbill',
            '#/admin/bill/paycom' : 'shopbill',
            '#/admin/bill/prepaycom' : 'shopbill',
            '#/admin/bill/querybill' : 'shopbill',
            '#/admin/bill/detail' : 'shopbill',
            '#/admin/bill/transfer' : 'shopbill',
            '#/admin/bill/costsheet' : 'shopbill',
            '#/admin/bill/morebill' : 'singbill',
            '#/admin/bill/debtbill' : 'singbill'
        }
        this.state = {
            selectItemflag : this.hashSelect[window.location.hash]
        }
    }
    render(){
        const { match } = this.props;
        const { navItems } = this;
        const { selectItemflag } = this.state;
        return(
            <div className='bills mycontent'>
                <Navbar userole = 'boss' parentUrl = '/admin' sele='cell3'/>
                <div className='bills__content center'>
                    <div className='bills__nav'>
                        <NavList listMess={navItems} 
                                 parentUrl={match.url}
                                 cflag={selectItemflag}/>
                    </div>
                    <div className='bills__items'>
                        <div className='bills__items__route'>
                            <Route exact path={ match.url } component={Tradflow}/>
                            <Route path={ `${match.url}/debt` } component={Debt}/>
                            <Route path={ `${match.url}/more`} component={More}/>
                            <Route path={ `${match.url}/paycom`} component={Paycom}/>
                            <Route path={ `${match.url}/incom`} component={Incom}/>
                            <Route path={ `${match.url}/prepaycom`} component={Beforepay}/>
                            <Route path={ `${match.url}/preincom`} component={Beforeicom}/>
                            <Route path={ `${match.url}/transfer`} component={Transfer}/>
                            <Route path={ `${match.url}/costsheet`} component={Costsheet}/>
                        </div>   
                    </div>
                </div>             
            </div>
        );
    }
}
export default Bills;