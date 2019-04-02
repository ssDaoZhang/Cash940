import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Pmess.css';
import Star from '../../../../../components/Star/Star';
import CutAvatar from './CutAvatar/CutAvatar';
class Pmess extends Component{
    constructor(props){
        super(props);
        this.state = {
            changeAccFlag : 0,
            accName : '+866182369454223',
            avatarCutMess : '',
            retAvatarUrl : '',
            CutImgBoxFlag : false,
            sex : '0'
        };
    }
    setAccName = (e) => {
        this.setState({
            accName : e.target.value
        });
    }
    changeAcc = (index) => {
        this.setState({
            changeAccFlag : index
        });
    }
    setSex = (data) => {
        this.setState({
            sex : data
        });
    }
    getRetAvatarUrl = (url) =>{
        this.setState({
            retAvatarUrl : url,
            CutImgBoxFlag : false
        });
    }
    setCutImgBoxFlag = (e) => {
        this.setState({
            CutImgBoxFlag : true
        });
    }
    render(){
        const {
            changeAccFlag,
            accName,
            retAvatarUrl,
            CutImgBoxFlag,
            sex            
        } = this.state;
        console.log('sex:', sex);
        return (
            <div className='pmess'>
                <div className="pmess__box">
                    <div className='pmess__box__topreg'>
                        <div className='pmess__box__topreg__avatarwarp'>
                            <img className='pmess__box__topreg__avatar' src={ retAvatarUrl || "./images/avatar.png"} alt="" />
                            <i onClick={this.setCutImgBoxFlag}>点击更换头像</i>
                        </div>
                        <div className='pmess__box__topreg__sign'>   
                            <div className='pmess__box__topreg__sign1'>
                                <div className='pmess__box__topreg__sign1__s11'>幕后Boss</div>
                                <div className={`${ 0&&'pmess__box__topreg__sign1__act1'} pmess__box__topreg__sign1__s12`}>
                                    <i></i>
                                    <span>未实名认证</span>
                                </div>
                            </div>
                            <div className='pmess__box__topreg__sign2'>
                                <span className='pmess__box__topreg__sign2__s21'>平台会员等级</span>
                                <div className='pmess__box__topreg__sign2__s22' >
                                    <Star value={7} size={1}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pmess__box__mess'>
                        <div className='pmess__box__mess__acc'>
                            <span className='pmess__box__mess__acc__title'>账户名：</span>
                            { changeAccFlag == 0 && <div className='pmess__box__mess__acc__code'>{accName}</div>}
                            {changeAccFlag == 1 && <input type="text" 
                                                    value={accName} 
                                                    onChange={this.setAccName} 
                                                    onBlur={(e)=>this.changeAcc(0)} 
                                                    className='pmess__box__mess__acc__input'  
                                                    placeholder={accName}/>}
                            <span className='pmess__box__mess__acc__tips'>
                                {changeAccFlag == 0 && <span onClick={(e)=>this.changeAcc(1)}>更改</span>}可用于登录,仅能更改一次请牢记哦~
                            </span>
                        </div>
                         <span className='pmess__box__mess__tag'>{changeAccFlag == 1?'账户名必须同时包含字母和数字':''}</span>
                        <div className='pmess__box__mess__pho'>
                            <span className='pmess__box__mess__pho__title'>手机号：</span>
                            <div className='pmess__box__mess__pho__code'>+866182369454223</div>
                            <span className='pmess__box__mess__pho__tips'>
                                <span>更改</span>
                            </span>
                        </div>
                        <div className='pmess__box__mess__nick'>
                            <span className='pmess__box__mess__nick__title'>昵称：</span>
                            <input className='pmess__box__mess__nick__input' type="text" placeholder='lili'/>
                        </div>
                        <div className='pmess__box__mess__sex'>
                            <span className='pmess__box__mess__sex__title'>性别：</span>
                            <div className='pmess__box__mess__sex__input'>
                            <label htmlFor="sexman"><input id='sexman' onClick={()=>this.setSex('0')} name='sex'  type="radio" value='0' defaultChecked/>男</label>
                            <label htmlFor="sexwoman"><input id='sexwoman'  onClick={()=>this.setSex('1')} name='sex'  type="radio" value='1'/>女</label>
                            </div>
                        </div>
                    </div>
                </div>               
                {CutImgBoxFlag && <CutAvatar sendCutImg = {this.getRetAvatarUrl}/>}            
            </div>
        );
    }
}
export default Pmess;