import * as React from 'react';
const _ = require('lodash');

import './CardReview.css';
import './ModalCommon.css'
import { NUM_WISHLIST_CARDS } from '../store/featureFlags';


class OutroModal extends React.Component<any,any> {

  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      transitionClass: '',
    };
  }

  render() {
    let { cardGroups, ...otherProps } = this.props;
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

            {cardGroups.map((group: any) => (
                <ul className="ModalCommon--content">
                {group.map((card: any) => (
                  <li> {card.text} </li>
                ))}
                </ul>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

class Outro extends React.Component<any,any> {

  render() {
    let cardsByStage = {};
    for (let card of this.props.cards) {
      let stage = card.mark;
      if (!(stage in cardsByStage)) {
        cardsByStage[stage] = []
      }
      cardsByStage[stage].push(card);
    }
    let wishlist: any = []
    let wishlistLength = 0

    const stages = Object.keys(cardsByStage).map((val) => Number(val)).sort().reverse()
    for (let stage of stages) {
      if (wishlistLength >= NUM_WISHLIST_CARDS) {
        break
      }
      wishlist.push(cardsByStage[stage])
      wishlistLength += cardsByStage[stage].length
    }

    return <OutroModal cardGroups={wishlist} />;
  }
}

export default Outro;
