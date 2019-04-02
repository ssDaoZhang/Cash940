import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';
import './Shopmanage.css';
import Navbar from '../Navbar/index';
import NavList from '../../../../components/NavList/NavList';
import Addshop from './Addshop/Addshop';
import Basemess from './Basemess/Basemess';
import Shopman from './Shopman/Shopman';
class Shopmanage extends Component{
    constructor(props){
        super(props);
        this.navItems = [
            { item : '店铺信息维护', url : '', cflag : 'basemess'},
            { item : '新增店铺', url : '/addshop', cflag : 'addshop'},
            { item : '店员管理', url : '/shopermanage', cflag : 'shopermanage'}
        ];
        this.hashSelect = {
            '#/admin/shopmanage' : 'basemess',
            '#/admin/shopmanage/addshop' : 'addshop',
            '#/admin/shopmanage/shopermanage' : 'shopermanage'
        }
        this.state = {
            selectItemflag : this.hashSelect[window.location.hash]
        }
    }

    render(){
        const { match } = this.props;
        const { navItems } = this;
        const { selectItemflag } = this.state;
        console.log(window.location.hash);
        console.log(match.url);
        return(
            <div className='shopm mycontent'>
                <Navbar userole = 'boss' parentUrl = '/admin' sele='cell4'/>
                <div className='shopm__content center'>
                    <div className='shopm__nav'>
                        <NavList    listMess={navItems} 
                                 parentUrl={match.url}
                                 cflag={selectItemflag}
                        
                        />
                    </div>
                    <div className='shopm__items'>
                        <Route exact path={ match.url } component={Basemess}/>
                        <Route path={ `${match.url}/addshop` } component={Addshop}/>
                        <Route path={ `${match.url}/shopermanage`} component={Shopman}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Shopmanage;