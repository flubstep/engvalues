import * as React from 'react';

import './Card.css';

const Card = (props) => {
  let { mark, stage, text, ...otherProps } = props;
  let className = (mark === stage) ? ' selected' : '';
  return (
    <div
      {...otherProps}
      className={'Card' + className}
      >
      {text}
    </div>
  );
};

export default Card;