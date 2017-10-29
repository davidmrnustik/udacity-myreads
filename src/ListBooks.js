import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {
    const { books } = this.props;
    const { query } = this.state;

    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors));
      showingBooks.sort(sortBy('title'));
    }

    return (
      <div>
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close search</Link>
          <input
            type="text"
            onChange={(event) => this.updateQuery(event.target.value)}
            className="search-books-input-wrapper"
            placeholder="Search by Title or Author"
          />
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {query && showingBooks.map(book => (
              <li key={book.id}>
                <Book {...book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired
}

export default ListBooks;