import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ZDX.css';
class ZDX extends Component{
    constructor(props){
        super(props);
        this.state = {
            shopBankList : []
        }
    }
    componentDidMount(){
        this.setState({
            shopBankList : [
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                },
                {
                    "shopCardCode":'6222034000006751931',
                    "bankCode":"ABC",
                    "bankName":"中国银行",
                    "shopName":"999总店",
                    "shopID":"0001",
                    "accountName":"老王",
                    "bankAddress":"老王"
                }                                      
            ]
        });
    }


    render(){
        const {
            shopBankList
        } = this.state;
        const {
            getShopCardMess
        } = this.props;
        console.log('银行卡列表：',shopBankList);
        return(
            <div className='zdx'>
                <div className='zdx__title'>请选择店铺收款银行卡</div>
                <div className='zdx__warp'>
                {
                    shopBankList.length != 0 &&  shopBankList.map((ele, index) => {
                        return <div className='zdx__item' key={ele + index + ''} 
                                onClick={e => { getShopCardMess(ele) }}>
                            <div className='zdx__item__it1'>
                                <div className='zdx__item__warp1'>
                                <span className='zdx__item__it1__sp1'>店铺名：</span>
                                <span className='zdx__item__it1__sp1'>{ele.shopName}</span>
                                </div>
                                {/* <p></p> */}
                                <div className='zdx__item__warp2'>
                                <span className='zdx__item__it1__sp1'>开户行：</span>
                                <span className='zdx__item__it1__sp1'>{ele.bankName}</span>
                                </div>
                            </div>
                            <div className='zdx__item__it2'>
                                <div className='zdx__item__it2__i1'>
                                    <span className='zdx__item__it2__i1__sp1'>账户名：</span>
                                    <span className='zdx__item__it2__i1__sp1'>{ele.accountName}</span>
                                </div>
                                <div className='zdx__item__it2__i1'>
                                    <span className='zdx__item__it2__i1__sp1'>银行卡号：</span>
                                    <span className='zdx__item__it2__i1__sp1'>{ele.shopCardCode.match(/\d{1,4}/g).join(' ')}</span>
                                </div>
                            </div>
                        </div>
                    })
                }
                </div>
            </div>
        );
    }
}
export default ZDX;