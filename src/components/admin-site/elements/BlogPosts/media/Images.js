import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {Block, addNewBlock} from 'medium-draft';
import 'isomorphic-fetch';

class CustomImageSideButton extends PureComponent {
  static propTypes = {
    close: PropTypes.func,
    getEditorState: PropTypes.func,
    setEditorState: PropTypes.func,
  };

  onClick = () => {
    this.input.value = null;
    this.input.click();
  };

  onChange = e => {
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      const src = URL.createObjectURL(file);
      this.props.setEditorState(
        addNewBlock(this.props.getEditorState(), Block.IMAGE, {
          src,
        })
      );
    }
    this.props.close();
  };

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        onClick={this.onClick}
        title="Add an Image"
      >
        <i className="material-icons">{'photo_camera'}</i>
        <input
          type="file"
          accept="image/*"
          ref={c => {
            this.input = c;
          }}
          onChange={this.onChange}
          style={{display: 'none'}}
        />
      </button>
    );
  }
}

export default CustomImageSideButton;