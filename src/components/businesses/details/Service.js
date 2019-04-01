import React, {PureComponent, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';
import NewColumn from './Service/NewColumn';
import Content from './Service/Content';
import RegularSchedules from './Service/RegularSchedules';
import Website from './Service/Website';
import {truncate} from '../../../utils';

class Service extends PureComponent {
  state = {
    viewMore: false,
  };

  viewMoreHandler = () => {
    this.setState({viewMore: true});
  };

  viewLessHandler = () => {
    this.setState({viewMore: false});
  };

  render() {
    const {
      name,
      description,
      email,
      website,
      phone,
      audience,
      eligibility,
      fees,
      accepted_payments,
      regular_schedules,
      service_areas,
      application_process,
      required_documents,
      interpretation_services,
      languages,
      wait_time,
    } = this.props.service;
    const {viewMore} = this.state;
    let $extraInformation = null;

    if (viewMore) {
      $extraInformation = (
        <Fragment>
          <Grid container={true} className="service--margin-bottom ">
            <NewColumn title="Service Email" content={email} />
            <NewColumn
              title="Service Phone"
              content={phone && phone[0].number}
            />
            <Website website={website} />
          </Grid>
          <Content title="Audience" content={audience} />
          <Content title="Eligibility" content={eligibility} />
          <Content title="Fees" content={fees} />
          <Content
            title="Acccepted Payment Types"
            content={accepted_payments.join(', ')}
          />
          <RegularSchedules schedules={regular_schedules} />
          <Content title="Services Areas" content={service_areas.join(', ')} />
          <Content title="Application Proccess" content={application_process} />
          <Content
            title="Documents Required to Receive This Service"
            content={required_documents.join(', ')}
          />
          <Content
            title="Interpretation Services"
            content={interpretation_services}
          />
          <Content
            title="Languages This Service is Provided In"
            content={languages.join(', ')}
          />
          <Content title="Wait Time" content={wait_time} />
          <button
            className="service__view-less text-semi"
            onClick={this.viewLessHandler}
          >
            {'View Less'}
          </button>
        </Fragment>
      );
    }

    return (
      <div className="service">
        <h3 className="service__title text-bold">{name}</h3>
        <p className="service__content">
          {viewMore ? description : truncate(description)}
          {viewMore ? null : (
            <a
              className="service__view-more text-semi"
              onClick={this.viewMoreHandler}
            >
              {'View More'}
            </a>
          )}
        </p>
        {$extraInformation}
      </div>
    );
  }
}

Service.propTypes = {
  service: PropTypes.shape({
    accepted_payments: PropTypes.arrayOf(PropTypes.string),
    application_process: PropTypes.string,
    audience: PropTypes.string,
    description: PropTypes.string,
    eligibility: PropTypes.string,
    email: PropTypes.string,
    fees: PropTypes.string,
    regular_schedules: PropTypes.array,
    required_documents: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number,
    interpretation_services: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    phone: PropTypes.arrayOf({
      number: PropTypes.string,
    }),
    service_areas: PropTypes.arrayOf(PropTypes.string),
    wait_time: PropTypes.string,
    website: PropTypes.string,
  }),
};

export default Service;
