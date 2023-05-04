import { Component } from 'react';

import './App.css';

import _ from 'lodash';
import { FaHeart } from 'react-icons/fa';
import { connect } from 'react-redux';

import Intro from './components/Intro';
import Outro from './components/Outro';
import ShufflingCardGrid from './components/ShufflingCardGrid';
import StageInfo from './components/StageInfo';
import cardsNeeded from './store/cardsNeeded';
import { HEARTS, MIN_SELECT } from './store/featureFlags';

const mapStateToProps = (state: any): any => {
  return {
    stage: state.stage,
    cards: state.cards,
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    onCardMark: (key: any, stage: any): any => {
      dispatch({
        type: "TOGGLE_CARD",
        stage: stage,
        key,
      });
    },
    onAdvanceStage: (stage: any): any => {
      dispatch({
        type: "ADVANCE_STAGE",
        stage,
      });
    },
    onCloseModal: (): any => {
      dispatch({
        type: "HIDE_MODAL",
      });
    },
  };
};

class AppBase extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
    const heartStyles = _.range(100).map(() => ({
      top: _.random(0, window.innerHeight),
      left: _.random(0, window.innerWidth),
      animation: `heart ${_.random(500, 1500)}ms ease-in-out`,
    }));
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      heartStyles,
    };
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  renderHearts() {
    if (HEARTS) {
      return (
        <div className="hearts-container">
          {this.state.heartStyles.map((style: any) => (
            <div className="heart" style={style}>
              <FaHeart size={24} fill="red" />
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const totalWidth = Math.min(this.state.windowWidth, 900);
    const cardWidth = 160;

    if (cardsNeeded(this.props.stage) >= MIN_SELECT) {
      return (
        <div className="App">
          {this.renderHearts()}
          <div className={"StageInfo"} style={{ position: "relative", opacity: 0 }} />
          <ShufflingCardGrid
            width={totalWidth}
            height={this.state.windowHeight}
            itemWidth={cardWidth}
            itemHeight={120}
            {...this.props}
          />
          <StageInfo {...this.props} />
          <Intro {...this.props} active={this.props.modal.active} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Outro {...this.props} />
        </div>
      );
    }
  }
}
const App = connect(mapStateToProps, mapDispatchToProps)(AppBase);
export default App;
