export const overview = [
  {
    title: 'Overview',
    controls: [
      {
        key: 'isMainLocation',
        label: 'Check if this is the main location',
        type: 'checkbox',
      },
      {
        key: 'locationName',
        label: 'Location Name',
        autocomplete: 'off',
      },
      {
        key: 'alternateName',
        label: 'Alternate Name',
        autocomplete: 'off',
        helperText: 'This is how the name will appear to other users.',
      },
      {
        key: 'locationDescription',
        label: 'Description',
        autocomplete: 'off',
        multiline: true,
        helperText: "A description of the location's services.",
      },
    ],
  },
  {
    title: 'Details',
    controls: [
      {
        key: 'locationEmail',
        label: 'General Contact Email',
        autocomplete: 'off',
        helperText: "The location's general email.",
      },
      {
        key: 'locationWebsite',
        label: 'Location Website',
        autocomplete: 'off',
      },
    ],
  },
];
