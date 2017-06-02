import React, {Component} from 'react';
import MainLayout from '../components/layouts/Main'
import Logo from '../components/shared/Logo'
import FilterBox from '../components/filters/FilterBox'
import BusinessesView from 'components/businesses/Main';

class Businesses extends Component {
  constructor (props) {
    super(props);
    this.state = {
      businesses: [{
        id: 1,
        name: '1 Million Cups',
        services: [
          {id: 1, name: 'Education'},
          {id: 2, name: 'health & Childcare'},
          {id: 3, name: 'Not for Profit'}
        ],
        communities: [
          {id: 1, name: 'African American'},
          {id: 2, name: 'Asian'},
          {id: 3, name: 'Hispanic'},
          {id: 4, name: 'Immigrant'},
          {id: 5, name: 'LGBTQ'},
          {id: 6, name: 'Native American'},
          {id: 7, name: 'Other'},
        ]
      }]
    };
  }

  render () {
    return (
      <MainLayout>
        <section>
          <div>
            <Logo />
            <FilterBox />
          </div>
          <BusinessesView businesses={this.state.businesses}/>
        </section>
      </MainLayout>
    );
  }
}

export default Businesses;
