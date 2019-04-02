import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';

import Navbar from '../Navbar/index';

class Mycollection extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='bankc'>
                <Navbar userole = 'boss' parentUrl = '/admin' sele='cell7'/>
                我的收藏
            </div>
        );
    }
}
export default Mycollection;