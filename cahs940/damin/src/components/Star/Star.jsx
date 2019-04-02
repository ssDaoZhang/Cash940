import React from 'react';
import PropTypes from 'prop-types';
import './Star.css';

/**
 * desc: 星星评分组件
 * props: value 评分 / 十分制 size 星星大小
 * */

const Star = ({ value, size }) => {
  const bgSize = `${size}em`,
        heightstr = size + 'em',
        widthstr = size * 5 + 'em';

  return (
    <div className="star" style={{ height: heightstr, width: widthstr, backgroundSize: bgSize }}>
      <div className="star__top" style={{ width: `${value * 10}%`, backgroundSize: bgSize }} />
    </div>
  );
};

Star.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number
}

export default Star;
