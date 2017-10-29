import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      {props.title && (
        <h2 className="bookshelf-title">{props.title}</h2>
      )}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/*props.books.map(book => (
            <li key={book.id}>
            <Book
              cover={book.imageLinks.smallThumbnail}
              title={book.title}
              authors={book.authors}
            />
            </li>
          ))*/}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array
}

export default BookShelf;