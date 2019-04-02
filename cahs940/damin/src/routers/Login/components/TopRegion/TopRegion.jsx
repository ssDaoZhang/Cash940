import React from 'react';
import PropTypes from 'prop-types';
import './TopRegion.css';
const TopReg = () =>{
    return(
        <div className="top__topregion center">
            <div className='top__logo'></div>
            <div className='top__name'></div>
            <span className='top__toptext'>为了您能有更好的服务体验，请尽快进行个人及店铺信息的实名认证！！！</span>
        </div>
    );
}
export default TopReg;