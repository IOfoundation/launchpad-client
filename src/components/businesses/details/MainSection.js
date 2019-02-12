import React from 'react';
import Detail from './Detail';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {containerStyles} from '../../../utils/containerStyles';

const styles = theme => ({
  content: {
    ...containerStyles(theme),
    margin: '40px auto',
  },
});

const MainSection = props => {
  const {organization, classes} = props;

  return (
    <section
      className={['business-details-section', classes.content].join(' ')}
    >
      <Grid container={true}>
        <Grid item={true} xs={12} md={8}>
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
        </Grid>
        <Grid item={true} xs={12} md={4}>
          <div className="business-details-section__logo">
            <div className="business-details-section__logo__container">
              <img
                className="business-details-section__logo__img"
                src={organization.logo_url || '/static-data/images/cs-logo.png'}
                style={
                  organization.logo_url ? null : {backgroundColor: 'black'}
                }
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

MainSection.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
  }),
  organization: PropTypes.shape({
    alternate_name: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    logo_url: PropTypes.string,
  }),
};

export default withStyles(styles)(MainSection);
