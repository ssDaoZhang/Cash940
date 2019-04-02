import React from 'react';
import PropTypes from 'prop-types';

const Tablebody = ({dataObj}) => {
    // console.log('余额日期：', selectedDateArr);
    // console.log('余额对象：',dataObj);
    // console.log('传入的卡号：', dataObj);
    // console.log('传入的客户卡数据：', dataObj);
  return (
    <tr 
        >
        <td>{dataObj.accountName}</td>
        <td>{dataObj.bankName}</td>
        <td>{dataObj.shopCardCode.match(/\d{1,4}/g).join(' ')}</td>
    </tr>
  );
};

// Tablerow.propTypes = {
//     dataObj: PropTypes.object.isRequired
// };

export default Tablebody;