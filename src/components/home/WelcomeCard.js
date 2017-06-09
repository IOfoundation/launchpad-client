import React from 'react';
import {PropTypes} from 'prop-types';

class WelcomeCard extends React.Component {
  render() {
    return (
      <div className="welcomeCard">
        <div className="row end-xs">
          <button className="closeIcon">
            <img src="static-data/images/close.svg" />
          </button>
        </div>
        <div className="col-md-5 col-md-offset-4">
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
