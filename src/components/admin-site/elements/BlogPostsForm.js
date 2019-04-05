import React, {PureComponent} from 'react';
import {Form} from 'formik';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import 'medium-draft/lib/index.css';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import mediumDraftImporter from 'medium-draft/lib/importer';
import {Editor, createEditorState} from 'medium-draft';
import CustomImageSideButton from './BlogPosts/media/Images';
import {ErrorMessage} from 'formik';
import {convertToRaw} from 'draft-js';

import Title from './BlogPosts/Title';
import DateCategory from './BlogPosts/DateCategory';

class BlogPostsForm extends PureComponent {
  state = {
    editorState: createEditorState(
      convertToRaw(mediumDraftImporter(this.props.initialValues.body))
    ),
  };

  refsEditor = React.createRef();
  blockButtons = [
    {
      label: 'H2',
      style: 'header-two',
      icon: 'header',
      description: 'Heading 2',
    },
    {
      label: 'H3',
      style: 'header-three',
      icon: 'header',
      description: 'Heading 3',
    },
    {
      label: 'Q',
      style: 'blockquote',
      icon: 'quote-right',
      description: 'Blockquote',
    },
    {
      label: 'UL',
      style: 'unordered-list-item',
      icon: 'list-ul',
      description: 'Unordered List',
    },
  ];
  inlineButtons = [
    {
      label: 'B',
      style: 'BOLD',
      icon: 'bold',
      description: 'Bold',
    },
    {
      label: 'I',
      style: 'ITALIC',
      icon: 'italic',
      description: 'Italic',
    },
    {
      label: 'U',
      style: 'UNDERLINE',
      icon: 'underline',
      description: 'Underline',
    },
    {
      label: 'S',
      style: 'STRIKETHROUGH',
      icon: 'strikethrough',
      description: 'Strikethrough',
    },
    {
      label: '#',
      style: 'hyperlink',
      icon: 'link',
      description: 'Add a link',
    },
  ];
  sideButtons = [
    {
      title: 'Image',
      component: CustomImageSideButton,
    },
  ];

  onChange = editorState => {
    const {setFieldValue} = this.props;
    this.setState({editorState});
    setFieldValue('body', mediumDraftExporter(editorState.getCurrentContent()));
  };

  render() {
    const {
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      touched,
      values,
      classes,
      categories,
      breakpoint,
    } = this.props;
    const shared = {
      errors,
      touched,
      handleBlur,
      handleChange,
      values,
    };
    const {editorState} = this.state;

    return (
      <Form className="location-form" onSubmit={handleSubmit}>
        <DateCategory
          {...shared}
          categories={categories}
          breakpoint={breakpoint}
        />
        <Title {...shared} />
        <Editor
          ref={this.refsEditor}
          editorState={editorState}
          onChange={this.onChange}
          className={classes.editor}
          placeholder="Start writing here…"
          blockButtons={this.blockButtons}
          inlineButtons={this.inlineButtons}
          sideButtons={this.sideButtons}
        />
        <div className={'admin-login-form__input__error-wrapper m-bot-24'}>
          <ErrorMessage
            className="admin-login-form__error"
            component="div"
            name="body"
          />
        </div>
      </Form>
    );
  }
}

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
  initialValues: PropTypes.shape({
    body: PropTypes.string,
  }),
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
