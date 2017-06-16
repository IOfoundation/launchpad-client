import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import MapView from '../map-view/Main';

class ContentMap extends Component {
  _renderReduceButton() {
    return (
      <button className="reduceMapBtn" onClick={this.props.reduceMap}>
        {'Reduce Map'}
      </button>
    );
  }
  _renderExpandButton() {
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button className="expandMapBtn" onClick={this.props.expandMap}>
          {'Expand Map'}
        </button>
        <div className="reducedMapBottom_checkContainer">
          <input className="reducedMapBottom_check" type="checkbox" />
          <label className="reducedMapeBottom_checklabel">
            {'Update when map moves'}
          </label>
        </div>
      </div>
    );
  }
  render() {
    const {businesses} = this.props;
    return (
      <div
        className={
          'businessesContainer ' +
            (this.props.expanded ? '' : 'businessesContainerReduced')
        }
      >
        {this.props.expanded ? null : this.props.topBar}
        <div
          className={
            'row ' + (this.props.expanded ? '' : 'businessesRow--reduced')
          }
        >
          <div
            className={
              this.props.expanded
                ? 'col-xs-5 businessList noPadding'
                : 'col-xs-8'
            }
          >
            {this.props.expanded ? this.props.topBar : null}
            {this.props.children}
          </div>
          <div
            className={
              'map ' +
                (this.props.expanded
                  ? 'col-xs-7 noPadding '
                  : 'col-xs-4 mapReduced')
            }
          >
            <MapView businesses={businesses} />
            {this.props.expanded
              ? this._renderReduceButton()
              : this._renderExpandButton()}
          </div>
        </div>
      </div>
    );
  }
}

ContentMap.propTypes = {
  businesses: PropTypes.array.isRequired,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  expandMap: PropTypes.func.isRequired,
  reduceMap: PropTypes.func.isRequired,
  topBar: PropTypes.node,
};

export default ContentMap;
