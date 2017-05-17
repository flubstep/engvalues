import * as React from 'react';
const _ = require('lodash');

import Card from './Card';
import './CardReview.css';

class CardRow extends React.Component<any,any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({ visible: true }),
      this.props.delay
    );
  }

  render() {
    let cardWidth = (720 / this.props.cards.length) - 10;
    let extraClass = this.state.visible ? ' visible' : '';
    return (
      <div className={'CardRow' + extraClass}>
        {this.props.cards.map((card: any) => (
          <Card style={{
            height: 140,
            width: cardWidth,
            position: 'relative'
          }} {...card} />
        ))}
      </div>
    );
  }
};

class CardReview extends React.Component<any,any> {

  render() {
    let stages = [1, 2, 3, 4, 5];
    let cardsByStage = _.fromPairs(stages.map(stage => [stage, []]));
    for (let card of this.props.cards) {
      let stage = card.mark;
      cardsByStage[stage] = cardsByStage[stage] || [];
      cardsByStage[stage].push(card);
    }
    return (
      <div className="CardReview">
        <CardRow cards={cardsByStage[5]} delay={3000} />
        <CardRow cards={cardsByStage[4]} delay={2000} />
        <CardRow cards={cardsByStage[3]} delay={1000} />
        <CardRow cards={cardsByStage[2]} delay={0} />
      </div>
    );
  }
}

export default CardReview;
