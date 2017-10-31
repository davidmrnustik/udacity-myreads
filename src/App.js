import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import WaitingScreen from './WaitingScreen';

/**
 * BooksApp fetches data from BooksAPI and handles
 * routes for BookShelf and SearchBooks components.
 */
class BooksApp extends Component {
  state = {
    books: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true});

    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books, loading: false })
      })
  }

  changeCategory = (id, category) => {
    BooksAPI.get(id).then(data => {
      let updatedBook = data;
      updatedBook.shelf = category;

      this.setState((state) => ({
        books: state.books.filter(book => book.id !== id).concat([ updatedBook ])
      }))
    });

    BooksAPI.update({ id }, category);
  }

  render() {
    const { books, loading } = this.state;

    if (loading) return <WaitingScreen text='Loading, please wait...' />;

    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            onChangeCategory={this.changeCategory}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            books={books}
            onChangeCategory={this.changeCategory}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;