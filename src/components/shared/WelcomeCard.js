import React from 'react';

class WelcomeCard extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }
  _handleClose() {
    this.setState({show: false});
  }
  render() {
    if (!this.state.show) {
      return null;
    }
    return (
      <div className="welcomeCard">
        <div className="row end-xs">
          <button className="closeIcon" onClick={() => this._handleClose()}>
            <img src="static-data/images/close.svg" />
          </button>
        </div>
        <div className="col-lg-5 col-lg-offset-3 col-sm-7 col-sm-offset-3">
          <h1 className="welcomeCard_title">
            {'Welcome to Startup Navigator'}
          </h1>
          <p className="welcomeCard_text opacity75">
            {
              'Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
            }
          </p>
          <p className="welcomeCard_text">
            {
              'Need more help? Call our hotline, 816.235.6500 or send us an email at info@kcsourcelink.com.'
            }
          </p>
        </div>
      </div>
    );
  }
}

WelcomeCard.propTypes = {};

export default WelcomeCard;
