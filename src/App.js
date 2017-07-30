import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI';
import Search from './components/Search/Search'
import BooksList from './components/BooksList/BooksList'
import './App.css'

class BooksApp extends Component {
  state = {
    booksByShelves: new Map()
  };

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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BooksList booksByShelves={this.state.booksByShelves}/>}/>
        <Route path="/search" component={Search}/>
      </div>
    )
  }
}

export default BooksApp
