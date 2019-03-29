import React, {Fragment, PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {ErrorMessage} from 'formik';
import TextareaAutosize from 'react-autosize-textarea';

const styles = theme => ({
  textarea: {
    width: '100%',
    border: 0,
    borderBottom: '1px solid #E9EAEB',
    outline: 0,
    background: 'none',
    resize: 'none',
    fontSize: '34px',
    lineHeight: '40px !important',
    fontFamily: theme.fonts.bold,
    padding: '0 0 16px',
    '&::placeholder': {
      color: '#8E8F92',
    },
  },
});

class TitleField extends PureComponent {
  changeHandler = (name, event) => {
    const {handleChange, errors, handleBlur} = this.props;

    event.persist();
    handleChange(event);
    if (errors[name]) {
      handleBlur(event);
    }
  };

  render() {
    const {classes, id, marginBottom, value} = this.props;

    return (
      <Fragment>
        <TextareaAutosize
          className={classes.textarea}
          placeholder="Add a Title..."
          id={id}
          value={value}
          onChange={event => this.changeHandler(id, event)}
        />
        <div
          className={[
            'admin-login-form__input__error-wrapper',
            marginBottom ? 'm-bot-24' : '',
          ].join(' ')}
        >
          <ErrorMessage
            className="admin-login-form__error"
            component="div"
            name={id}
          />
        </div>
      </Fragment>
    );
  }
}

TitleField.propTypes = {
  autocomplete: PropTypes.string,
  classes: PropTypes.shape({
    cssLabel: PropTypes.string,
    cssOutlinedInput: PropTypes.string,
    cssDisabled: PropTypes.string,
    cssFocused: PropTypes.string,
    cssFormControl: PropTypes.string,
    cssError: PropTypes.string,
  }),
  error: PropTypes.bool,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
  marginBottom: PropTypes.bool,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default withStyles(styles)(TitleField);
