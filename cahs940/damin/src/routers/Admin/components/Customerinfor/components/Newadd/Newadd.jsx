import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';
import './Newadd.css';
import DropList from '../../../../../../components/DropList/DropList';
import Citybox from '../../../../../../components/Citybox/Citybox';
class Newadd extends Component {
    constructor(props){
      super(props);
      this.cardTypeArr =[
          { name : '身份证', mark : 1},
          { name : '护照', mark : 2},
          { name : '学生证', mark : 3},
          { name : '军官证', mark : 4},
          { name : '居住证', mark : 5},
          { name : '职工证', mark : 6}
      ];
      this.state = {      
        custName : '',
        custSex : '0',
        cardTypeMark : 1,
        cardCode : '',
        custPho : '',
        custPic : '',
        accName : '',
        accBankAddress: '',
        accBank : '',
        accBcode : '',
        accArr : [],
        //是否显示确认修改按钮
        reviseflag : false,
        //要修改的信息index
        accIndex : '',
        //读取的证件照url
        imgUrl : '',
        //是否打开城市选择窗口
        accBankAddressFlag : false
      };
      this.imgfile =  '';
      this.tempAccArr = [];
      this.appID = 'web';//软件序列号
      this.lan = 'zh_CN';//语言
    //   this.formData = new FormData();
    //银行列表
        this.bankList = [
            { "status" : 0, "bankName" : "中国农业银行", "bankCode":"ABC0" },
            { "status" : 0, "bankName" : "农业银行", "bankCode":"ABC1" },
            { "status" : 0, "bankName" : "农业银行1", "bankCode":"ABC2" },
            { "status" : 1, "bankName" : "中国大华银行", "bankCode":"ABC3" },
            { "status" : 0, "bankName" : "中国工商银行", "bankCode":"ABC4" },
            { "status" : 0, "bankName" : "华夏银行", "bankCode":"ABC5" },
            { "status" : 0, "bankName" : "汇丰银行", "bankCode":"ABC6" },
            { "status" : 0, "bankName" : "中国平安银行", "bankCode":"ABC7" },
            { "status" : 0, "bankName" : "中国建设银行", "bankCode":"ABC8" },
            { "status" : 0, "bankName" : "农业银行2", "bankCode":"ABC9" },
            { "status" : 0, "bankName" : "农业银行3", "bankCode":"ABC10" },
            { "status" : 0, "bankName" : "中国农村信用合作社", "bankCode":"ABC11" },
            { "status" : 0, "bankName" : "农业银行4", "bankCode":"ABC12" },
            { "status" : 0, "bankName" : "农业银行5", "bankCode":"ABC13" },
            { "status" : 0, "bankName" : "农业银行6", "bankCode":"ABC14" },
            { "status" : 0, "bankName" : "中国农村信用合作社1", "bankCode":"ABC15" },
            { "status" : 0, "bankName" : "农业银行7", "bankCode":"ABC16" },
            { "status" : 1, "bankName" : "农业银行11", "bankCode":"ABC17" },
            { "status" : 0, "bankName" : "深圳福田银座村镇银行", "bankCode":"ABC18" },
            { "status" : 0, "bankName" : "农业银行8", "bankCode":"ABC19" },
            { "status" : 0, "bankName" : "农业银行9", "bankCode":"ABC20" },
        ];  
        
        this.bankArr = [];
        this.bankList.forEach(ele => {
            if(ele.status == 0){
                this.bankArr.push({ name : ele.bankName, mark : ele.bankCode });
            }
        });
    }
    setCustName = (e) => {
        this.setState({
            custName : e.target.value
        });
    }
    setCustSex = (e) => {
        console.log('选择的客户性别：', e.target.value);
        this.setState({
            custSex : e.target.value
        });
    }
    getcardTypeMark = (data) => {
        this.setState({
            cardTypeMark : data
        });
    }
    setCardCode = (e) => {
        this.setState({
            cardCode : e.target.value
        });
    }
    setCustPho = (e) => {
        this.setState({
            custPho : e.target.value
        })
    }
    setAccName = (e) => {
        this.setState({
            accName : e.target.value
        })
    }
    setAccBank = (flag) => {
        this.setState({
            accBank : flag
        })
    }
    setAccBcode = (e) => {
        this.setState({
            accBcode : e.target.value
        })
    }
    // setAccBankAddress = (e) => {
    //     this.setState({
    //         accBankAddress : e.target.value
    //     })
    // }
    setAccArr = (e) => {
        const { accName, accBank, accBcode, accBankAddress} = this.state;
        const { tempAccArr } = this;
        if( accName && accBank && accBcode){
            tempAccArr.push({
                accName : accName,
                accBank : accBank,
                accBcode : accBcode,
                accBankAddress : accBankAddress
            });
            this.setState({
                accArr : tempAccArr.map(ele => ele)
            });
            this.setState({
                accName : '',
                accBank : '',
                accBcode : '',
                accBankAddress : ''
            });
        }
    }
    deleteAccArrEle = (index) => {
        const { tempAccArr } = this;
        console.log(tempAccArr);
        tempAccArr.splice(index, 1);
        console.log(tempAccArr);
        this.setState({
            accArr : tempAccArr.map(ele => ele)
        });
    }
    changeAccArr = (index) => {
        const { tempAccArr } = this;
        this.setState({
            accName : tempAccArr[index].accName,
            accBank : tempAccArr[index].accBank,
            accBcode : tempAccArr[index].accBcode,
            accBankAddress : tempAccArr[index].accBankAddress,
            reviseflag : true,
            accIndex : index
        });
    }

    confirmChangeAccArr = () => {
        const { accIndex, accName, accBank, accBcode, accBankAddress} = this.state;
        const { tempAccArr } = this;
        tempAccArr[accIndex].accName = accName;
        tempAccArr[accIndex].accBank = accBank;
        tempAccArr[accIndex].accBcode = accBcode;
        tempAccArr[accIndex].accBankAddress = accBankAddress;
        this.setState({
            accArr : tempAccArr.map(ele => ele),
            reviseflag : false
        });
    }
    handUploadImg = (e) => {
        e.preventDefault();
        var _this = this;
        var tarImg = e.target.files[0];
        _this.imgfile = tarImg;
        if(tarImg.type.match('image')){
            if( tarImg.size > 2097152){
                alert('图片大小超过限制请重新选择图片上传！！！');
            }else{
                var reader = new FileReader();
                reader.readAsDataURL(tarImg);
                reader.onload =  (e) => {
                    _this.setState({
                        imgUrl : e.target.result
                    });
                };
            }            
        }else{
            alert('请添加图片文件！！！');
        }
    }
    //需要改进检查卡数组中的信息是否全部添加
    submitMess = (e) => {
        var { custName, custSex, cardTypeMark, cardCode, custPho, accArr } = this.state;
        var { imgfile, appID, lan} = this;
        var formData = new FormData();
        var timemstamp = new Date().getTime();
        if( custName != '' && custSex !='' && cardTypeMark != '' && cardCode != '' && custPho != ''){
            console.log('添加表单信息');
            formData.append('name', custName); 
            formData.append('gender', custSex); 
            formData.append('certificateCode', cardTypeMark); 
            formData.append('cardImg', imgfile);
            formData.append('appID', appID);
            formData.append('lan', lan);
            formData.append('timemstamp', timemstamp);
            formData.append('token', '123454656');

        }
        // console.log(formData.get('name'));
        // console.log(formData.get('gender'));
        // console.log(formData.get('certificateCode'));
        // console.log(formData.get('cardImg'));
        // console.log(formData.get('appID'));
        // console.log(formData.get('lan'));
        // console.log(formData.get('timemstamp'));
        // console.log(formData.get('token'));
    } 

    //获取用户选择的开户地城市
    getRUserCity = (citystr) => {
        this.setState({
            accBankAddress : citystr
        });
    }
    //关闭选择开户行城市窗口
    setCityFalse = (e) =>{
        this.setState(preState => {
            return {
                accBankAddressFlag : !preState.accBankAddressFlag
            };
        });
    }
    render(){
        const {match} = this.props;
        const { cardTypeArr,  tempAccArr, getRUserCity, setCityFalse, bankArr } = this;
        const { cardTypeMark,
                custName,  
                cardCode, 
                custPho,
                accName,
                accBankAddress,
                accBank,
                accBcode,
                custSex,
                accArr,
                reviseflag,
                imgUrl,
                accBankAddressFlag
            } = this.state;
            console.log('银行卡数组：', accArr);
            console.log('银行卡开户地：', accBankAddress);
        return (
            <div className='newadd'>
                <h2>新客户资料填写</h2>
                <div className = 'newadd__mess'>
                    <div className = 'newadd__mess__m1'>
                        <label className='newadd__mess__m1__name'>姓名：
                            <input type="text" placeholder='请输入客户姓名' value={custName} onChange={this.setCustName}/>
                        </label>
                        <div className='newadd__mess__m1__sex'>性别：
                            <div className='newadd__mess__m1__sex__s'>
                                <input type="radio" value='0' name='sex' defaultChecked onClick={this.setCustSex}/>
                                <span>男</span>
                                <input type="radio" value='1' name='sex' onClick={this.setCustSex}/>
                                <span>女</span>
                            </div>
                        </div>
                        <div className='newadd__mess__m1__cardtype'>证件类型：
                            <div className='newadd__mess__m1__cardtype__list'>
                                <DropList   data={cardTypeArr} 
                                            callFuc={this.getcardTypeMark} 
                                            opWarpwidth="6em"
                                            opheight="1.5em"
                                            opWarpPosTop="1.5em" 
                                            iconHeight='1.5em'/>
                            </div>
                        </div>
                        <label className='newadd__mess__m1__cardcode' value={cardCode} onChange={this.setCardCode}>证件号：<input type="text" placeholder='请输入客户证件号码' /></label>
                        <label className='newadd__mess__m1__pho' value={custPho} onChange={this.setCustPho}>联系方式：<input type="text" placeholder='请输入客户手机号码'/></label>
                        <label className='newadd__mess__m1__pic'>添加证件照：<input type="file" onChange={this.handUploadImg} accept="image/jpeg,image/jpg,image/png"/></label>
                        <img src={imgUrl || './images/card.png'} alt="上传的证件照片"/>
                    </div>
                    <div className = 'newadd__mess__m2'>
                        <label className='newadd__mess__m2__name'>账户名：
                            <input type="text" placeholder='请输入银行卡持有人姓名' value={accName} onChange={this.setAccName}/>
                        </label>
                        <label className='newadd__mess__m2__bank'>开户行：
                            {/* <input type="text" placeholder='请输入银行卡的开户行' value={accBank} onChange={this.setAccBank}/> */}
                            <div className='newadd__mess__m2__bank__droplist'>
                                <DropList   data={bankArr} 
                                            callFuc={this.setAccBank} 
                                            opWarpPosTop="1.5em" 
                                            opWarpwidth="11em"
                                            opheight="1.5em"
                                            iconHeight='1.5em'/>
                            </div>
                        </label>
                        <label className='newadd__mess__m2__bankaddress'>开户地：
                            {/* <input type="text" placeholder='请输入银行卡的开户地' value={accBankAddress} onChange={this.setAccBankAddress}/> */}
                            <span   className='newadd__mess__m2__bankaddress__address'
                                    onClick={setCityFalse}>{accBankAddress ? accBankAddress :'点击选择开户地' }</span>
                        </label>
                        <label className='newadd__mess__m2__bcard'>银行卡号：
                            <input type="text" placeholder='请输入银行卡号码' value={accBcode} onChange={this.setAccBcode}/>
                        </label>
                        <div className = 'newadd__mess__m2__btnwarp'>
                            <div className = 'newadd__mess__m2__btnwarp__btn1' onClick={this.setAccArr}>增加客户绑定银行卡</div>
                            { reviseflag && <div className = 'newadd__mess__m2__btnwarp__btn2' 
                                onClick={this.confirmChangeAccArr}>确认修改</div>}
                        </div>
                        {
                            tempAccArr.length != 0 && <table className='newadd__mess__m2__table'>
                            <thead>
                                <tr>
                                    <th>账户名</th>
                                    <th>开户行</th>
                                    <th>开户地</th>
                                    <th>银行卡号</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        accArr.map((ele, index) => {
                                                return <tr key={ele+''+index}>
                                                        <td>{ele.accName}</td>
                                                        <td>{ele.accBank}</td>
                                                        <td>{ele.accBankAddress}</td>
                                                        <td>{ele.accBcode}</td>
                                                        <td><span onClick={()=>{this.deleteAccArrEle(index)}}>删除</span><span onClick={()=>{this.changeAccArr(index)}}>修改</span></td>
                                                </tr>                                            
                                        })
                                    }
                                </tbody>            
                        </table>
                        }
                    </div>
                </div>
                <div className='newadd__submit' onClick={this.submitMess}>提&nbsp;&nbsp;&nbsp;&nbsp;交</div>
                {accBankAddressFlag && <div className='newadd__citybox'>
                        <div className='newadd__citybox__switch' onClick={setCityFalse}></div>
                        <Citybox callFuc={getRUserCity}/>
                </div>}
            </div>           
        );
    }
}
export default Newadd;