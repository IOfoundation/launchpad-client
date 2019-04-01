import React from 'react';
import {Form} from 'formik';
import Editor from 'react-medium-editor';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import Title from './BlogPosts/Title';
import DateCategory from './BlogPosts/DateCategory';

const BlogPostsForm = props => {
  const {
    breakpoint,
    categories,
    classes,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    values,
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
      <DateCategory
        {...shared}
        categories={categories}
        breakpoint={breakpoint}
      />
      <Title {...shared} />
      <Editor
        text={values.body}
        onChange={value => setFieldValue('body', value)}
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
  breakpoint: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
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
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  setFieldValue: PropTypes.func,
  touched: PropTypes.shape({
    category: PropTypes.bool,
    title: PropTypes.bool,
    body: PropTypes.bool,
  }),
  values: PropTypes.shape({
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default withStyles(styles)(BlogPostsForm);
