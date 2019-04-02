import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';
import './MyAcc.css';
import Pmess from './Pmess/Pmess';
import NavList from '../../../../components/NavList/NavList';
import Navbar from '../Navbar/index';

//临门贵客  一线干员 一店之长 幕后boss
class MyAcc extends Component{
    constructor(props){
        super(props);

        this.navItems = [
            { item : '个人信息', url : '#1', cflag : 'pmess'},
            { item : '实名认证', url : '#2', cflag : 'bereal'},
            { item : '修改密码', url : '#3', cflag : 'expwd'},
            { item : '我的平台', url : '#4', cflag : 'plat' },
            { item : '我的商圈', url : '#5', cflag : 'tradArea'}
        ];
        this.hashSelect = {
            '#/admin#1' : 'pmess',
            '#/admin#2' : 'bereal',
            '#/admin#3' : 'expwd',
            '#/admin#4' : 'plat',
            '#/admin#5' : 'tradArea'
        };
        this.user = {
            account : '15022605157',
            avatar : null,
            gender : 0,
            level : 1,
            name : '炒黄豆',
            nickName : '干煸黄豆',
            phone : '15022605157',
            pwd : '456123',
            realFlag : 1,
            roles : [
                { roleCode : 'assistant', role : '店员', des : null},
                { roleCode : 'visitor', role : '游客', des : null}
            ]
        }
        this.shop = {
            address : '深圳福田下水径',
            cTime : '201809271833',
            contact : '',
            currencyCode : 'HKD',
            currencyName : '港币',
            level : 0,
            realFlag : 0,
            shopId : 102,
            shopName : '可口可乐',
            status : '0'
        }
        this.state = {
            selectItemflag : window.location.hash == '#/admin' ? 'pmess' : this.hashSelect[window.location.hash]
        };
    }
    setSItemflag = (flag) =>{
        this.setState({
            selectItemflag : flag
        });
    }
    render(){
        const { match } = this.props;
        const { navItems, user , shop } = this;
        const { selectItemflag } = this.state;
        console.log('我的账户中的个人信息：', match.url);
        console.log(window.location.hash);
        console.log('切换标志：', selectItemflag);
        return (
            <div className='myacc mycontent'>
                <Navbar userole = 'boss' parentUrl = '/admin' sele='cell1'/>   
                <div className='myacc__content center'>
                    <div className='myacc__nav'>
                        <NavList listMess={navItems} cflag={selectItemflag} parentUrl={match.url} getFlag={this.setSItemflag}/>
                    </div>
                    <div className='myacc__items'>
                         <div className='myacc__items__pmess'>
                            { selectItemflag == 'pmess' && <Pmess/> }
                            { selectItemflag == 'bereal' && <div>实名认证</div>}
                            { selectItemflag == 'expwd' && <div>修改密码</div>}
                            { selectItemflag == 'plat' && <div>我的平台</div>}
                            { selectItemflag == 'tradArea' && <div>我的商圈</div>}
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}
export default MyAcc;