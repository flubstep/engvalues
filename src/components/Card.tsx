import * as React from 'react';

import './Card.css';

const Card = (props: any) => {
  let { mark, locked, text, ...otherProps } = props;
  let className = (mark === props.stage) ? ' selected' : '';
  className += locked ? ' locked' : '';
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