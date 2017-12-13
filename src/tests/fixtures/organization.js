export default {
  id: 1,
  name: 'organization1',
  description: 'orgDescription',
  email: 'jondoe@something.org',
  contacts: [
    {
      email: 'jondoe@test.org',
      id: 1,
      name: 'Jon Doe',
      phones: [
        {
          number: '(530) 795-1520',
        },
      ],
    },
  ],
  phones: [
    {
      id: 1,
      number: '(123) 456 - 7890',
    },
  ],
  locations: [
    {
      id: 1,
      name: 'location1',
      address: {
        address_1: '123 Road St',
        address_2: null,
        city: 'Sacramento',
        state_province: 'CA',
        postal_code: '12345',
      },
      phones: [
        {
          id: 2,
          number: '(123) 456 - 7890',
        },
      ],
    },
    {
      id: 2,
      name: 'location2',
      address: {
        address_1: '456 Street Rd',
        address_2: null,
        city: 'Sacramento',
        state_province: 'CA',
        postal_code: '12345',
      },
      phones: [
        {
          id: 3,
          number: '(123) 456 - 7890',
        },
      ],
    },
  ],
  services: [
    {
      id: 1,
      name: 'service1',
      description: 'lorem ipsum...',
      email: null,
      phones: [],
      categories: [
        {
          id: 54,
          name: 'category1',
        },
        {
          id: 55,
          name: 'category2',
        },
        {
          id: 56,
          name: 'category3',
        },
      ],
    },
    {
      id: 2,
      name: 'service2',
      description: 'lorem ipsum...',
      email: null,
      phones: [],
      categories: [
        {
          id: 54,
          name: 'category1',
        },
      ],
    },
  ],
};
