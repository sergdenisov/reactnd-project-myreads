import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import clone from 'clone';
import * as BooksAPI from '../../utils/BooksAPI';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import BooksSearch from '../BooksSearch/BooksSearch';
import BooksList from '../BooksList/BooksList';
import './App.css';

const emptyShelf = BookShelfTitles.getEmpty();

class BooksApp extends Component {
  state = {
    booksByShelves: new Map(BookShelfTitles.getAll(true).map(([shelf]) => [shelf, []])),
    isLoading: true,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState((prevState) => {
        const newState = clone(prevState);

        books.forEach((book) => { newState.booksByShelves.get(book.shelf).push(book); });

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
        const movedBook = clone(book);

        if (prevShelf !== emptyShelf) {
          const booksOnShelf = newBooksByShelves.get(prevShelf).filter(b => b.id !== book.id);
          newBooksByShelves.set(prevShelf, booksOnShelf);
        }

        if (newShelf !== emptyShelf) {
          const booksOnShelf = newBooksByShelves.get(newShelf) || [];
          newBooksByShelves.set(newShelf, booksOnShelf.concat([movedBook]));
        }

        movedBook.shelf = newShelf;

        return newState;
      });
    });

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BooksList
              booksByShelves={this.state.booksByShelves}
              onBookshelfChange={this.handleBookshelfChange}
              isLoading={this.state.isLoading}
            />
            )}
        />
        <Route path="/search" render={() => <BooksSearch onBookshelfChange={this.handleBookshelfChange} />} />
      </div>
    );
  }
}

export default BooksApp;
