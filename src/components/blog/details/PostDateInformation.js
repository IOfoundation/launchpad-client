import React, {Fragment} from 'react';
import {getDate} from '../../../utils';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = () => {
  return {
    postedBy: {
      fontSize: '12px',
      lineHeight: '16px',
    },
    tag: {
      borderBottom: '1px solid black',
      display: 'flex',
      fontSize: '16px',
      lineHeight: '24px',
      marginBottom: '30px',
      opacity: '0.87',
      paddingBottom: '30px',
      '& div': {
        marginRight: '12px',
        paddingRight: '12px',
        textDecoration: 'underline',
      },
    },
    title: {
      color: '#070709',
      fontSize: '34px',
      lineHeight: '40px',
      marginBottom: '24px',
      opacity: '0.87',
    },
    noBorder: {
      borderBottom: '0',
      marginBottom: '0',
      paddingBottom: '0',
    },
  };
};

const PostDateInformation = props => {
  const {classes, post, noBorder, router} = props;
  const date = getDate(post.posted_at);
  const name = post.organization && post.organization.name;
  const id = post.organization && post.organization.id;
  const nameClasses = [classes.tag];

  if (noBorder) {
    nameClasses.push(classes.noBorder);
  }

  return (
    <Fragment>
      <p className={[classes.postedBy, 'text-semi'].join(' ')}>
        {'Posted By:'}
      </p>
      <div className={nameClasses.join(' ')}>
        <div
          className="right-line right-line--text post-details__link"
          onClick={() => router.push(`/businesses/${id}`)}
        >
          {name}
        </div>
        <span>{`${date.monthLarge} ${date.day}, ${date.year}`}</span>
      </div>
    </Fragment>
  );
};

PostDateInformation.propTypes = {
  classes: PropTypes.shape({
    title: PropTypes.string,
    postedBy: PropTypes.string,
    tag: PropTypes.string,
    noBorder: PropTypes.string,
  }),
  noBorder: PropTypes.bool,
  post: PropTypes.shape({
    title: PropTypes.string,
    posted_at: PropTypes.string,
    organization: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withStyles(styles)(PostDateInformation);
