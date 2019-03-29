import React from 'react';
import {Form} from 'formik';
import Editor from 'react-medium-editor';
import {withStyles} from '@material-ui/core/styles';

import Title from './BlogPosts/Title';
import DateCategory from './BlogPosts/DateCategory';

const BlogPostsForm = props => {
  const {
    breakpoint,
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

const styles = () => {
  return {
    editor: {
      color: 'black',
      fontFamily: '"proxima-nova-regular", Georgia, sans-serif',
      '&:after': {
        color: '#7B7C7E',
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
  };
};

export default withStyles(styles)(BlogPostsForm);
