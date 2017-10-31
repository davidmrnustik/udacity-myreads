import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import WaitingScreen from './WaitingScreen';

/**
 * SearchBooks handles search functionality that matches
 * input query. It receives books props and renders
 * input form and Book components.
 */
class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeCategory: PropTypes.func.isRequired
  }

  state = {
    query: '',
    loading: false
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  changeCategory = (id, category) => {
    this.setState({ loading: true });
    this.props.onChangeCategory(id, category);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    const { books } = this.props;
    const { query, loading } = this.state;

    if (loading) return <WaitingScreen text='Updating books list...' />;

    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors));
      showingBooks.sort(sortBy('title'));
    }

    return (
      <div>
        <div className='search-books-bar'>
          <Link
            to='/'
            className='close-search'
          >Close search</Link>
          <input
            type='text'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            className='search-books-input-wrapper'
            placeholder='Search by Title or Author'
          />
        </div>

        <div className='search-books-results'>
          <ol className='books-grid'>
            {query && showingBooks.map(book => (
              <li key={book.id}>
                <Book {...book} onChangeCategory={this.changeCategory}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;