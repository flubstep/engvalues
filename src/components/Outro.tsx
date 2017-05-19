import * as React from 'react';
const _ = require('lodash');

import './CardReview.css';
import './ModalCommon.css'


class OutroModal extends React.Component<any,any> {

  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      transitionClass: '',
    };
  }

  render() {
    let { cards, ...otherProps } = this.props;
    return (
      <div className={'modal-container'}>
        <div
          {...otherProps}
          className={'ModalCommon modal-inner'}
          >
          <div className={'ModalCommon--margin'}>
            <h1>Your Engineering Wishlist</h1>
            <p className="ModalCommon--content">
              All done! The items you selected as most important are:
            </p>
            <ul className="ModalCommon--content">
            {cards.map((card: any) => (
              <li> {card.text} </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class Outro extends React.Component<any,any> {

  render() {
    let stages = [1, 2, 3, 4, 5];
    let cardsByStage = _.fromPairs(stages.map(stage => [stage, []]));
    for (let card of this.props.cards) {
      let stage = card.mark;
      cardsByStage[stage] = cardsByStage[stage] || [];
      cardsByStage[stage].push(card);
    }
    let wishlist: any = []
    for (let stage of [5, 4, 3, 2]) {
      wishlist.push.apply(wishlist, cardsByStage[stage])
    }

    return <OutroModal cards={wishlist} />;
  }
}

export default Outro;
