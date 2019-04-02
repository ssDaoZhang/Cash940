import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDate from 'format-date';
import './ShopAcc.css';
import myAjax from '../../../../../tools/myAjax';
import Mingxi from './Mingxi/Mingxi';
// appID:软件序列号
// lan zh_CN
// timemstamp时间戳
// token  
class ShopAcc extends Component{
    constructor(props){
        super(props);
        this.state = {
            //第一城返回的数据
            listData : '',
            //详情
            sDetails : '',
            //详情标志
            detailFlag : false,
            //选择的详情信息
            selectedDetMess : '',
            //明细
            sMingxi : '',
            //明细标志
            mingxiFlag : false
            
        }
        //第一城返回的数据
        this.tlistData = '';
        //查询索引
        this.queryIndex = '';
    }
    componentDidMount(){
        myAjax({
            url : '/shop/geMytBankList',
            data : {
                appID : JSON.parse(sessionStorage['appID']),
                lan : 'zh_CN',
                timestamp : new Date().getTime(),
                token : JSON.parse(sessionStorage['token']),
            },
            type : 'GET',
            success : this.handMessList
        });
    }
    //第一层处理返回的数据
    handMessList = (data) => {
        var lData = [];
        if(data.statusCode == 0){
            console.log(data.list);
            data.list.forEach((ele, index) => {
                if( ele.status == '已启用' || ele.subject == '101'){
                    lData.push({
                        //银行卡账户名
                        accountName :  ele.accountName || '',
                        //银行卡别名
                        alias : ele.alias || '',  
                        //银行卡开户地
                        bankAddress : ele.bankAddress || '',
                        //开户行代号
                        bankCode : ele.bankCode || '',
                        //银行卡号
                        shopCardCode : ele.shopCardCode,
                        //银行卡开户行
                        bankName :ele.bankName || '',
                        //柜台号 现金使用
                        id : ele.id,   
                        //内部账户号
                        internalAccount : ele.internalAccount || '',
                        //店铺ID
                        shopID : ele.shopID || '',
                        //店铺名
                        shopName : ele.shopName || '', 
                        //科目代码
                        subject : ele.subject || '',
                        //科目名
                        subjectName : ele.subjectName || '',
                        //管理员代号
                        userID : ele.userID || '',
                        //币种余额数组
                        amounts : ele.amounts               
                    });
                }
            });
            this.setState({
                listData : lData
            })
            this.tlistData = lData;
        }
    }
    //处理店铺柜台号、银行卡别名
    handAliasOrId = (subject, ele) => {
        if(subject == '101'){
            return '现金柜台号：' + ele.id;
        }else if(subject == '102'){
            return '银行卡别名：' + ele.alias;
        }
    }
    //查看详情
    getDetailsBox = (ele) => {
        if(ele.subject == '102'){
            this.setState({
                detailFlag : true,
                selectedDetMess : ele
            });
        }else{
            return;
        }
    }
    //关闭详情界面
    closeDetailsBox = (e) => {
        if(e.target.className == 'ShopAcc__detail'){
            this.setState({
                detailFlag : false,
                selectedDetMess : ''
            });
        }
    }
    //查看明细 
    getMingxiBox = (ele) => {
        this.setState({
            mingxiFlag : true,
            selectedDetMess : ele
        });
    }
    //关闭明细界面
    closeMingxiBox = (e) => {
        if(e.target.className == 'ShopAcc__mingxi'){
            this.setState({
                mingxiFlag : false,
                selectedDetMess : ''
            });
        }
    }
    render(){
        const {
            listData,
            //详情标记
            detailFlag,
            //详情
            sDetails,
            //选择的详情
            selectedDetMess,
            //明细标志
            mingxiFlag
        } = this.state;
        // console.log('获取的返回数据：', listData);
        // console.log('选择的详情信息：', selectedDetMess);
        return(
            <div className='assets ShopAcc itemwarp'>
                <div className='itemtitle'>查看店铺账户余额</div>
                <div className='ShopAcc__conbox'>
                    <div className='ShopAcc__conbox__center'>
                        {
                            listData != '' && listData.map((ele, index) => {
                                return <div className='ShopAcc__conbox__center__acc' key={index}>
                                        <div className='ShopAcc__conbox__center__acc__top'>
                                            <div className='itemodj'>{ele.subjectName}</div>
                                            <div className='itemodj'>{'店铺名：' + ele.shopName}</div>
                                            <div className='itemodj'>{ele.subject == '102' ? '管理员编号：' + ele.userID : ''}</div>
                                            <div className='itemodj'>{this.handAliasOrId(ele.subject, ele)}</div>
                                        </div>
                                        <div className='ShopAcc__conbox__center__acc__mid'>
                                            {   
                                                ele.amounts.length != 0 && ele.amounts.map((elel, indexl) => {
                                                    return <div     key={elel.currencyCode + index}
                                                                    className='itemele'>
                                                        {elel.currencyName + '：' + elel.amount}
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className='ShopAcc__conbox__center__acc__bot'>
                                            <span
                                                    onClick={e => { this.getDetailsBox(ele) }}>账户详情</span>
                                            <span
                                                    onClick={e => { this.getMingxiBox(ele) }}>余额明细</span>
                                            <span>转&nbsp;&nbsp;账</span>
                                        </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                {
                    detailFlag && <div  className='ShopAcc__detail'
                                        onClick={this.closeDetailsBox}>
                        {
                            selectedDetMess != '' && <div className='ShopAcc__detail__con'>
                                <div className='ShopAcc__detail__con__top'>
                                    <div className='ShopAcc__detail__con__top__left'>
                                        <div className='Sdctleft'>
                                            {selectedDetMess.shopName ? '店铺名：' + selectedDetMess.shopName : '店铺名：'}
                                        </div>
                                        <div className='Sdctleft'>
                                            {selectedDetMess.internalAccount ? '内部代码：' + selectedDetMess.internalAccount : '内部代码：'}
                                        </div>
                                    </div>
                                    <div className='ShopAcc__detail__con__top__right'>
                                        <div className='Sdctright1'>
                                            复&nbsp;&nbsp;&nbsp;&nbsp;制
                                        </div>
                                        <div className='Sdctright2'>
                                            二维码
                                        </div>
                                    </div>
                                </div>
                                <div className='ShopAcc__detail__con__center'> 
                                    <div className='ShopAcc__detail__con__center__left'>
                                        <div className='Sdccleft'>
                                            {selectedDetMess.accountName  ? '银行卡账户名：' + selectedDetMess.accountName : '银行卡账户名：'}
                                        </div>
                                        <div className='Sdccleft'>
                                            {selectedDetMess.bankCode  ? '银行卡号：' + selectedDetMess.bankCode : '银行卡号：'}
                                        </div>
                                        <div className='Sdccleft'>
                                            {selectedDetMess.bankName  ? '银行卡开户行：' + selectedDetMess.bankName : '银行卡开户行：'}
                                        </div>
                                    </div>
                                    <div className='ShopAcc__detail__con__center__right'>
                                        <span className='Sdccright'>
                                            复&nbsp;&nbsp;&nbsp;&nbsp;制
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
                {
                    mingxiFlag && <div  className='ShopAcc__mingxi'
                                        onClick={this.closeMingxiBox}>
                        <Mingxi selectedDetMess={selectedDetMess}/>
                    </div>
                }
            </div>
        );
    }
}

export default ShopAcc;