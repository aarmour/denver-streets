import React, { Component, PropTypes } from 'react';
import Rating from 'react-rating';
import classNames from 'classnames';
import { Icon } from '../';

export default class YelpSearchResult extends Component {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  get classes() {
    const { expanded } = this.state;

    return {
      secondaryAttributes: classNames({
        'yelp-search-result__secondary-attributes': true,
        'yelp-search-result__secondary-attributes--expanded': expanded
      })
    };
  }

  render() {
    const { classes, handleToggleClick } = this;
    const {
      categories,
      displayPhone,
      distance,
      imageUrl,
      location,
      mobileUrl,
      neighborhoods,
      name,
      rating,
      reviewCount,
      url
    } = this.props;

    return (
      <div className="yelp-search-result">
        <div className="yelp-search-result__primary-attributes">
          <div className="yelp-search-result__media-group">
            <div className="yelp-search-result__media-group__thumbnail">
              <img src={imageUrl} />
            </div>
            <div className="yelp-search-result__media-group__content">
              <div>{name}</div>
              <div className="text--secondary">{categories.map(category => category[0]).join(', ')}</div>
              <div className="yelp-search-result__rating">
                <Rating
                  readonly={true}
                  initialRate={rating}
                  empty={<Icon value="star-o" style={{ color: '#cccccc' }} />}
                  full={<Icon value="star" style={{ color: '#666666' }} />}
                />
              </div>
              <span>
                <small>{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</small>
              </span>
              <div>
                <a href={url} target="_blank">Full review</a>
                <div className="yelp-search-result__toggle">
                  <button onClick={handleToggleClick}>
                    <Icon value="ellipsis-h" size="lg" style={{ color: '#cccccc' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.secondaryAttributes}>
          <address>
            {location.displayAddress.map(part => {
              return <span>{part} <br /></span>;
            })}
          </address>
        </div>
      </div>
    );
  }

  handleToggleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

}

YelpSearchResult.propTypes = {
  categories: PropTypes.array,
  displayPhone: PropTypes.string,
  distance: PropTypes.number,
  imageUrl: PropTypes.string,
  location: PropTypes.object,
  mobileUrl: PropTypes.string,
  neighborhoods: PropTypes.array,
  name: PropTypes.string,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  url: PropTypes.string
};
