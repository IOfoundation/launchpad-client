import React, {Component} from 'react';

export default class MapOrgModal extends Component {
  render() {
    //const {$hover, selected, organization} = this.props;

    return (
      <div id="orgModal" className="map_modal">
        <div className="row between-xs top-xs map_modal_top">
          <a className="close-map-org" onClick={() => this._closeOrgInfo()}>
            <ClearIcon
              size={15}
              style={{color: '#000000', verticalAlign: 'middle'}}
            />
          </a>
          <img
            className="map_modal_logo"
            src="../static-data/images/orgs-placeholder.png"
          />
          <h1 className="map_modal_title">{organization.name}</h1>
        </div>
        <hr />
        <section className="row between-xs map_modal_social business_block--expanded_bottom">
          <div>
            {organization.facebook && (
              <a href={organization.facebook} target="_blank">
                <FacebookIcon className={'icon-svg'} size={18} />
              </a>
            )}
            {organization.twitter && (
              <a href={organization.twitter} target="_blank">
                <TwitterIcon className={'icon-svg'} size={18} />
              </a>
            )}
            {organization.linkedin && (
              <a href={organization.linkedin} target="_blank">
                <LinkedinIcon className={'icon-svg'} size={18} />
              </a>
            )}
          </div>
          <a
            className="website-link bold"
            href={organization.website}
            target="_blank"
          >
            {'WEBSITE'}
            <ArrowRight size={20} style={{verticalAlign: 'middle'}} />
          </a>
        </section>
      </div>
    );
  }
}
