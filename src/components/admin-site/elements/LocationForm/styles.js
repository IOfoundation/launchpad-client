import {PropTypes} from 'prop-types';

export const sharedStyles = () => {
  return {
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    halfs: {
      width: 'calc(50% - 12px)',
      marginRight: '12px',
      '&:nth-child(even)': {
        marginLeft: '12px',
        marginRight: '0',
      },
    },
    thirds: {
      width: 'calc(33.3% - 12px)',
      margin: '0 12px',
      '&:nth-child(3n + 3)': {
        marginRight: '0',
      },
      '&:first-child': {
        marginLeft: '0',
      },
    },
    quarters: {
      width: 'calc(25% - 12px)',
      margin: '0 12px',
      '&:nth-child(4n + 4)': {
        marginLeft: '12px',
        marginRight: '0',
      },
      '&:first-child': {
        marginLeft: '0',
      },
    },
    octaves: {
      width: 'calc(12.5% - 12px)',
      margin: '0 12px',
      '&:nth-child(8n + 8)': {
        marginLeft: '12px',
        marginRight: '0',
      },
      '&:first-child': {
        marginLeft: '0',
      },
    },
    width70: {
      width: '70%',
      marginRight: '30%',
    },
    streetAddressInput: {
      width: '78.5%',
      marginRight: '21.5%',
    },
    title: {
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      color: '#070709',
      fontSize: '16px',
      lineHeight: '24px',
    },
    card: {
      border: '1px solid black',
      marginBottom: '40px',
    },
    cardTitle: {
      color: 'white',
      background: 'black',
      padding: '8px 12px',
      '&__media': {
        fontSize: '16px',
        lineHeight: '24px',
        marginRight: '8px',
      },
      '&__small': {
        fontFamily: '"proxima-nova-thin", Georgia, sans-serif',
        fontSize: '12px',
        lineHeight: '16px',
        opacity: '0.75',
      },
    },
    cardContent: {
      padding: '16px',
      background: 'white',
    },
    formControl: {
      width: '220px',
    },
    hideSelect: {
      height: '40px',
      position: 'relative',
    },
    floating: {
      left: 0,
      margin: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    front: {
      zIndex: '2',
    },
    back: {
      zIndex: '1',
    },
    serviceSelected: {
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      '& span': {
        marginRight: '8px',
      },
    },
    phoneItemWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    phoneItem: {
      width: 'calc(45% - 24px)',
      marginRight: '24px',
    },
    btnWrapper: {
      width: '100%',
    },
    btn: {
      width: '260px',
      margin: '15px 0',
    },
    bottomLine: {
      borderBottom: '1px solid #E0E0E0',
    },
  };
};

export const sharedClasses = PropTypes.shape({
  back: PropTypes.string,
  bottomLine: PropTypes.string,
  btn: PropTypes.string,
  btnWrapper: PropTypes.string,
  card: PropTypes.string,
  cardContent: PropTypes.string,
  cardTitle: PropTypes.string,
  floating: PropTypes.string,
  formControl: PropTypes.string,
  front: PropTypes.string,
  halfs: PropTypes.string,
  hideSelect: PropTypes.string,
  phoneItem: PropTypes.string,
  phoneItemWrapper: PropTypes.string,
  quarters: PropTypes.string,
  serviceSelected: PropTypes.string,
  streetAddressInput: PropTypes.string,
  thirds: PropTypes.string,
  title: PropTypes.string,
  width70: PropTypes.string,
  wrapper: PropTypes.string,
});
