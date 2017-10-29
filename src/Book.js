import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  onChangeCategory = (id, category) => {
    this.props.onChangeCategory(id, category);
  }

  render() {
    const { id, imageLinks, shelf, title, authors } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.smallThumbnail})`
            }}>
          </div>
          <div className="book-shelf-changer">
            <select
              onChange={(event) => this.onChangeCategory(id, event.target.value)}
              value={shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    )
  }
}

Book.propTypes = {
  id: PropTypes.string,
  imageLinks: PropTypes.object,
  shelf: PropTypes.string,
  title: PropTypes.string,
  authors: PropTypes.array
}

export default Book;