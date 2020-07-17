import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import Header from '../components/Header';
import {getPages, Link, withPrefix} from '../utils';
import Footer from '../components/Footer';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Home extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
              <Header {...this.props} site={this.props.pageContext.site} page={this.props.pageContext} image={_.get(this.props, 'pageContext.site.siteMetadata.header.background_img', null)} />
              <div id="content" className="site-content">
                <main id="main" className="site-main inner">
                  <div className="post-feed">
                    {_.map(display_posts, (post, post_idx) => (
                    <article key={post_idx} className="post">
                      <header className="post-header">
                        <h2 className="post-title"><Link to={withPrefix(_.get(post, 'url', null))} rel="bookmark">{_.get(post, 'frontmatter.title', null)}</Link></h2>
                        <div className="post-meta">
                          Published on <time className="published"
                            dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                        </div>
                      </header>
                      {_.get(post, 'frontmatter.thumb_img_path', null) && (
                      <Link className="post-thumbnail" to={withPrefix(_.get(post, 'url', null))}>
                        <img className="thumbnail" src={withPrefix(_.get(post, 'frontmatter.thumb_img_path', null))} alt={_.get(post, 'frontmatter.title', null)} />
                      </Link>
                      )}
                      <div className="post-content">
                        <p>{_.get(post, 'frontmatter.excerpt', null)}</p>
                      </div>
                      <p className="read-more">
                        <Link className="read-more-link" to={withPrefix(_.get(post, 'url', null))}>Keep reading <span className="icon-arrow-right" aria-hidden="true" /></Link>
                      </p>
                    </article>
                    ))}
                  </div>
                </main>
                <Footer {...this.props} site={this.props.pageContext.site} page={this.props.pageContext} image={_.get(this.props, 'pageContext.site.siteMetadata.header.background_img', null)} />
              </div>
            </Layout>
        );
    }
}
