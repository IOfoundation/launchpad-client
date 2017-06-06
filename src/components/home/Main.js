import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';

import MainLayout from '../layouts/Main';
import ServicesBox from '../services/ServicesBox';

const Main = ({services}) => {
  return (
    <div>
      <section>
        <form className="" action="" method="post">
          <input type="text" name="" value="" placeholder="Find..." />
          <input type="submit" value="SEARCH" />
        </form>
        <Link to="/businesses">{'View All Resources'}</Link>
      </section>
      <section>
        <h2>Browse By Service</h2>
        <ServicesBox services={services} />
      </section>
    </div>
  );
};

Main.propTypes = {
  services: PropTypes.array,
};

export default Main;
