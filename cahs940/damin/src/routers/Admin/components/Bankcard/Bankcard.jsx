import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';

import Navbar from '../Navbar/index';
class Bankcard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='bankc mycontent'>
                <Navbar userole = 'boss' parentUrl = '/admin' sele='cell5'/>
                银行卡管理
            </div>
        );
    }
}
export default Bankcard;