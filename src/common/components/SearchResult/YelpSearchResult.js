import React, { Component, PropTypes } from 'react';
import Rating from 'react-rating';

export default class YelpSearchResult extends Component {

  constructor(props) {
    super(props);
  }

  render() {
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
        <div className="yelp-search-result__thumbnail">
          <img src={imageUrl} />
        </div>
        <div className="yelp-search-result__content">
          <div>{name}</div>
          <div>{categories.map(category => category[0]).join(', ')}</div>
          <Rating readonly={true} initialRate={rating} />
          <div><a href={url} target="_blank">View on Yelp</a></div>
        </div>
      </div>
    );
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
