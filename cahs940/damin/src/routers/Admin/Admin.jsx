import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';
import './Admin.css';
import Topmenu from '../../components/Topmenu/index';
import Navbar from './components/Navbar/index';
import MyAcc from './components/MyAcc/MyAcc';
import ShopRefer from './components/ShopRefer/ShopRefer';
import Customerinfor from './components/Customerinfor/Customerinfor';
import BProfit from './components/BProfit/BProfit';
import Bills from './components/Bills/Bills';
import Shopmanage from './components/Shopmanage/Shopmanage';
import Bankcard from './components/Bankcard/Bankcard';
import Mycollection from './components/Mycollection/Mycollection';
// import Topbar from '../../components/Topbar/Topbar';
// import Carousel from '../../components/carousel/carousel';
// import Product from './compents/Product/Product';
// import Productplat from './compents/Productplat/Productplat';
class Admin extends Component {
  constructor(props){
    super(props);
    if(sessionStorage['token']){
      // console.log('店铺信息：', sessionStorage['shop']);
      // console.log('用户信息：', sessionStorage['user']);
      // console.log('token:', sessionStorage['token']);
    var shop = JSON.parse(sessionStorage['shop']),
        // shopRates = JSON.parse(sessionStorage['shopRates']),
        // shopRoundings = JSON.parse(sessionStorage['shopRoundings']),
        // shopShiftAllowErrorMaxs = JSON.parse(sessionStorage['shopShiftAllowErrorMaxs']),
        user = JSON.parse(sessionStorage['user']),
        token = JSON.parse(sessionStorage['token']);
        // statusCode = JSON.parse(sessionStorage['statusCode']);
        // console.log(shop);
        // console.log(shopRates);
        // console.log(shopRoundings);
        // console.log(shopShiftAllowErrorMaxs);
        // console.log(user);
        // console.log(token);
        // console.log('登录状态码：',statusCode);
    //用户
    this.useritem = user;
    //昵称
    this.nick = user.nickName;
    //姓名
    this.name = user.name;
    //账户
    this.account = user.account;
    //用户角色
    this.roles = user.roles;
    //手机号
    this.phone = user.phone;
    //是否实名认证
    this.userealFlag = user.realFlag;
    //性别
    this.gener = user.gener;
    //账户级别
    this.userlevel = user.level;
    //头像
    this.avatar = user.avatar;

    //店铺
    this.shop = shop ? shop : '';
    //店铺名
    this.shopName = shop ? shop.shopName : '';
    //店铺昵称
    this.simpleName = shop ? shop.simpleName : '';
    //店铺ID
    this.shopId = shop ? shop.shopId : '';
    //店铺地址
    this.address = shop ? shop.address : '';
    //店铺联系方式
    this.contact = shop ? shop.contact : '';
    //店铺主货币
      //币名
      this.curencyName = shop ? shop.curencyName : '';
      //en
      this.curencyCode = shop ? shop.curencyCode : '';
    //开店时间
    this.cTime = shop ? shop.cTime : '';
    //店铺运行状态
    this.status = shop ? shop.status : '';
    //店铺等级
    this.shoplevel = shop ? shop.level : '';    
    //店铺是否实名认真
    this.shoprealFlag = shop ? shop.realFlag : '';
    //登陆后的token
    this.token = token || '';

    //店铺汇率表
    // this.shopRates = shopRates;
    //店铺交易四舍五入
    // this.shopRoundings = shopRoundings;
    //店铺交易误差上限
    // this.shopShiftAllowErrorMaxs = shopShiftAllowErrorMaxs;

    // this.state = {
    //   statusCode : !statusCode
    // }
    // }else{
    //   this.state = {
    //     statusCode : false
    //    }
    }

    //判断角色配置页面路由
    // var resRoles = '';
    // this.roles.forEach((ele, index) => {
    //   resRoles = resRoles + ele.roleCode;
    // });
    // if( resRoles.match('boss') ){
    //   this.currentRole = 'boss';
    // }else if(resRoles.match('manager')){
    //   this.currentRole = 'manager';
    // }else if(resRoles.match('assistant')){
    //   this.currentRole = 'assistant';
    // }else if(resRoles.match('visitor')){
    //   this.currentRole = 'visitor';
    // }
    this.currentRole = 'boss';
  }
 
  render() {
    // const {resData} = this.state;
    const { nick, account, phone, roles, useritem, shop, currentRole} = this;
    // const { statusCode } = this.state;
    // console.log('11111:', BProfit);
    // const { match } = this.props;
    // console.log('statusCode:', statusCode);

    //正常参数 this.token != ''
    if(!sessionStorage['token']){
      return < Redirect to='/login'/>;
    }
    // console.log('nick:', nick);
    // console.log('account', account);
    // console.log('phone:', phone);
    // console.log('roles:', roles);
    const {match} = this.props;
    // console.log('父路径1111：',  match.url);

    return (
      <div className="admin mycontent">
            <div className="mycontent">
              <Topmenu useracc= { `${this.nick || this.account || this.phone}`}/>
            </div>
            {
              currentRole === 'boss' && <div className='admin__route'>               
                <Route  path={ `${match.url}/profit` } component={BProfit}/>
                <Route  path={ `${match.url}/bill` } component={Bills}/>
                <Route path={`${match.url}/shopmanage`} component={Shopmanage}/>
                <Route path={`${match.url}/bankcard`} component={Bankcard}/>
                <Route  path={ `${match.url}/custinfor` } component={Customerinfor}/>
                <Route path={`${match.url}/mycollection`} component={Mycollection}/> 
              </div>
            }
            {
              currentRole === 'visitor' && <div className='admin__route'>
              <Route exact={true} path={ match.url } component={()=>{return<MyAcc user={useritem} shop={shop}/>}}/>
              <Route path={ `${match.url}/shopmanage`  } component={()=>{return<ShopRefer user={useritem} shop={shop}/>}}/>
              </div>
            }
            <div className='admin__route'>
              <Route exact={true} path={match.url} component={MyAcc}/>  
            </div>
      </div>
    );
  }
}
    
Admin.propTypes = {
  // data : PropTypes.array.isRequired
};
    
export default Admin;