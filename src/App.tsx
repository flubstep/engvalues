import { Component } from 'react';
import * as React from 'react';
import { HEARTS } from './store/featureFlags';

// require avoids TS "Could not find a declaration file" errors.
// Update once DefinitelyTyped includes react-redux 5.0.4
const _ = require('lodash');
const { connect } = require('react-redux');
const FaHeart = require('react-icons/lib/fa/heart');

import InstructionsModal from './components/InstructionsModal';
import ShufflingCardGrid from './components/ShufflingCardGrid';
import StageInfo from './components/StageInfo';
import CardReview from './components/CardReview';

import './App.css';

const mapStateToProps = (state: any) : any => {
  return {
    stage: state.stage,
    cards: state.cards,
    modal: state.modal
  };
};

const mapDispatchToProps = (dispatch: any) : any => {
  return {
    onCardMark: (key: any, stage: any) : any => {
      dispatch({
        type: 'TOGGLE_CARD',
        stage: stage,
        key
      });
    },
    onAdvanceStage: (stage: any) : any => {
      dispatch({
        type: 'ADVANCE_STAGE',
        stage
      });
    },
    onCloseModal: () : any => {
      dispatch({
        type: 'HIDE_MODAL'
      });
    }
  };
};

class App extends Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    const heartStyles = _.range(100).map(() => (
      {
        top: _.random(0, window.innerHeight),
        left:  _.random(0, window.innerWidth),
        animation: `heart ${_.random(500, 1500)}ms ease-in-out`
      }
    ));
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      heartStyles
    };
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  renderHearts() {
    if (HEARTS) {
      return (
        <div className="hearts-container">
          {
            this.state.heartStyles.map((style: any) => (
              <div className="heart" style={style}>
                <FaHeart size={24} fill="red" />
              </div>
            ))
          }
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const totalWidth = Math.min(this.state.windowWidth, 900);
    const cardWidth = 160;

    if (this.props.stage <= 5) {
      return (
        <div className="App">
          {this.renderHearts()}
          <StageInfo {...this.props} className="fake" />
          <ShufflingCardGrid
            width={totalWidth}
            height={this.state.windowHeight}
            itemWidth={cardWidth}
            itemHeight={120}
            {...this.props}
          />
          <StageInfo {...this.props} />
          <InstructionsModal
            {...this.props}
            active={this.props.modal.active}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <CardReview {...this.props} />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
