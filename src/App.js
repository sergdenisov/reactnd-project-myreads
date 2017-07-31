import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI';
import Search from './components/Search/Search'
import BooksList from './components/BooksList/BooksList'
import './App.css'
import clone from 'clone'

const initialState = {
  booksByShelves: new Map()
};

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = clone(initialState);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const booksByShelves = new Map();

      books.forEach((book) => {
        const booksOnShelf = booksByShelves.get(book.shelf) || [];
        booksOnShelf.push(book);
        booksByShelves.set(book.shelf, booksOnShelf);
      });

      this.setState({ booksByShelves });
    });
  }

  handleBookshelfChange = (book, prevShelf, newShelf) => {
    this.setState((prevState) => {
      const newState = clone(prevState);
      const newBooksByShelves = newState.booksByShelves;

      if (prevShelf !== 'none') {
        const booksOnShelf = newBooksByShelves.get(prevShelf).filter((b) => b.id !== book.id);
        newBooksByShelves.set(prevShelf, booksOnShelf);
      }

      if (newShelf !== 'none') {
        const booksOnShelf = newBooksByShelves.get(newShelf) || [];
        newBooksByShelves.set(newShelf, booksOnShelf.concat([book]));
      }

      book.shelf = newShelf;

      return newState;
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList booksByShelves={this.state.booksByShelves} onBookshelfChange={this.handleBookshelfChange}/>
        )}/>
        <Route path="/search" render={() => <Search onBookshelfChange={this.handleBookshelfChange}/>}/>
      </div>
    )
  }
}

export default BooksApp
