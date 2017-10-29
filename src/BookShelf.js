import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books
            .filter((book) => props.shelf === book.shelf)
            .map(book => (
              <li key={book.id}>
                <Book {...book} />
              </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  shelf: PropTypes.string.isRequired
}

export default BookShelf;