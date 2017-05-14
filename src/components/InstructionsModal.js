import * as React from 'react';
import InstructionsStore from '../store/instructions.json';
import FaPlay from 'react-icons/lib/fa/play';

import './InstructionsModal.css';

class InstructionsModal extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      active: props.active,
      transitionClass: '',
      showContinue: false
    };
  }

  componentDidMount() {
    this.show();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.active && nextProps.active) {
      let instructions = InstructionsStore[nextProps.stage];
      if (instructions) {
        this.show();
      } else {
        nextProps.onCloseModal();
      }
    }
    else if (this.state.active && !nextProps.active) {
      this.hide();
    }
  }

  show() {
    this.setState({
      showContinue: false,
      active: true,
    });
    setTimeout(() => this.setState({
      showContinue: true
    }), 1000);
  }

  hide() {
    this.setState({
      transitionClass: 'leaving'
    });
    setTimeout(() => {
      this.setState({
        transitionClass: '',
        showContinue: false,
        active: false
      });
    }, 300);
  }

  render() {
    let { stage, ...otherProps } = this.props;
    let instructions = InstructionsStore[stage];
    if (!this.state.active || !instructions) {
      return null;
    }
    let className = this.state.transitionClass;
    return (
      <div className={'modal-container ' + className}>
        <div
          {...otherProps}
          className={'InstructionsModal modal-inner'}
          >
          {instructions}
          {
            this.state.showContinue ? (
              <div onClick={this.props.onCloseModal} className="InstructionsModal--btn-continue btn">
                <FaPlay className="icon" /> Continue
              </div>
            ) : null
          }
        </div>
      </div>
    );
  };
}

InstructionsModal.defaultProps = {
  active: true
};

export default InstructionsModal;
