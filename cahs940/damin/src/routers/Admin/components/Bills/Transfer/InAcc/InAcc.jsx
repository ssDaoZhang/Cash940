import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import formatDate from 'format-date';
import './InAcc.css';
import myAjax from '../../../../../../tools/myAjax';
class InAcc extends Component{
    constructor(props){
        super(props);
        this.state = {
            //借出账户列表
            payAccList : ''
        };
    }
    componentDidMount(){
        myAjax({
            url : '/shop/getAccountList',
            data : { 
                type:1,
                appID : JSON.parse(sessionStorage['appID']),
                //店铺ID
                // shopID:this.seletedShopId.mark,
                //语言
                lan:'zh_CN', 
                //时间戳
                timestamp : new Date().getTime(),
                token : JSON.parse(sessionStorage['token']),
            },
            type : 'GET',
            success : this.handBackData,
        });
    }
    //处理返回数据
    handBackData = (data) => {
        // console.log('接入方账户：', data);
        if(data.statusCode == 0){
            // console.log('经手人返回的数据：', data.list);
            // var userMessArr = data.list;
            this.setState({
                payAccList : data.list
            });
        }
        // console.log('借出账户返回的数据：', data);
    }
    //处理卡名
    handCardName = (data) => {
        var account = data.account,
            accountName = data.accountName;
        
        if(account == ''){
            return '';
        }else{
            return accountName + account.match(/\d{4}$/)[0];
        }
    }
    render(){
        const {
            payAccList 
        } = this.state;
        const {
            callFuc
        } = this.props;
        // console.log('借出账户信息：', payAccList);
        return(
            <div className='inacccenter'>
                <table>
                    <thead>
                        <tr>
                            <th>资金类别</th>
                            <th>店铺名</th>                            
                            <th>店铺卡名</th>
                            <th>店铺卡别名</th>
                            <th>资金账户编号</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        {
                            payAccList != '' && payAccList.map((ele, index) => {
                                return  <tr     key={index}
                                                onClick={e => {callFuc(ele)}}
                                                >
                                    <td>{ele.subjectName}</td>
                                    <td>{ele.shopName || ele.simpleName}</td>
                                    <td>{this.handCardName(ele)}</td>
                                    <td>{ele.alias ? ele.alias : ''}</td>
                                    <td>{ele.id}</td>
                                </tr>  
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default InAcc;