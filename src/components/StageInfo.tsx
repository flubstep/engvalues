import './StageInfo.css';
import { Component } from 'react';
import * as React from 'react';

export default class StageInfo extends Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  onAdvance = (e: any) => {
    e.stopPropagation();
    if (this.props.onAdvanceStage) {
      this.props.onAdvanceStage(this.props.stage);
    }
  }

  render() {
    const numSelected = this.props.cards.filter((c: any) => c.mark === this.props.stage).length;
    const needed = this.props.cardsNeeded[this.props.stage];

    return (
      <h1 className="instructions">
        <span style={{paddingRight: '10px'}} key={'Round_' + this.props.stage}>Round {this.props.stage} </span>
        Select the things you value the most:
          <span className="progress">
            <span className="number-selected" key={numSelected}>{numSelected}</span> / {needed}
          </span>
          { numSelected >= needed ? (
            <span
              onClick={this.onAdvance}
              style={{
                paddingLeft: '10px',
                cursor: 'pointer'
              }}>
              Advance
            </span>
            ) : null
          }
      </h1>
    );
  }
}
