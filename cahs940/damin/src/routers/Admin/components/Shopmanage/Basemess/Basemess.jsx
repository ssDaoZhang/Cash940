import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Basemess.css';
import DropList from '../../../../../components/DropList/DropList';
class Basemess extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedShop : []
        }
    }
    componentDidMount(){
        this.shop = [
            {
                "shopId":112,
                "simpleName":"123456",
                "contact":"123456",
                "address":"123456",
                "status":"0",
                "level":"0",
                "realFalg":"0",
                "currencyCode":"HKD",
                "currencyName":"HKD",
                "cTime":"201809281712",
                "shopNameHongKong":"",
                "simpleNameHongKong":"",
                "shopNameEn":"",
                "simpleNameEn":"",
                "dengJiZheng":"",
                "dengJiZhao":"",
                "fuWuZheng":"",
                "fuWuZhao":"",
                "zhuCeZheng":"",
                "zhuCeZhao":"",
                
            },
            {
                "shopId":112,
                "simpleName":"123456",
                "contact":"123456",
                "address":"123456",
                "status":"0",
                "level":"0",
                "realFalg":"0",
                "currencyCode":"HKD",
                "currencyName":"HKD",
                "cTime":"201809281712",
                "shopNameHongKong":"",
                "simpleNameHongKong":"",
                "shopNameEn":"",
                "simpleNameEn":"",
                "dengJiZheng":"",
                "dengJiZhao":"",
                "fuWuZheng":"",
                "fuWuZhao":"",
                "zhuCeZheng":"",
                "zhuCeZhao":"",
            },
            {
                "shopId":112,
                "simpleName":"123456",
                "contact":"123456",
                "address":"123456",
                "status":"0",
                "level":"0",
                "realFalg":"0",
                "currencyCode":"HKD",
                "currencyName":"HKD",
                "cTime":"201809281712",
                "shopNameHongKong":"",
                "simpleNameHongKong":"",
                "shopNameEn":"",
                "simpleNameEn":"",
                "dengJiZheng":"",
                "dengJiZhao":"",
                "fuWuZheng":"",
                "fuWuZhao":"",
                "zhuCeZheng":"",
                "zhuCeZhao":"",
            }                
        ]
    }
    render(){
        console.log(this.shop);
        return(
            <div className='basemess'>
                <h1 className='basemess__top'>
                    店铺信息查看与修改
                </h1>
                <div className='basemess__list'>
                    <span className='basemess__list__name'>请选择您要查看的店铺:</span>
                    <div className='basemess__list__box'>
                        {/* <DropList   data={bankArr} 
                                                callFuc={this.setAccBank} 
                                                opWarpPosTop="1.5em" 
                                                opWarpwidth="11em"
                                                opheight="1.5em"
                                                iconHeight='1.5em'/> */}
                    </div>
                    <div className='basemess__list__btn'>查&nbsp;&nbsp;询</div>
                </div>
            </div>
        );
    }
}

export default Basemess;