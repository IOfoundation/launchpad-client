import React from 'react';
import NewColumn from './NewColumn';
import {PropTypes} from 'prop-types';
import {getUrlInformationFromString} from '../../../../utils';

const Website = props => {
  const {website} = props;
  const url = getUrlInformationFromString(website);
  let $website = null;

  if (website) {
    $website = (
      <NewColumn title="Service Website">
        <a
          className="service-column__link"
          href={website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url.hostname}
        </a>
      </NewColumn>
    );
  }

  return $website;
};

Website.propTypes = {
  website: PropTypes.string,
};

export default Website;
