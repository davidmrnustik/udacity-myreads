import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

/**
 * ListBooks handles main view with title
 * and bookshelves. It receives books props
 * and renders BookShelf components.
 */
class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeCategory: PropTypes.func.isRequired
  }

  render() {
    const { books, onChangeCategory } = this.props;

    return(
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <BookShelf
              title='Currently Reading'
              books={books.filter(book => book.shelf === 'currentlyReading')}
              onChangeCategory={onChangeCategory}
            />
            <BookShelf
              title='Want to Read'
              books={books.filter(book => book.shelf === 'wantToRead')}
              onChangeCategory={onChangeCategory}
            />
            <BookShelf
              title='Read'
              books={books.filter(book => book.shelf === 'read')}
              onChangeCategory={onChangeCategory}
            />
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;