import React from 'react';
import Service from './Service';

const ServicesOffered = () => {
  return (
    <div className="services-offered">
      <h2 className="services-offered__title text-semi">
        {'Services Offered'}
      </h2>
      <Service
        title="Office of Small Business and Entrepreneurship"
        content="The Office of Small Business and Entrepreneurship provides information
        and assistance to small businesses and entrepreneurs to help them
        succeed in the California marketplace. The Office provides direct
        assistance to businesses seeking to get started or needing help to grow,
        seeking assistance with state procurement or simply to get connected to
        resource partners"
      />
      <Service
        title="Business Investment Services"
        content="The California Business Investment Services (CalBIS) Unit provides
        no-fee, tailored site selection services to employers, corporate real
        estate executives, and site location consultants who are considering
        California for relocation and/or expansion. Our staff is available to
        help identify the advantages of considering California locations for
        business relocation and expansion."
        extra={{label: 'Email', content: 'Austin.Greiner@gov.ca.gov'}}
      />
      <Service
        title="Permit Assistance"
        content="The Permit Assistance Unit offers comprehensive permit and regulatory
        compliance assistance to all businesses in California by serving as the
        central source of permit guidance. Knowledgeable staff helps new
        business owners identify the permits needed to start a new business or
        expand an existing one. To help streamline the permitting process,
        Permit Specialists may schedule pre-application"
      />
    </div>
  );
};

export default ServicesOffered;
