import React from 'react';
import PropTypes from 'prop-types';
import './ShowBankCard.css';
const ShowBankCard = ({ dataArr }) => {

    return (
      <div className="SBCard">
        {   
            dataArr && dataArr.map((ele, index) => {
                return <div className='SBCard__item' key={ele+'' +index}>
                        <div className='SBCard__item__it1'>
                            <span>{ele.bankName}</span>
                            <span>{'开户行：' + ele.bankCode}</span>
                            <span>{'开户地：' + ele.accountAddress}</span>        
                        </div>
                        <div className='SBCard__item__it2'>
                            <div>{'账户名：' + ele.accountName}</div>
                            <div>{'卡号：' + ele.cardID}</div>
                        </div>
                </div>
            })
        }
      </div>
    );
  };
  
//   ShowBankCard.propTypes = {
//     value: PropTypes.number.isRequired,
//     size: PropTypes.number
//   }
  
  export default ShowBankCard;