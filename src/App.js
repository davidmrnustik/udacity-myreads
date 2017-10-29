import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import { Route, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import BookShelf from './BookShelf';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently Reading"
                  books={books}
                  shelf="currentlyReading"
                />
                <BookShelf
                  title="Want to Read"
                  books={books}
                  shelf="wantToRead"
                />
                <BookShelf
                  title="Read"
                  books={books}
                  shelf="read"
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <ListBooks books={books} />
        )}/>
      </div>
    )
  }
}

export default BooksApp;