import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

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
    const {businesses} = this.props;
    return (
      <div
        className={
          'businessesContainer ' +
          (this.props.expanded ? '' : 'businessesContainerReduced')
        }
      >
        {this.props.topBar}
<<<<<<< HEAD
        <div className={'container-center--medium grid m-left-24 p-left-24'}>
          <div
            className={
              this.props.expanded ? (
                'col-md-8 col-xs-12 businessList p-left-0'
              ) : (
                'col-md-9 col-xs-12 businessList--reduced p-left-0'
              )
=======
        <div
          className={
            'container-center--medium grid m-left-24 p-left-24'
          }
        >
          <div
            className={
              this.props.expanded
                ? 'col-md-7 col-xs-12 businessList p-left-0'
                : 'col-md-9 col-xs-12 businessList--reduced p-left-0'
>>>>>>> CS-152 WIP
            }
          >
            {this.props.children}
          </div>
          <div
            className={
              'map ' +
<<<<<<< HEAD
              (this.props.expanded
                ? 'col-md-4 col-xs-12 p-0 '
                : 'col-md-3 col-xs-12')
            }
          >
            <div
              className={
                this.props.expanded ? (
                  'map-container-collapse'
                ) : (
                  'map-container-expand'
                )
              }
            >
              <MapView businesses={businesses} />
            </div>
            {this.props.expanded ? (
              this._renderReduceButton()
            ) : (
              this._renderExpandButton()
            )}
=======
                (this.props.expanded
                  ? 'col-md-5 col-xs-12 p-0 '
                  : 'col-md-3 col-xs-12')
            }
          >
            <div className={
                (this.props.expanded
                  ? 'map-container-collapse'
                  : 'map-container-expand')
                }
              >
              <MapView businesses={businesses} />
            </div>
            {this.props.expanded
              ? this._renderReduceButton()
              : this._renderExpandButton()}
>>>>>>> CS-152 WIP
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
