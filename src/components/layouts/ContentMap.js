import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import MapView from '../map-view/Main';

class ContentMap extends Component {
  _renderReduceButton() {
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button
          className="btn-link btn-link-primary text-bold"
          onClick={this.props.reduceMap}
        >
          {'Reduce Map'}
        </button>
      </div>
    );
  }
  _renderExpandButton() {
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button
          className="btn-link btn-link-primary text-bold text-xs-margin"
          onClick={this.props.expandMap}
        >
          {'Expand Map'}
        </button>
        <button
          className="btn-link btn-link-primary underline text-xs-margin"
          onClick={this.props.expandMap}
        >
          {'Redo Search in Map Area'}
        </button>
      </div>
    );
  }
  render() {
    const {locations} = this.props;
    const {businessesMetadata} = this.props;
    return (
      <div
        className={
          'businessesContainer ' +
          (this.props.expanded ? '' : 'businessesContainerReduced')
        }
      >
        {this.props.topBar}
        <div className={
            businessesMetadata.totalOrganizations === '0'
              ? 'no-result-message-show'
              : 'no-result-message-hide'
          }>
          <MdSearch size="200" color="#95EAC3" />
          <p className="message">
            {'Sorry but nothing matched your search terms.'}
          </p>
          <p className="message">
            {'Please try Again with different Keywords'}
          </p>
        </div>
        <div className={
            businessesMetadata.totalOrganizations === '0' ?
              'result-container-hide'
            :
              'container-center--medium grid m-left-24 p-left-16'
            }
        >
          <div
            className={
              this.props.expanded
                ? 'col-md-8 col-xs-12 businessList p-left-0'
                : 'col-md-9 col-xs-12 businessList--reduced p-left-0'
            }
          >
            {this.props.children}
          </div>
          <div
            className={
              'map ' +
              (this.props.expanded
                ? 'col-md-4 col-xs-12 p-0 '
                : 'col-md-3 col-xs-12')
            }
          >
            <div
              className={
                this.props.expanded
                  ? 'map-container-collapse'
                  : 'map-container-expand'
              }
            >
              <MapView locations={locations} />
            </div>
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
  businessesMetadata: PropTypes.array,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  expandMap: PropTypes.func.isRequired,
  locations: PropTypes.array,
  reduceMap: PropTypes.func.isRequired,
  topBar: PropTypes.node,
  totalOrganizations: PropTypes.array,
};

export default ContentMap;
