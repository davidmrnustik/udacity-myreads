import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import { Route, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import BookShelf from './BookShelf';
import WaitingScreen from './WaitingScreen';

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
    const { books } = this.state;

    if (this.state.loading) return <WaitingScreen text='Loading, please wait...' />;

    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              <div>
                <BookShelf
                  title='Currently Reading'
                  books={books.filter(book => book.shelf === 'currentlyReading')}
                  onChangeCategory={this.changeCategory}
                />
                <BookShelf
                  title='Want to Read'
                  books={books.filter(book => book.shelf === 'wantToRead')}
                  onChangeCategory={this.changeCategory}
                />
                <BookShelf
                  title='Read'
                  books={books.filter(book => book.shelf === 'read')}
                  onChangeCategory={this.changeCategory}
                />
              </div>
            </div>
            <div className='open-search'>
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <ListBooks
            books={books}
            onChangeCategory={this.changeCategory}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;