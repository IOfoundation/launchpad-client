import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {PropTypes} from 'prop-types';

export const FILE_SIZE = 3000 * 1024;
export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
];
class CustomImageInput extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  state = {
    file: null,
    imagePreviewUrl: null,
  };

  showFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.current.click();
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.onloadend = () => {
        this.setState({
          file,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
      this.props.setFieldValue(this.props.field.name, file);
    }
  }

  showPreloadImage() {
    const {title, classes, errorMessage, logo} = this.props;
    const {file, imagePreviewUrl} = this.state;

    let comp = (
      <button
        className={`btn btn__black ${classes.btn}`}
        onClick={this.showFileUpload}
        type="button"
      >
        {title}
      </button>
    );

    if (!file && logo && !errorMessage) {
      comp = <img src={logo} alt="..." onClick={this.showFileUpload} />;
    } else {
      comp = (
        <img src={imagePreviewUrl} alt="..." onClick={this.showFileUpload} />
      );
    }

    return comp;
  }

  render() {
    const {errorMessage, classes} = this.props;
    const {name} = this.props.field;

    return (
      <Fragment>
        <input
          className={classes.hidden}
          id={name}
          name={name}
          type="file"
          onChange={this.handleImageChange}
          ref={this.fileUpload}
        />
        {this.showPreloadImage()}
        <div className={classes.errorWrapper}>
          {errorMessage ? (
            <Typography variant="caption" color="error" align="center">
              {errorMessage}
            </Typography>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

const styles = () => ({
  hidden: {display: 'none'},
  errorWrapper: {
    minHeight: '20px',
  },
  btn: {
    marginTop: '20px',
  },
});

CustomImageInput.propTypes = {
  classes: PropTypes.shape({
    hidden: PropTypes.string,
    errorWrapper: PropTypes.string,
    btn: PropTypes.string,
  }),
  errorMessage: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  logo: PropTypes.string,
  setFieldValue: PropTypes.func,
  title: PropTypes.string,
};

export default withStyles(styles)(CustomImageInput);
