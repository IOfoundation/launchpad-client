import React from 'react';
import {Form} from 'formik';
import Editor from 'react-medium-editor';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import Title from './BlogPosts/Title';
import DateCategory from './BlogPosts/DateCategory';

const BlogPostsForm = props => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    classes,
  } = props;
  const shared = {
    errors,
    touched,
    handleBlur,
    handleChange,
    values,
  };

  return (
    <Form className="location-form" onSubmit={handleSubmit}>
      <DateCategory {...shared} />
      <Title {...shared} />
      <Editor
        text={values.body}
        onChange={handleChange}
        options={{
          style: [{prop: 'color', value: 'black'}],
          placeholder: {
            text: 'Start writing here…',
            hideOnClick: true,
          },
        }}
        className={classes.editor}
      />
    </Form>
  );
};

const styles = theme => {
  return {
    editor: {
      color: 'black',
      fontFamily: '"proxima-nova-regular", Georgia, sans-serif',
      '&:after': {
        color: '#7B7C7E',
        fontSize: '16px',
        lineHeight: '24px',
        fontStyle: 'normal',
      },
      '& b': {
        fontFamily: theme.fonts.bold,
      },
    },
  };
};

BlogPostsForm.propTypes = {
  classes: PropTypes.shape({
    editor: PropTypes.string,
  }),
  errors: PropTypes.shape({
    category: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  touched: PropTypes.shape({
    category: PropTypes.bool,
    title: PropTypes.bool,
    body: PropTypes.bool,
  }),
  values: PropTypes.shape({
    category: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default withStyles(styles)(BlogPostsForm);
