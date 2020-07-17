import React from 'react';
import _ from 'lodash';

import {classNames, Link, withPrefix} from '../utils';

export default class Navigation extends React.Component {
    render() {
        return (
            (_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) || _.get(this.props, 'pageContext.site.siteMetadata.header.has_social', null)) && (<React.Fragment>
            <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
              <div className="site-nav-wrap">
                <div className="site-nav-inside">
                  {_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) && (
                  <ul className="menu">
                    {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.nav_links', null), (action, action_idx) => (
                    <li key={action_idx} className={classNames('menu-item', {'current-menu-item': _.get(this.props, 'pageContext.url', null) === _.get(action, 'url', null)})}>
                      <Link to={withPrefix(_.get(action, 'url', null))}{...(_.get(action, 'new_window', null) ? ({target: '_blank', rel: 'noopener'}) : null)}>{_.get(action, 'label', null)}</Link>
                    </li>
                    ))}
                  </ul>
                  )}
                  {_.get(this.props, 'pageContext.site.siteMetadata.header.has_social', null) && (
                  <div className="social-links">
                    {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.social_links', null), (action, action_idx) => (
                    action && (
                    <Link key={action_idx} className={classNames({'button-circle': _.get(action, 'style', null) === 'icon'})} to={withPrefix(_.get(action, 'url', null))}{...(_.get(action, 'new_window', null) ? ({target: '_blank', rel: 'noopener'}) : null)}>
                      {((_.get(action, 'style', null) === 'icon') && _.get(action, 'icon_class', null)) ? (<React.Fragment>
                      <span className={'fab ' + _.get(action, 'icon_class', null)} aria-hidden="true"/><span className="screen-reader-text">{_.get(action, 'label', null)}</span>
                      </React.Fragment>) : 
                      _.get(action, 'label', null)
                      }
                    </Link>
                    )
                    ))}
                  </div>
                  )}
                </div>
              </div>
            </nav>
            <button id="menu-toggle" className="menu-toggle"><span className="screen-reader-text">Menu</span><span className="icon-menu" aria-hidden="true" /></button>
            </React.Fragment>)
        );
    }
}
