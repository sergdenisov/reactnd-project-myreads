import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI';
import * as BookShelfTitles from './utils/BookShelfTitles'
import BooksSearch from './components/BooksSearch/BooksSearch'
import BooksList from './components/BooksList/BooksList'
import './App.css'
import clone from 'clone'

const emptyShelf = BookShelfTitles.getEmpty();

const initialState = {
  booksByShelves: new Map(BookShelfTitles.getAll(true).map(([shelf, title]) => [shelf, []])),
  isLoading: false
};

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.setState({isLoading: true});

    BooksAPI.getAll().then((books) => {
      this.setState((prevState) => {
        const newState = clone(prevState);

        books.forEach((book) => { newState.booksByShelves.get(book.shelf).push(book) });

        newState.isLoading = false;

        return newState;
      });
    });
  }

  handleBookshelfChange = (book, prevShelf, newShelf) =>
    BooksAPI.update(book, newShelf).then(() => {
      this.setState((prevState) => {
        const newState = clone(prevState);
        const newBooksByShelves = newState.booksByShelves;

        if (prevShelf !== emptyShelf) {
          const booksOnShelf = newBooksByShelves.get(prevShelf).filter((b) => b.id !== book.id);
          newBooksByShelves.set(prevShelf, booksOnShelf);
        }

        if (newShelf !== emptyShelf) {
          const booksOnShelf = newBooksByShelves.get(newShelf) || [];
          newBooksByShelves.set(newShelf, booksOnShelf.concat([book]));
        }

        book.shelf = newShelf;

        return newState;
      });
    });

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList
            booksByShelves={this.state.booksByShelves}
            onBookshelfChange={this.handleBookshelfChange}
            isLoading={this.state.isLoading}/>
        )}/>
        <Route path="/search" render={() => <BooksSearch onBookshelfChange={this.handleBookshelfChange}/>}/>
      </div>
    )
  }
}

export default BooksApp
