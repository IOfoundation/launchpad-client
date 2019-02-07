import React from 'react';
import Detail from './Detail';
import {PropTypes} from 'prop-types';

const MainSection = props => {
  const {organization} = props;

  return (
    <section className="business-details-section contentContainer">
      <div className="business-details-section__information">
        <h2 className="business-details-section__information__title text-semi">
          {organization.name || organization.alternate_name}
        </h2>
        <p className="business-details-section__information__content">
          {organization.description}
        </p>
        <div className="business-details-section__information__data">
          <Detail title="Date of Incorporation" content="March 1, 2013" />
          <Detail
            title="Accreditations"
            content="Parturient Fusce Ultricies Risus Vulputate"
          />
          <Detail title="Licenses" content="Purus Tellus Cras Ipsum" />
          <Detail title="Legal Status" content="Non-Profit" />
        </div>
      </div>
      <div className="business-details-section__logo">
        <div className="business-details-section__logo__container">
          <img
            className="business-details-section__logo__img"
            src={organization.logo_url || '/static-data/images/cs-logo.png'}
            style={organization.logo_url ? null : {backgroundColor: 'black'}}
          />
        </div>
      </div>
    </section>
  );
};

MainSection.propTypes = {
  organization: PropTypes.shape({
    alternate_name: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    logo_url: PropTypes.string,
  }),
};

export default MainSection;
