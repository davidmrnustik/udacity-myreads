import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import WaitingScreen from './WaitingScreen';

class BookShelf extends Component {

  state = {
    loading: false
  }

  changeCategory = (id, category) => {
    this.setState({ loading: true });
    this.props.onChangeCategory(id, category);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render () {
    const { title, books } = this.props;
    const { loading } = this.state;

    if (loading) return <WaitingScreen text="Updating bookshelves..." />;

    let bookshelves = books
      .sort(sortBy('title'))
      .map(book => (
        <li key={book.id}>
          <Book {...book} onChangeCategory={this.changeCategory} />
        </li>
      ))

    let bookshelfCount = bookshelves.length;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {title} <span className="bookshelf-count">({bookshelfCount})</span>
        </h2>
        {bookshelfCount === 0 && (
          <p>There is no book in this bookshelf.</p>
        )}
        <div className="bookshelf-books">
          {bookshelfCount > 0 && (
            <ol className="books-grid">
              {bookshelves}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeCategory: PropTypes.func.isRequired
}

export default BookShelf;