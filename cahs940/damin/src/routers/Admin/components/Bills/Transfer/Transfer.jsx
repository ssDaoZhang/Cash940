import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './Transfer.css';
// import '../../../../../tools/myAjax';
import DropList from '../../../../../components/DropList/DropList';
import myAjax from '../../../../../tools/myAjax';
import myAjax1 from '../../../../../tools/myAjax1';
import Mycalendar from '../../../../../components/Mycalendar/Mycalendar';
import Middler from './Middler/Middler';
import PayAcc from './PayAcc/PayAcc';
import InAcc from './InAcc/InAcc';
class Transfer extends Component{
    constructor(props){
        super(props);
        this.state = {
            //店铺币种
            dropCurry : '',
            //选择的币种 mark币种代码 name币种名
            seletedCurry : '',
            //已选币种对应的汇率
            rateValue : '',
            //制单日期
            nowTime : new Date(),
            //经手人
            middler : '',
            // //汇率
            // rate : '',
            //说明
            explain : '',
            //摘要
            abstract : '',
            //借出账户 
            payAcc : '',
            //借出账户名
            payAccName : '',
            //借出金额
            payAmount : '',
            //借入账户
            inAcc : '',
            //借入账户
            inAmount : '',
            //借入账户名
            inAccName : '',

            //弹窗标志
            //经手人
            middlerFalg : false,
            //币种
            currencyFlag : false,
            //汇率
            rateFlag : false,
            //说明
            explainFlag : false,
            //摘要
            abstractFlag : false,
            //借出账户 
            payAccFlag : false,
            //借入账户
            inAccFlag : false,
            //本币
            benBi:{
                name:JSON.parse(sessionStorage['shop']).currencyName,
                code:JSON.parse(sessionStorage['shop']).currencyCode
            },
            //币种列表
            biZhongList:[],
            //选择的币种代码
            selectedBiZ:'',
            //table的行
            StableLineNum : [],
            //制单人
            billMaker:JSON.parse(sessionStorage['user']).name || JSON.parse(sessionStorage['user']).nickName,
            //制单人账号
            billMakerAcc:JSON.parse(sessionStorage['user']).account,
            //单据编号
            billNum : '',
            //提示信息
            sTirps : ''
        }
        //已选币种
        this.seletedCurry = '';
        //对本币汇率 它币*汇率 = 本币
        this.ratesObj = '';
        //填写的单信息
        this.billArr = [];
        //table的行
        this.tableLineNum = [];
        //当前选择借入账户时使用index
        this.nowIndex = '';
        //当前选择的汇率
        this.selectedRate = '';
    }
    componentDidMount(){

        myAjax({
            url : '/shop/getShopReferenceRate',
            data : {
                mainCurrencyCode:JSON.parse(sessionStorage['shop']).currencyCode, //港币'HKD', 人民币'CNY'
                appID : JSON.parse(sessionStorage['appID']),
                lan : 'zh_CN',
                timestamp : new Date().getTime(),
                shopID : JSON.parse(sessionStorage['shop']).shopId,
                token : JSON.parse(sessionStorage['token'])              
            },
            type : 'GET',
            success : this.handRates,
            complete: this.ajax2
        });
    }
    //获取汇率
    ajax2 = (data) => {
        myAjax({
            url : '/commos/getCurrencys',
            data : {
                mainCurrencyCode:JSON.parse(sessionStorage['shop']).currencyCode, //港币'HKD', 人民币'CNY'
                appID : JSON.parse(sessionStorage['appID']),
                lan : 'zh_CN',
                timemstamp : new Date().getTime()
            },
            type : 'GET',
            success : this.handCurrencyList,
            // complete: this.ajax3
        });
    }
    //单据编号
    ajax3 = (data) => {
        myAjax({
            url : '/shop/getOrderNo',
            data : {
                type:3,
                appID : JSON.parse(sessionStorage['appID']),
                lan : 'zh_CN',
                timestamp : new Date().getTime(),
                token : JSON.parse(sessionStorage['token'])   
            },
            type : 'GET',
            success : this.handBillNum,
            // complete: this.ajax3
        });
    }
    //处理单据编号
    handBillNum = (data) => {
        if(data.statusCode == 0){
            this.setState({
                billNum : data.orderNo                
            });
        }
    }
    //处理返回的店铺币种列表
    handCurrencyList = (data) => {
        // console.log('币种列表：',data);
        var dropArrt = [];
        const { nowTime} = this.state;
        if(data.statusCode == 0){
            data.currencies.forEach((ele, index) => {
                dropArrt.push({
                    name : ele.currencyName,
                    mark : ele.currencyCode,
                    code : ''
                });
            });
            this.setState({
                dropCurry : dropArrt
            });
            this.setState({
                seletedCurry : {
                    name : data.currencies[0].currencyName,
                    mark : data.currencies[0].currencyCode,
                    code : ''
                }
            });
            this.seletedCurry =  {
                name : data.currencies[0].currencyName,
                mark : data.currencies[0].currencyCode,
                code : ''
            };
        }      
    }
    //选择的店铺币种
    setShopCurry = (curry) => {
        // console.log('已选的币种汇率：', this.ratesObj[this.seletedCurry.mark]);
        //shopId.mark为币种代码 name为名字
        this.seletedCurry = curry;
        this.setState({
            seletedCurry : curry,
            rateValue : this.ratesObj[this.seletedCurry.mark]
        });
        // console.log('获取选择的店铺币种:', this.seletedCurry);
        //当前选择的汇率
        this.selectedRate = this.ratesObj[this.seletedCurry.mark];
    }
    //处理汇率
    handRates = (data) => {
        // console.log('汇率列表：', data.list);
        var tempObj = {};
        if(data.statusCode == 0){
            data.list.forEach((ele, index) => {
                tempObj[ele.currencyCode] = ele.adBuy;
            });
            this.ratesObj = tempObj;
            // console.log('处理过的:', this.ratesObj);
        }
    }

    //选择制单日期
    getNowTime = (time) => {
        this.setState(
            {
                nowTime : time
            }
        );
    }
    //输入的汇率值
    setRateValue = (e) => {
        this.setState({
            rateValue : e.target.value 
        });
    }
    //输入说明
    setExplain = (e) => {
        // console.log(e.target.value);
        this.setState({
            explain : e.target.value 
        });
    }
    //输入摘要
    setAbstract = (e) => {
        // console.log(e.target.value);
        this.setState({
            abstract : e.target.value 
        });
    }
    //输入借出金额
    setPayAmount = (e) => {
        var numStr = e.target.value; 
        if(numStr.match(/[^\d'.']/g)){
            this.setState({
                payAmount : '' 
            });
        }else{
            this.setState({
                payAmount : numStr 
            });
        }
    }
    //增加一行
    addLine = (e) =>{
        this.tableLineNum.push({
            //借入账户
            inAcc : '',
            //账户、卡别名
            alias : '',
            //借入金额
            inAmount : '',
            //本币折算金额
            rawAmount : '',
            //备注
            Remarks : '',
        });
        this.setState({
            StableLineNum : this.tableLineNum.map(ele => ele)
        });
    }
    //查看经手人
    setMiddlerFalg = (e) => {
        this.setState({
            middlerFalg : true
        });
    }
    //关闭经手人
    setMiddlerFalg1 = (e) => {
        // console.log('当前点击的dom:', e.target.className);
        if(e.target.className == 'middlerwarp'){
            this.setState({
                middlerFalg : false
            });
        }
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        // this.setState({
        //     middlerFalg : false
        // });
    }
    //当前选择的经手人
    getMiddler = (data) => {
        this.setState({
            middler : data
        });
    }

    //查看借出账户
    setPayAccFlag = (e) => {
        this.setState({
            payAccFlag : true
        });
    }
    //关闭借出账户
    setPayAccFlag1 = (e) => {
        // console.log('当前点击的dom:', e.target.className);
        if(e.target.className == 'payAccwarp'){
            this.setState({
                payAccFlag : false
            });
        }
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        // this.setState({
        //     middlerFalg : false
        // });
    }
    //当前选择的借出账户
    getPayAcc = (data) => {
        var nameStr;
        if(data.subject == '102'){
            if(data.alias){
                nameStr = data.alias;
            }else if(data.id != null){
                nameStr = (data.shopName || data.simpleName) + data.id + '号卡';
            }else{
                nameStr = data.accountName + data.account.match(/\d{4}$/)[0];
            }
        }else{
            nameStr = (data.shopName || data.simpleName) + data.subjectName;
        }
        this.setState({
            payAcc : data,
            payAccName : nameStr
        });
    }
    //处理借入账户
    handInAccMess = (data) => {
        var nameStr;
        if(data.subject == '102'){
            if(data.alias){
                nameStr = data.alias;
            }else if(data.id != null){
                nameStr = (data.shopName || data.simpleName) + data.id + '号卡';
            }else{
                nameStr = data.accountName + data.account.match(/\d{4}$/)[0];
            }
        }else{
            nameStr = (data.shopName || data.simpleName) + data.subjectName;
        }
        return nameStr;
    }
    //查看借入账户
    setInAccFlag = (index) => {
        this.nowIndex = index;
        this.setState({
            inAccFlag : true
        });
    }
    //关闭借入账户
    setInAccFlag1 = (e) => {
        // console.log('当前点击的dom:', e.target.className);
        if(e.target.className == 'inAccwarp'){
            this.setState({
                inAccFlag : false
            });
        }
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        // this.setState({
        //     middlerFalg : false
        // });
    }
    //当前选择的借入账户
    getInAcc = (data) => {
        this.tableLineNum[this.nowIndex].inAcc = data;
        this.setState({
            StableLineNum : this.tableLineNum.map(ele => ele)
        });
    }

    //获取借入账户金额
    getInAmount = (event, index) => {
        const {benBi} = this.state;
        const {seletedCurry} = this;
        var numStr = event.target.value; 
        if(numStr.match(/[^\d'.']/g)){
            this.tableLineNum[index].inAmount = '';
            this.tableLineNum[index].rawAmount = '';
            this.setState({
                StableLineNum : this.tableLineNum.map(ele => ele)
            });
            // console.log('1:', this.tableLineNum);
            // this.getAllOutAmount(this.tableLineNum);
        }else{
            this.tableLineNum[index].inAmount = numStr;
            if(benBi.code == seletedCurry.mark){
                this.tableLineNum[index].rawAmount = numStr;
            }else{
                this.tableLineNum[index].rawAmount = ( Number(numStr)/Number(this.selectedRate) ).toFixed(2) + '';
            }
            this.setState({
                StableLineNum : this.tableLineNum.map(ele => ele)
            });
            // this.getAllOutAmount(this.tableLineNum);
            // console.log('2:', this.tableLineNum);
        }
    }
    //获取每条借入备注
    getRemarks = (event, index) => {
        var numStr = event.target.value; 
        this.tableLineNum[index].Remarks = numStr;
        this.setState({
            StableLineNum : this.tableLineNum.map(ele => ele)
        });        
    }

    //删除单条借入记录
    delNowRecord = (index) => {
        this.tableLineNum.splice(index, 1);
        this.setState({
            StableLineNum : this.tableLineNum.map(ele => ele)
        });  
    }
    //提交单据信息
    submitMess = (e) => {
        var thiser = this;
        const { //借入记录信息
                tableLineNum, 
                //已选择的汇率
                selectedRate,
                //已选择的币种 
                seletedCurry,
        } = this;
        const {
            //说明
            explain,
            //摘要
            abstract,
            //借出账户 
            payAcc,
            //借出账户名
            payAccName,
            //借出金额
            payAmount,
            //经手人
            middler,
            //本币
            benBi,
            //录单日期
            nowTime
        } = this.state;
        //全部实付 == 借出金额
        var allInAmount = 0;
        tableLineNum.forEach((ele, index) => {
            allInAmount = allInAmount + Number(ele.inAmount);
        });
        //借入账户为空标志
        var inAccNullF = false;
        tableLineNum.forEach((ele, index) => {
            if(ele.inAcc == ''){
                inAccNullF = true;
            }
        });
        if(payAccName == '' || payAmount == ''){
            this.setState({
                sTirps : '借出金额、借入金额不能为空！！！'
            });
            var timer=setTimeout(() => {
                thiser.setState({
                    sTirps : ''
                });
            },1500);
            return;
        }
        if(inAccNullF){
            this.setState({
                sTirps : '借入账户不能为空！！！'
            });
            var timer=setTimeout(() => {
                thiser.setState({
                    sTirps : ''
                });
            },1500);
            return;
        }
        // if(allInAmount == Number(payAmount)){
            var sendData = {
                appID : JSON.parse(sessionStorage['appID']),
                lan : 'zh_CN',
                timestamp : new Date().getTime(),
                token : JSON.parse(sessionStorage['token']),
                ofTime: formatDate( '{year}-{month}-{day}', nowTime),//录单日期
                ofUser: middler.userID,//ID经手人
                des: explain,//说明
                summary: abstract, //摘要
                currencyCode: benBi.code,//币种
                stCurrencyCode:seletedCurry.mark,//结算币种
                rate: Number(selectedRate),//汇率
                // dep部门
                payAccount: payAcc.account,//付款账户
                realAmount: allInAmount,//实付金额
                pOrgCode:payAcc.orgCode,//付款机构
                pSubject : payAcc.subject,//付款科目
                oAmounts:[], //原币金额
                dAmounts:[], //本币金额
                rOrgCodes:[],// 收款机构号
                rSubjects:[], //收款科目
                rAccounts:[], //账户
                remarks:[] //备注               
            }
            tableLineNum.forEach((ele, index) => {
                sendData.oAmounts.push(Number(ele.inAmount));
                sendData.dAmounts.push(Number(ele.rawAmount));
                sendData.rOrgCodes.push(ele.inAcc.orgCode);
                sendData.rSubjects.push(ele.inAcc.subject);
                sendData.rAccounts.push(ele.inAcc.account);
                sendData.remarks.push(ele.Remarks);                                    
            });
            console.log('要提交的数据：', sendData);
            myAjax({
                url : '/commos/getCurrencys',
                data : sendData,
                type : 'POST',
                success : this.handSuccessSub,
                // complete: this.ajax3
            });
        // }else{
        //     this.setState({
        //         sTirps : '借出金额与借入金额总数不匹配！！！'
        //     });
        //     var timer=setTimeout(() => {
        //         thiser.setState({
        //             sTirps : ''
        //         });
        //     },1500);
        // }
    }
    //订单提交成功触发
    handSuccessSub = (data) => {
        var thiser = this;
        if(data.statusCode == 0){
            this.setState({
                sTirps : '提交成功！！！'
            });
            var timer=setTimeout(() => {
                thiser.setState({
                    sTirps : ''
                });
            },1500);
            //借入的所有信息
            this.tableLineNum = [];
            this.setState({
                //说明
                explain:'',
                //摘要
                 abstract:'',
                //借出账户 
                payAcc:'',
                //借出账户名
                payAccName:'',
                //经手人
                middler:'',
                //制单日期
                nowTime:new Date(),
                StableLineNum : [],
                //借出金额
                payAmount:''
            });
        }else{
            this.setState({
                sTirps : '提交失败！！！'
            });
            var timer=setTimeout(() => {
                thiser.setState({
                    sTirps : ''
                });
            },1500);
        }
    }
    //借出总金额联动
    getAllOutAmount = (data) => {
        if( data.length != 0){
            var allInAmount = 0;
            data.forEach((ele, index) => {
                allInAmount = allInAmount + Number(ele.inAmount);
            });
            // console.log('allInAmount:', allInAmount);
            allInAmount = allInAmount + '';
            if(allInAmount.match(/[.]/g)){
                allInAmount = Number(allInAmount).toFixed(2) + '';
            }
            return allInAmount;
        }else{
            return '0'
        }
    }
    render(){
        const {  
                // ratesObj,
                dropCurry,
                //已选币种对应的汇率
                rateValue,
                //说明
                explain,
                //摘要
                abstract,
                //借出金额
                payAmount,
                //table的行
                StableLineNum,
                //制单人
                billMaker,
                //经手人
                middler,
                //弹窗标志
                //经手人
                middlerFalg,
                //已选择的币种 mark币种代码 name币种名
                seletedCurry,
                //汇率
                rateFlag,
                //说明
                explainFlag,
                //摘要
                abstractFlag,
                //借出账户标志 
                payAccFlag,
                //借入账户
                inAccFlag,
                //借出账户名
                payAccName,
                //借出账户
                payAcc,
                //单据编号
                billNum,
                //本币
                benBi,
                //录单日期
                nowTime,
                //提示信息
                sTirps
        } = this.state;
        // console.log('选择的币种：', seletedCurry);
        // console.log('输入的汇率：', rateValue);
        // console.log('选择的经手人：', middler);
        // console.log('录单日期：', nowTime);
        // console.log('选择的借出账户：', payAcc);
        // console.log('借入账户信息：',this.tableLineNum);
        return(
            <div className='transfer itemwarp'>
                <div className='itemtitle'>制作转款单</div>
                <div className='transfer__top'>
                    <div className='transfer__top__sdf'>
                        <div className='transfer__top__tirps'>
                            <span>制单人:</span>
                            <div>{billMaker}</div>
                        </div>
                        <div className='transfer__top__calendar'>
                            <span className='transfertirps'>录单日期:</span>
                            <div className='transferdiv'>
                                <Mycalendar getDateFuc={this.getNowTime}
                                            timeMess=''/>
                            </div>
                        </div>
                        <div className='transfer__top__tirps'>
                            <span>本币种:</span>
                            <div>{benBi.name}</div>
                        </div>
                    </div>
                    <div className='transfer__top__item'>
                        <div className='transfer__top__item__ite'>
                            <span>经手人:</span>
                            <div    className='trantitem'
                                    onClick={this.setMiddlerFalg}>{middler && middler.userName}
                            </div>
                        </div>
                        <div className='transfer__top__item__ite'>
                            <span>借出币种:</span>
                            <div className='transfer__top__item__ite__warp'>
                                { dropCurry != '' &&  <DropList 
                                    data={dropCurry}
                                    iconHeight={'1.75em'}
                                    opWarpPosTop={'1.75em'}
                                    opWarpwidth={'9.625em'}
                                    opheight={'1.75em'}
                                    callFuc={this.setShopCurry}
                                />}
                            </div>
                        </div>
                        <div className='transfer__top__item__ite'>
                            <span>汇&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;率:</span>
                            <label><input   type="text"
                                            value={rateValue} 
                                            // onChange={this.setRateValue}
                                            // placeholder='123'
                            /><i></i>
                            </label>
                        </div>
                    </div>
                    <div className='transfer__top__item'>
                        <div className='transfer__top__item__ite'>
                            <span>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明:</span>
                            <label>
                                <input  type="text"
                                        value={explain} 
                                        onChange={this.setExplain}
                                        // placeholder='123'
                                />
                                <i></i>
                            </label>
                        </div>
                        <div className='transfer__top__item__ite'>
                            <span>摘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要:</span>
                            <label>
                                <input  type="text"
                                        value={abstract} 
                                        onChange={this.setAbstract}
                                />
                                <i></i>
                            </label>
                        </div>
                    </div>
                    <div className='transfer__top__item'>
                        <div className='transfer__top__item__ite'>
                            <span>借出账户:</span>
                            <div    className='trantitem'
                                    onClick={this.setPayAccFlag}>
                                    {payAccName !='' && payAccName}
                                    </div>
                        </div>
                        <div className='transfer__top__item__ite'>
                            <span>借出金额:</span>
                            <div className='inputBoxl'>
                                {this.getAllOutAmount(this.tableLineNum)}
                            </div>
                        </div>
                        <div className='transfer__top__item__ite fontred' title={sTirps}>
                            {sTirps != '' ? '提示信息：' + sTirps : ''}
                        </div>
                        {/* <div className='transfer__top__item__ite'>
                            <span>单据编号:</span>
                            <div    className='trantitem'
                                    title = {billNum}
                                    onClick={this.setPayAccFlag}>
                                    {billNum}
                                    </div>
                        </div> */}
                    </div>                  
                </div>
                <div className='transfer__center'>
                    <table>
                        <thead>
                            <tr>
                                <th>借入账户</th>
                                <th>{seletedCurry.mark ? '借入金额(' + seletedCurry.mark + ')' : ''}</th>
                                <th>{ benBi.code ? '本币折算金额(' + benBi.code + ')' : '' }</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>{
                            StableLineNum.length != 0 && StableLineNum.map((ele, index) => {
                                return(
                                    <tr key={index}>
                                        <td className='delFlag'
                                            onClick={e => {this.setInAccFlag(index)}}>
                                            {ele.inAcc != '' && this.handInAccMess(ele.inAcc)}
                                        </td>
                                        <td className='inputItem1'><input   type="text" 
                                                                            value={ele.inAmount}
                                                                            onChange={e => {this.getInAmount(e, index)}}/>
                                        </td>
                                        <td>
                                            {ele.rawAmount}
                                        </td>
                                        <td className='inputItem2'><input   type="text"
                                                                            value={ele.Remarks}
                                                                            onChange={e => {this.getRemarks(e, index)}}
                                                                            />
                                        </td>
                                        <td     className='delFlag' 
                                                onClick={e => {this.delNowRecord(index)}}
                                            >删除</td>
                                    </tr>
                                )
                            })
                        }</tbody>
                    </table>
                    <div    className='transfer__center__btn'
                            onClick={this.addLine}
                            >增加一行
                    </div>
                    <div    className='transfer__center__submit'
                            onClick={this.submitMess}>
                            提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交
                    </div>
                </div>
                {
                    middlerFalg && <div     className='middlerwarp'
                                            onClick={this.setMiddlerFalg1}
                                            >
                        <Middler callFuc={this.getMiddler}/>
                    </div>
                }
                {
                    payAccFlag && <div     className='payAccwarp'
                                            onClick={this.setPayAccFlag1}
                                            >
                        <PayAcc 
                            callFuc={this.getPayAcc}
                        />
                    </div>
                }
                {
                    inAccFlag && <div     className='inAccwarp'
                                            onClick={this.setInAccFlag1}
                                            >
                        <InAcc 
                            callFuc={this.getInAcc}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default Transfer;