import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import './Loginblock.css';
import DropList from '../../../../components/DropList/DropList';
import myAjax from '../../../../tools/myAjax';
class Loginblock extends Component{
    constructor(props){
        super(props);
        var localAcc = localStorage['account'] != undefined && JSON.parse(localStorage['account']),
            localPwd = localStorage['pwd'] != undefined && JSON.parse(localStorage['pwd']),
            localAuto = localStorage['autoLogin'] != undefined && JSON.parse(localStorage['autoLogin']);
        this.state = {
            loginSwitchFlag : true,
            loginTips : '短信验证登录',
            loginSwitch : '切换到账号密码登录',
            phoneRegNum : [
                            { name : '中国大陆', code : '+86'},
                            { name : '中国台湾', code : '+886'},
                            { name : '中国香港', code : '+852'},
                            { name : '马来西亚', code : '+60'},
                            { name : '新加坡', code : '+65'},
                            { name : '日本', code : '+81'},
                            { name : '韩国', code : '+82'},
                            { name : '美国', code : '+1'},
                            { name : '加拿大', code : '+1'},
                            { name : '澳大利亚', code : '+61'},
                            { name : '新西兰', code : '+64'}
            ],
            //区号
            phone1: '',
            //手机号
            phone2: '',
            ph2err: '',
            validCode: '',
            validCodeErr:'',
            account: localAcc || '',
            accountErr: '',
            pwd: localPwd || '',
            pwdErr: '',
            autoLogin: localAuto || false,
            tips : '',
            // getValidCodeFlag: '',
            againGetValidCode:'',
            //againGetTimeOut:60//获取验证码延迟时间
            loginFlag : 0
          };
          this.validType = 2;//登录获取验证码类型
          this.appID = '867029031148480';//软件序列号
          this.lan = 'zh_CN';//语言
          this.timeOutFlag = true;//是否禁止获取验证码
          this.timer = null;
    };
    componentDidMount(){
        //本地记录appID
        sessionStorage['appID'] = JSON.stringify(this.appID);
    }
    componentWillUnmount(){
        clearInterval( this.timer);
    }
    setPhone1 = (regCode) => {
        // obj.code || obj.mark
        this.setState({
            phone1 : regCode.code || regCode.mark
        });
    }
    setPhone2 = (e) => {
        this.setState({
            phone2 : e.target.value,
            tips : '' 
        });
        console.log('输入的手机号：', this.state.phone2);
    }
    setValidCode = (e) => {
        this.setState({
            validCode : e.target.value
        });
    }
    setPwd = (e) => {
        this.setState({
            pwd : e.target.value,
        })
    }
    setAccount = (e) => {
        this.setState({
            account : e.target.value,
            tips : ''
        })
    }
    setAutoLogin = (e) => {
        // e.preventDefault();
        var { account, pwd, autoLogin} = this.state;
        // console.log('自动登录：', e.target.value);
        if(autoLogin){
            this.setState((preState, props) => {
                return {
                            autoLogin : !preState.autoLogin
                        };
            });
            localStorage['account'] = '';
            localStorage['pwd'] = '';
            localStorage['autoLogin'] =  JSON.stringify(false);
        }else{
            this.setState((preState, props) => {
                return {autoLogin : !preState.autoLogin};
            });
        }
    }
    switchLogMethod = (e) => {
        this.setState((preState, porps) =>{
            return{
                loginSwitchFlag : !preState.loginSwitchFlag,
                loginTips : preState.loginTips === '短信验证登录' ? '账号密码登录' : '短信验证登录',
                loginSwitch : preState.loginSwitch === '切换到账号密码登录' ? '切换到短信验证登录' : '切换到账号密码登录'
            }
        })
    }

    setPh2err = (e) => {
        var phcodestr = e.target.value;
        var reg = /\D+/g;
        // console.log('str:', phcodestr, 'reg:', phcodestr.match(reg));
        if(phcodestr.match(reg)){
            this.setState({
                ph2err : '请输入按照正确的手机号格式输入'
            })
        }else if(!phcodestr){
            this.setState({
                ph2err : '手机号不能为空'
            });
        }else{
            this.setState({
                ph2err : '',
                tips : ''
            });
        }
    }

    setAccountErr = (errStr) => {
        this.setState({
            accountErr : errStr
        });
    }
    setPwdErr = (errStr) => {
        this.setState({
            pwdErr : errStr
        });
    }
    setValidCodeErr = (errStr) => {
        this.setState({
            validCodeErr : errStr
        });
    }
    setErr = ( e, callfnc, str) => {
        var phcodestr = e.target.value;
        if( phcodestr === ''){
            callfnc(str);
        }else{
            callfnc('');
        }
    }

    setAgainGetValidCode = (data) => {
        if(data >= 0){
            this.setState({
                againGetValidCode : '重新发送(' + data +')'
            });
        }else{
            this.setState({
                againGetValidCode : ''
            });
        }
    }
    //ajax 请验证码
    getValidCode = (e) => {
        var { phone1, phone2, ph2err, pwderr, againGetValidCode} = this.state, 
            phone = phone1 + phone2,
            validType = this.validType,
            appID = this.appID,
            lan = this.lan,
            timemstamp = new Date().getTime();
        var againGetTimeOut = 60;
        var _this = this;
        if(_this.timeOutFlag){ 
            if(phone2 !== '' && ph2err === '' && !againGetValidCode){
                _this.timeOutFlag = false;
                myAjax({
                        url:'/user/phoneCode',
                        data: {
                            phoneArea : phone1,
                            phone : phone2,
                            validType : validType,
                            appID : appID,
                            lan : lan,
                            timemstamp : timemstamp
                        },
                        type : 'GET',
                        success : _this.getValidCodeResData
                    })
                    _this.timer = setInterval(()=>{
                    againGetTimeOut = againGetTimeOut - 1;
                    _this.setAgainGetValidCode(againGetTimeOut);
                    if(againGetTimeOut < 0 ){
                        clearInterval( _this.timer);
                        _this.timeOutFlag = true;
                    }
                }, 1000);    
            }else if(phone2 === ''){
                this.setState({
                    ph2err : '手机号不能为空'
                });
            }
        } 
    }
    //账号密码登录
    submAccLogin = () => {
            var { account, pwd, phone1} = this.state,
            appID = this.appID,
            lan = this.lan,
            timemstamp = new Date().getTime(),
            regacc = /[A-z]/g,
            regpho = /^\d{7,15}$/g,
            // pholog = phone1 + account,
            _this = this;
        if(account !== '' && pwd !== ''){
            if(account.match(regacc)){
                myAjax({
                    url:'/user/login',
                    data: {
                        accessFrom:5,
                        phoneArea : phone1,
                        phone : '',
                        validCode : '',
                        account : account,
                        pwd : pwd,
                        appID : appID,
                        lan : lan,
                        timemstamp : timemstamp,
                        type : 1
                    },
                    success: _this.getResData
                })
            }else if(account.match(regpho)){
                myAjax({
                    url:'/user/login',
                    data: {
                        accessFrom:5,
                        phoneArea : phone1, 
                        phone : account,
                        validCode : '',
                        account : '',
                        pwd : pwd,
                        appID : appID,
                        lan : lan,
                        timemstamp : timemstamp,
                        type : 3
                    },
                    success: _this.getLoginResData
                })
            }
        }else{
            if(account === ''){
                this.setState({
                        accountErr : '账号或手机号不能为空'
                });
            }
            if(pwd === '' ){
                this.setState({
                    pwdErr : '密码不能为空'
                });
            }
        }
    }
    //手机验证码登录
    submPhoLogin = () => {
        var { phone1, phone2, validCode } = this.state,
            phone = phone1 + phone2,
            appID = this.appID,
            lan = this.lan,
            timemstamp = new Date().getTime(),
            _this = this;
        if (phone2 !== '' && validCode !== '') {
            myAjax({
                url: '/user/login',
                data: {
                    accessFrom:5,
                    phone : phone,
                    validCode : validCode,
                    account : '',
                    pwd : '',
                    appID : appID,
                    lan : lan,
                    timemstamp : timemstamp,
                    type : 2
                },
                success : _this.getLoginResData
            })
        }else{
            if (phone2 === '') {
                this.setState({
                    ph2err: '手机号不能为空'
                });
            }
            if (validCode === '') {
                this.setState({
                    validCodeErr: '验证码不能为空'
                });
            }
        }
    }
    submLogin = (e) => {
        var {loginTips} = this.state;
        if( loginTips === '短信验证登录' ){
            // console.log('短信验证登录');
            this.submPhoLogin();
        }else if(loginTips === '账号密码登录'){
            // console.log('账号密码登录');
            this.submAccLogin();
        }
    }
    subm2Login = () => {
        var _this = this;
        document.onkeydown = (e) => {
            // console.log('兼职：', e);
            // console.log('兼职：', e.keyCode);
            if(e.keyCode == 13){
                var {loginTips} = this.state;
                if( loginTips === '短信验证登录' ){
                    // console.log('短信验证登录');
                    _this.submPhoLogin();
                }else if(loginTips === '账号密码登录'){
                    // console.log('账号密码登录');
                    _this.submAccLogin();
                }
            }
        };
    }
    //等录返回处理函数
    getLoginResData = (data) => {
        var { autoLogin,  loginTips, account, pwd} = this.state;
        if(!data.statusCode){
            console.log('请求回调进来了');
            // console.log('用户角色：', data.user);
            // console.log('店铺信息：', data.shop);
            // console.log('用户角色：', data.roles);
            var token = JSON.stringify(data.token),
                user  = JSON.stringify(data.user),
                shop = JSON.stringify(data.shop),
                //用户角色
                roles = JSON.stringify(data.user.roles);
                // shopRates = JSON.stringify(data.shopRates),
                // shopRoundings = JSON.stringify(data.shopRoundings),
                // shopShiftAllowErrorMaxs = JSON.stringify(data.shopShiftAllowErrorMaxs),
                // statusCode = JSON.stringify(data.statusCode);
                sessionStorage['token'] = token;
                sessionStorage['shop'] = shop;
                sessionStorage['user'] = user;
                sessionStorage['roles'] = roles;
                // sessionStorage['shopRates'] = shopRates;
                // sessionStorage['shopRoundings'] = shopRoundings;
                // sessionStorage['shopShiftAllowErrorMaxs'] = shopShiftAllowErrorMaxs;
                // sessionStorage['statusCode'] = statusCode;
            if(loginTips === '账号密码登录' && autoLogin){
                localStorage['account'] = JSON.stringify(account);
                localStorage['pwd'] = JSON.stringify(pwd);
                localStorage['autoLogin'] =  JSON.stringify(true);
            }
            this.setState({
                loginFlag : 1
            });
        }else{
            this.setState({
                loginFlag : 0,
                tips : data.detailMsg
            });
        }
    }
    getValidCodeResData = (data) => {
        // console.log(data);
        if(data.statusCode){
            this.setState({
                loginFlag : 0,
                tips : data.detailMsg
            });
        }
    }

    render(){
        this.subm2Login();
        const { 
                loginSwitchFlag,
                loginTips, 
                loginSwitch, 
                phoneRegNum,
                phone1,
                phone2,
                validCode,
                account,
                pwd,
                autoLogin,
                ph2err,
                accountErr,
                validCodeErr,
                pwdErr,
                tips,
                againGetValidCode,
                loginFlag
            } = this.state;

            if(loginFlag){
                return < Redirect to='/admin'/>
            }
        return(
            <div className='loginreg'>
                <div className='loginreg__mess'>
                    <span className='loginreg__mess__tips'>{loginTips}</span>
                    <span className='loginreg__mess__switch' onClick={this.switchLogMethod}>{`${loginSwitch}>`}</span>
                </div>
                {
                    loginSwitchFlag && <div className='loginpho'>
                        <div className='loginpho__pho'>
                            <label htmlFor="logpho" className='loginpho__pho__ph1'></label>
                            <div className='loginpho__pho__ph3'>
                                <DropList callFuc={this.setPhone1} data={phoneRegNum} opWarpPosTop={'2.375em'} iconHeight={'2.375em'}/>
                            </div>
                            <input id='logpho' className='loginpho__pho__ph2' 
                               type="text" placeholder='请输入手机号'
                               value={phone2} onChange={this.setPhone2}
                               onBlur={this.setPh2err}/>
                        </div>
                        <span className='loginreg__tip'>{ph2err}</span>
                        <div className='loginpho__code'>
                        <label htmlFor="logcode" className='loginpho__code__cod1'></label>
                        <input id='logcode' className='loginpho__code__cod2' 
                               type="text" placeholder='请输入验证码'
                               value={validCode} onChange={this.setValidCode}
                               onBlur={(e) => { this.setErr(e, this.setValidCodeErr, '验证码不能为空')}}/>
                        <div className='loginpho__code__cod3' onClick={this.getValidCode}>{` ${ againGetValidCode || '获取验证码'}`}</div>
                        </div> 
                        <span className='loginreg__tip'>{validCodeErr}</span>                       
                    </div>
                }
                {
                    !loginSwitchFlag && <div className='loginAcc'>
                    {/* <div className='loginAcc__Acc'>
                        <label htmlFor="logAcc" className='loginAcc__Acc__ac1'></label>
                        <input id='logAcc'  className='loginAcc__Acc__ac2' 
                               placeholder='请输入账号或手机号' type="text"
                               value={account} onChange={this.setAccount}
                               onBlur={(e) => { this.setErr(e, this.setAccountErr, '账号或手机号不能为空')}}/>
                    </div> */}
                    <div className='loginpho__pho'>
                            <label htmlFor="logpho" className='loginpho__pho__ph1'></label>
                            <div className='loginpho__pho__ph3'>
                                <DropList callFuc={this.setPhone1} data={phoneRegNum} opWarpPosTop={'2.375em'} iconHeight={'2.375em'}/>
                            </div>
                            <input id='logpho' className='loginpho__pho__ph2' 
                               placeholder='请输入账号或手机号' type="text"
                               value={account} onChange={this.setAccount}
                               onBlur={(e) => { if(autoLogin){localStorage['account'] = JSON.stringify(account);} this.setErr(e, this.setAccountErr, '账号或手机号不能为空')}}/>
                    </div>
                    <span className='loginreg__tip'>{accountErr}</span>   
                    <div className='loginAcc__pass'>
                        <label htmlFor="logpass" className='loginAcc__pass__pa1'></label>
                        <input id='logpass' className='loginAcc__pass__pa2' 
                               placeholder='请输入密码' type="password"
                               value={pwd} onChange={this.setPwd}
                               onBlur={(e) => { if(autoLogin){localStorage['pwd'] = JSON.stringify(pwd);} this.setErr(e, this.setPwdErr, '密码不能为空')}}/>
                    </div>
                    <span className='loginreg__tip'>{pwdErr}</span>   
                    <div className='loginAcc__ps'>
                        <div className='loginAcc__ps__ps1'><input   type="checkbox" 
                                                                    value='自动登录'  
                                                                    onClick={this.setAutoLogin}
                                                                    defaultChecked = {`${autoLogin ? 'defaultChecked' : ''}`}
                                                                    // disabled = {autoLogin ? '' : 'disabled'}
                                                                    /><span>记住密码</span></div>
                        <span className='loginAcc__ps__ps2'>{'找回密码>'}</span>
                    </div>
                    </div>
                }
                    <div className='loginreg__submit' onClick={this.submLogin}>
                        登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
                    </div>
                <span className='loginreg__messtips'>{tips}</span>
            </div>
        );
    }
}
export default Loginblock;