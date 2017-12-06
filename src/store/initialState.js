const initialState = {
  businesses: {
    locations: [],
    organizations: [],
    items: [],
    metadata: {
      pagination: {
        last: {
          page: null,
          per_page: null,
        },
        next: null,
      },
    },
    filters: {
      businessServices: [],
      communities: [],
      stages: [],
      businessTypes: [],
      industries: [],
    },
    displayOptions: {
      showBusinessTypes: true,
      locationToggleSwitch: false,
    },
    appliedFilters: {},
    mapProps: {
      bounds: {},
      mapMarginBounds: {},
      centerCoordinates: {lat: 38.57, lng: -121.47},
      zoom: 7,
      mapInstance: null,
      expanded: false,
    },
  },
};

export default initialState;
