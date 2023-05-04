import * as React from 'react';

import './ModalCommon.css';

import { FaPlay } from 'react-icons/fa';

class Intro extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      active: props.active,
      transitionClass: "",
      showContinue: false,
    };
  }

  componentDidMount() {
    this.show();
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.state.active && !nextProps.active) {
      this.hide();
    }
  }

  show() {
    this.setState({
      showContinue: false,
      active: true,
    });
    setTimeout(
      () =>
        this.setState({
          showContinue: true,
        }),
      1000
    );
  }

  hide() {
    this.setState({
      transitionClass: "leaving",
    });
    setTimeout(() => {
      this.setState({
        transitionClass: "",
        showContinue: false,
        active: false,
      });
    }, 300);
  }

  render() {
    let { stage, ...otherProps } = this.props;
    if (!this.state.active) {
      return null;
    }
    let className = this.state.transitionClass;
    return (
      <div className={"modal-container " + className}>
        <div {...otherProps} className={"ModalCommon modal-inner"}>
          <div className={"ModalCommon--margin"}>
            <h1>Engineering Wishlist</h1>
            <p className="ModalCommon--content">
              Figuring out what you want in your career is hard. We’re inundated with opinions about
              what we should care about, what makes a good software engineer, how to progress in our
              careers, and what the hottest company of the year is. The reality is that there is no
              single right answer - I might care about leaving my impact on the world, you might
              care about learning more about robotics, my friend might care about having time to
              spend on interests outside of work - and in time, even that will change.
            </p>
            <p className="ModalCommon--content">
              What follows is an exercise for starting a conversation with yourself about what you
              value and what you’re looking for in the next step in your career. Take your time -
              you may find it helpful to talk to a friend while you’re doing this, or step away for
              an hour or two and come back to it. It’s as much about the journey as the destination.
            </p>
            <p className="ModalCommon--content">
              We'll start by showing you forty cards. In each round, you'll choose the half you care
              most about. When you finish, we'll list what you decided was most important.
            </p>
          </div>
          {this.state.showContinue ? (
            <div onClick={this.props.onCloseModal} className="ModalCommon--btn-continue btn">
              <FaPlay className="icon" /> Start
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

namespace Intro {
  export const defaultProps = {
    active: true,
  };
}

export default Intro;
