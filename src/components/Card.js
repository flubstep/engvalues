import React from 'react';

import './Card.css';

export default Card = props => {
  let { mark, text, ...otherProps } = props;
  let className = 'Card ' + (mark || '');
  return (
    <div
      {...otherProps}
      className={className}
      >
      { text }
    </div>
  );
};
