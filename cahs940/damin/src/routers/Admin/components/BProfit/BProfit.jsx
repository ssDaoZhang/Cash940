import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';
import './BProfit.css';
import Navbar from '../Navbar/index';
import NavList from '../../../../components/NavList/NavList';
import Pall from './Pall/Pall';
import Panalysis from './Panalysis/Panalysis';
import Sinshop from './Sinshop/Sinshop';
import Assets from './Assets/Assets';
import ShopAcc from './ShopAcc/ShopAcc';
import Print from './Print/Print';
class BProfit extends Component{
    constructor(props){
        super(props);
        this.navItems = [
            { item : '总利润', url : '', cflag : 'pall'},
            { item : '店铺利润', url : '/sinshop', cflag : 'sinshop'},
            { item : '利润走势分析', url : '/panalysis', cflag : 'panalysis'},            
            { item : '店铺资产', url : '/assets', cflag : 'assets'},
            { item : '店铺账户', url : '/shopacc', cflag : 'shopacc'},
            { item : '打印', url : '/print', cflag : 'print'}
        ];
        this.hashSelect = {
            '#/admin/profit' : 'pall',
            '#/admin/profit/sinshop' : 'sinshop',
            '#/admin/profit/panalysis' : 'panalysis',
            '#/admin/profit/assets' : 'assets',
            '#/admin/profit/shopacc' : 'shopacc',
            '#/admin/profit/print' : 'print'
        }
        this.state = {
            selectItemflag : this.hashSelect[window.location.hash]
        }
    }


    render(){
        // console.log('利润分析');
        const { match } = this.props;
        const { navItems } = this;
        const { selectItemflag } = this.state;
        return (
            <div className='bprofit mycontent'>
                <Navbar userole = 'boss' parentUrl = '/admin' sele='cell2'/>   
                <div className='bprofit__content center'>
                    <div className='bprofit__nav'>
                        <NavList listMess={navItems} 
                                 parentUrl={match.url}
                                 cflag={selectItemflag}/>
                    </div>
                    <div className='bprofit__items'>
                         <div className='bprofit__items__route'>
                            <Route exact path={ match.url } component={Pall}/>
                            <Route path={ `${match.url}/sinshop` } component={Sinshop}/>
                            <Route path={ `${match.url}/panalysis`} component={Panalysis}/>
                            <Route path={ `${match.url}/assets`} component={Assets}/>
                            <Route path={ `${match.url}/shopacc`} component={ShopAcc}/>
                            <Route path={ `${match.url}/print`} component={Print}/>
                        </div>   
                    </div>
                </div> 
            </div>
        );
    }
}
export default BProfit;