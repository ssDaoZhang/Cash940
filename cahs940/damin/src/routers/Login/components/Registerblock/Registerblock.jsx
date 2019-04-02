import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import './Registerblock.css';
import DropList from '../../../../components/DropList/DropList';
import myAjax from '../../../../tools/myAjax';

class Registerblock extends Component{
    constructor(props){
        super(props);
        this.state = {
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
            phone1:'',
            phone2: '',//手机号
            ph2err: '',
            validCode: '',//验证码
            validCodeErr:'',
            pwd1: '',//首次密码
            pwd2: '',//验证密码
            pwderr:'',
            nick: '',//昵称
            nickerr: '',
            tips: '',//总错误提示
            // getValidCodeFlag: '',
            againGetValidCode:'',
            regFlag : 0
            // againGetTimeOut:60
        }
        this.validType = 1;//注册获取验证码类型
        this.appID = 'web';//软件序列号
        this.lan = 'zh_CN';//语言
        this.avatar = '';//头像
        this.timeOutFlag = true;//获取验证码延迟时间
    }
    setPhone1 = (regCode) => {
        this.setState({
            phone1 : regCode.code || regCode.mark
        })
    }
    setPhone2 = (e) => {
        this.setState({
            phone2 : e.target.value,
            ph2err : ''
        })
    }
    setValidCode = (e) => {
        this.setState({
            validCode : e.target.value
        })
    }
    setPwd1 = (e) => {
        this.setState({
            pwd1 : e.target.value,
            pwderr : ''
        })
    }
    setPwd2 = (e) => {
        this.setState({
            pwd2 : e.target.value
        })
    }
    setNick = (e) => {
        this.setState({
            nick : e.target.value,
            nickerr : ''
        })
        
    }
    setPh2err = (e) => {
        var phcodestr = e.target.value;
        var reg = /\D+/g;
        if(phcodestr.match(reg)){
            this.setState({
                ph2err : '请输入按照正确的手机号格式输入'
            })
        }else if(!phcodestr){
            this.setState({
                ph2err : '手机号不能为空'
            })
        }else{
            this.setState({
                ph2err : '',
                tips : ''
            })
        }
    }
    setPwderr = (e) => {
        var pwd2str = e.target.value;
        if( pwd2str !== this.state.pwd1 ){
            this.setState({
                pwderr : '两次密码不一致'
            });
        }else{
            this.setState({
                pwderr : '',
                tips : ''
            });           
        }
    }
    setValidCodeErr = (e) => {
        var validCodeErrstr = e.target.value;
        if( validCodeErrstr === ''){
            this.setState({
                validCodeErr : '验证码不能为空'
            });
        }else{
            this.setState({
                validCodeErr : '',
                tips : ''
            });
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
    getValidCode = (e) => {
        var { phone1, phone2, ph2err, pwderr, againGetValidCode, pwd1, nick} = this.state, 
            // phone = phone1 + phone2,
            validType = this.validType,
            appID = this.appID,
            lan = this.lan,
            timemstamp = new Date().getTime();
        var againGetTimeOut = 60;
        var _this = this;
        if(_this.timeOutFlag){        
            if(phone2 !== '' && ph2err === '' && pwderr === '' && !againGetValidCode && pwd1 != '' && nick != ''){
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
                    var timer = setInterval(()=>{
                        againGetTimeOut = againGetTimeOut - 1;
                        _this.setAgainGetValidCode(againGetTimeOut);
                        if(againGetTimeOut < 0 ){
                            clearInterval(timer);
                            _this.timeOutFlag = true;
                        }
                    }, 1000);
            }else if(phone2 === '' || pwd1 === '' || nick === ''){
                if(phone2 === ''){
                    this.setState({
                        ph2err : '手机号不能为空'
                    });
                } 
                if( pwd1 === ''){
                    this.setState({
                        pwderr : '密码不能为空'
                    });                    
                }
                if( nick === ''){
                    this.setState({
                        nickerr : '昵称不能为空'
                    }); 
                }
            }else{
                this.setState({
                    tips : '您添写的信息有误请按照提示修改'
                });
            }
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

    submReg = (e) => {
        var { phone1, phone2, ph2err, validCode, nick, pwd1, validCodeErr, pwderr} = this.state,
            // phone = phone1 + phone2,
            avatar = this.avatar,
            appID = this.appID,
            lan = this.lan,
            timemstamp = new Date().getTime(),
            _this = this;
            if( phone2 !== '' && validCode != '' && ph2err ==='' && validCodeErr === '' && pwderr ===''  && pwd1 != '' && nick != ''){
                myAjax({
                    url:'/reg',
                    data: {
                        phoneArea : phone1,
                        phone : phone2,
                        validCode : validCode,
                        nick : nick,
                        pwd : pwd1,
                        appID : appID,
                        lan : lan,
                        timemstamp : timemstamp
                    },
                    success : _this.getRegResData
                })
            }else if(phone2 === '' || validCode === '' || pwd1 === '' || nick === ''){
                    if(phone2 === ''){
                        this.setState({
                            ph2err : '手机号不能为空'
                        }); 
                    }  
                    if( validCode === '' ){
                        this.setState({
                            validCodeErr : '验证码不能为空'
                        }); 
                    }
                    if( pwd1 === ''){
                        this.setState({
                            pwderr : '密码不能为空'
                        });                    
                    }
                    if( nick === ''){
                        this.setState({
                            nickerr : '昵称不能为空'
                        }); 
                    }
            }else{
                this.setState({
                    tips : '您添写的信息有误请按照提示修改'
                });
            }
    }

    getRegResData = (data) => {
        if(!data.statusCode){
            this.setState({
                regFlag : 1
            });
            var token = JSON.stringify(data.token),
                user  = JSON.stringify(data.user),
                shop = JSON.stringify(data.shop),
                shopRates = JSON.stringify(data.shopRates),
                shopRoundings = JSON.stringify(data.shopRoundings),
                shopShiftAllowErrorMaxs = JSON.stringify(data.shopShiftAllowErrorMaxs);
                sessionStorage['token'] = token;
                sessionStorage['shop'] = shop;
                sessionStorage['user'] = user;
                sessionStorage['shopRates'] = shopRates;
                sessionStorage['shopRoundings'] = shopRoundings;
                sessionStorage['shopShiftAllowErrorMaxs'] = shopShiftAllowErrorMaxs;
        }else{
            this.setState({
                regFlag : 0,
                tips : data.detailMsg
            });
        }
        // console.log('返回的数据:' , data);
        // console.log('请求的状态:', data.statusCode);
        // console.log('返回的mess:', data.detailMsg);
        // console.log('返回的token:', data.token);
        // console.log('账户信息：', data.user);
        // console.log('店铺信息：', data.shop);
        // console.log('店铺汇率：', data.shopRates);
        // console.log('四舍五入：', data.shopRoundings);
        // console.log('误差上限：', data.shopShiftAllowErrorMaxs);
    }
    
    subm2Reg = () => {
        var _this = this;
        document.onkeydown = (e) => {
            // console.log('兼职：', e);
            // console.log('兼职：', e.keyCode);
            if(e.keyCode == 13){
                _this.submReg(e);
            }
        };
    }

    render(){
        this.subm2Reg();
        const {url} = this.props.match;
        // console.log('嵌套路由：',url);
        const { 
                phoneRegNum, 
                phone1, 
                phone2, 
                validCode, 
                pwd1, 
                pwd2, 
                nick, 
                nickerr,
                ph2err, 
                pwderr, 
                tips,
                againGetValidCode,
                validCodeErr,
                regFlag
            } = this.state;
        // console.log('手机号：', phone1 + phone2, '\n', 
        //             '密码1:', pwd1, '\n', 
        //             '密码2：', pwd2, '\n', 
        //             "昵称：", nick, '\n', 
        //             '验证码：', validCode,);
        // console.log('aaaa:', againGetValidCode);
        const {match} = this.props;
        // console.log('是否跳转：', regFlag);

        console.log('选择的区号：', phone1);

        if(regFlag){
            return < Redirect to='/admin'/>
        }
        return(
            <div className='registereg'>
                <span className='registereg__mess'>请填写您的注册信息，以下信息填写完成后获取验证码即可注册成功</span>
                <div className='registereg__pho'>
                        <label htmlFor="regpho" className='registereg__pho__ph1'></label>
                        <div className='registereg__pho__ph3'><DropList callFuc={this.setPhone1} data={phoneRegNum} opWarpPosTop={'1.95em'} iconHeight={'1.95em'}/></div>
                        <input id='regpho' className='registereg__pho__ph2' 
                               type="text" placeholder='请输入手机号' 
                               value={phone2} onChange={this.setPhone2}
                               onBlur={this.setPh2err}/>
                        <i className='registereg__pho__ph4'></i>
                </div>
                <span className="registereg__tip">{ph2err}</span>
                <div className='registereg__pass'>
                        <label htmlFor="regpass1" className='registereg__pass__pa1'></label>
                        <input id='regpass1' className='registereg__pass__pa2' 
                               placeholder='请输入密码' type="password"
                               value={pwd1} onChange={this.setPwd1}/>
                        <i className='registereg__pass__pa3'></i>
                </div>
                <span className="registereg__tip"></span>
                <div className='registereg__pass'>
                        <label htmlFor="regpass2" className='registereg__pass__pa1'></label>
                        <input id='regpass2' className='registereg__pass__pa2' 
                               placeholder='请验证密码' type="password"
                               value={pwd2} onChange={this.setPwd2} onBlur={this.setPwderr}/>
                        <i className='registereg__pass__pa3'></i>     
                </div>
                <span className="registereg__tip">{pwderr}</span>
                <div className='registereg__pass'>
                        <label htmlFor="regpass3" className='registereg__pass__pa1'id='nichen'></label>
                        <input id='regpass3' className='registereg__pass__pa2' 
                               placeholder='请输入昵称' type="text"
                               value={nick} onChange={this.setNick}/>
                        <i className='registereg__pass__pa3'></i>
                </div>
                <span className="registereg__tip">{nickerr}</span>
                <div className='registereg__code'>
                        <label htmlFor="regcode" className='registereg__code__cod1'></label>
                        <input id='regcode' className='registereg__code__cod2' 
                               type="text" placeholder='请输入验证码'
                               value={validCode} onChange={this.setValidCode}
                               onBlur={this.setValidCodeErr}/>
                        <div className='registereg__code__cod3' onClick={this.getValidCode}>{` ${ againGetValidCode || '获取验证码'}`}</div>
                </div>
                <span className="registereg__tip">{validCodeErr}</span>
                <div className='registereg__submit' onClick={this.submReg}>
                    注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
                </div>
                <span className='registereg__messtips'>{tips}</span>  
            </div>
        );
    }
}
export default Registerblock;