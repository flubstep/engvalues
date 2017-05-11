import './StageInfo.css';
import { Component } from 'react';
import * as React from 'react';

class StageInfo extends Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      showContinue: false
    };
  }

  numSelected(cards: any) {
    return cards.filter((c: any) => c.mark === this.props.stage).length;
  }

  numNeeded(cardsNeeded: any) {
    return cardsNeeded[this.props.stage];
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.state.showContinue) {
      if (this.props.stage !== nextProps.stage) {
        this.setState({
          showContinue: false
        });
      }
    } else {
      const numSelected = this.numSelected(nextProps.cards);
      const needed = this.numNeeded(nextProps.cardsNeeded);
      if (numSelected >= needed) {
        this.setState({
          showContinue: true
        });
      }
    }
  }

  onAdvance = (e: any) => {
    e.stopPropagation();
    if (this.props.onAdvanceStage) {
      this.props.onAdvanceStage(this.props.stage);
    }
  }

  render() {
    const numSelected = this.numSelected(this.props.cards);
    const needed = this.numNeeded(this.props.cardsNeeded);
    const canAdvance = numSelected === needed;
    const tooMany = numSelected > needed;
    return (
      <div className={'StageInfo ' + this.props.className}>
        <h2 className="StageInfo--stage">Round {this.props.stage}</h2>
        { this.state.showContinue ? (
          <div
            className={'btn StageInfo--btn-continue' + (canAdvance ? '' : ' disabled')}
            onClick={this.onAdvance}
            >
            Continue
          </div>
        ) : (
          <h1 className="StageInfo--instructions">Select <b>{needed}</b> cards to continue</h1>
        )}
        <h2 className="StageInfo--progress">
          <span
            className={'number-selected' + (tooMany ? ' over' : '')}
            key={numSelected}
            >{numSelected}
           </span> / {needed}
        </h2>
      </div>
    );
  }
}

namespace StageInfo {
  export const defaultProps = {
    className: ''
  };
}

export default StageInfo;
