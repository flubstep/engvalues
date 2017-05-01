import React, { Component } from 'react';
import _ from 'lodash';

import Card from './Card';

import './ShufflingCardGrid.css';

/*
  Card objects should be:
  {
    key: UUID,
    text: string
    accepted: boolean
    rejected: boolean -- should have?
  }
*/

export default class ShufflingCardGrid extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      cardIndex: _.fromPairs(
        this.props.cards.map((c, index) => [c.key, index])
      )
    };
  }

  shuffle = () => {
    let n = this.props.cards.length;
    let newCards = this.props.cards.slice();
    for (let idx of _.range(n)) {
      let swapIdx = _.random(idx, n - 1);
      let [a, b] = [newCards[idx], newCards[swapIdx]];
      newCards[idx] = b;
      newCards[swapIdx] = a;
    }
    this.setState({
      cardIndex: _.fromPairs(
        newCards.map((c, index) => [c.key, index])
      )
    });
  }

  render() {
    const rowSize = Math.floor(this.props.width / this.props.itemWidth);

    const indexToXPos = index => {
      const col = index % rowSize;
      const padding = (col + 1) * this.props.padding;
      return (col * this.props.itemWidth) + padding;
    }
    const indexToYPos = index => {
      const row = Math.floor(index / rowSize);
      const padding = (row + 1) * this.props.padding;
      return (row * this.props.itemHeight) + padding;
    }
    const actualWidth = indexToXPos(rowSize - 1) + this.props.padding + this.props.itemWidth;

    return (
      <div
        style={{ width: actualWidth }}
        className="ShufflingCardGrid"
        onClick={this.shuffle}
        >
        {
          this.props.cards.map(card => {
            let index = this.state.cardIndex[card.key];
            return (
              <Card
                {...card}
                style={{
                  top: indexToYPos(index),
                  left: indexToXPos(index),
                  width: this.props.itemWidth,
                  height: this.props.itemHeight
                }}
              />
            );
          })
        }
      </div>
    );
  }
}

ShufflingCardGrid.defaultProps = {
  cards: [],
  padding: 10,
  itemWidth: 200,
  itemHeight: 240
};
