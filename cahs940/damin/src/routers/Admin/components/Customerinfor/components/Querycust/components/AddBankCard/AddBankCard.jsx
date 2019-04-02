import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './AddBankCard.css';

//上层组件需传入的porps :, appID, lan, token 
class AddBankCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            accountAddress : '',
            bankCode : '',
            accountName : '',
            cardID : '',
            customerID : this.props.customerID
        }
    }
    setAccountAddress = (e) => {
        this.setState({
            accountAddress : e.target.value
        });
    }
    setBankCode = (e) => {
        this.setState({
            bankCode : e.target.value
        });
    }
    setAccountName = (e) => {
        this.setState({
            accountName : e.target.value
        });
    }
    setCardID = (e) => {
        this.setState({
            cardID : e.target.value
        });
    }
    render(){
        const { 
                accountAddress, 
                bankCode, 
                accountName, 
                cardID 
            } = this.state;

        return (
            <div className="ABCard">
                <label>开户地：<input type="text" 
                                    className='ABCard__accAddress' 
                                    name='accountAddress'
                                    value={accountAddress}
                                    placeholder='请输入银行卡开户地'
                                    onChange={this.setAccountAddress}/></label>
                <label>开户行：<input type="text" 
                                    className='ABCard__bankCode' 
                                    name='bankCode'
                                    value={bankCode}
                                    placeholder='请输入银行卡开户行'
                                    onChange={this.setBankCode}/></label>
                <label>账户名：<input type="text" 
                                    className='ABCard__accName' 
                                    name='accountName'
                                    value={accountName}
                                    placeholder='请输入银行卡账户名'
                                    onChange={this.setAccountName}/></label>
                <label>卡号：<input type="text" 
                                    className='ABCard__cardID' 
                                    name='cardID'
                                    value={cardID}
                                    placeholder='请输入银行卡卡号'
                                    onChange={this.setCardID}/></label>
                <div className="ABCard__btn">添&nbsp;&nbsp;&nbsp;&nbsp;加</div>
            </div>
        );
    }
}
  
//   ShowBankCard.propTypes = {
//     value: PropTypes.number.isRequired,
//     size: PropTypes.number
//   }
  
  export default AddBankCard;