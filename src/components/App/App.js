import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import clone from 'clone';
import * as BooksAPI from '../../utils/BooksAPI';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import BooksSearch from '../BooksSearch/BooksSearch';
import BooksList from '../BooksList/BooksList';
import Error from '../Error/Error';
import './App.css';

const emptyShelf = BookShelfTitles.getEmpty();

class BooksApp extends Component {
  state = {
    booksByShelves: new Map(
      BookShelfTitles.getAll(true).map(([shelf]) => [shelf, []]),
    ),
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    this.setState({ isLoading: true, isError: false });

    BooksAPI.getAll().then(books => {
      this.setState(prevState => {
        const newState = clone(prevState);

        books.forEach(book => {
          newState.booksByShelves.get(book.shelf).push(book);
        });

        newState.isLoading = false;

        return newState;
      });
    }, this.handleError.bind(this, this.getAllBooks));
  };

  tryAgain = () => {};

  handleError(tryAgainHandler) {
    this.tryAgain = tryAgainHandler;
    this.setState({ isLoading: false, isError: true });
  }

  updateBookshelf(book, prevShelf, newShelf) {
    this.setState({ isError: false });

    return BooksAPI.update(book, newShelf).then(() => {
      this.setState(prevState => {
        const newState = clone(prevState);
        const newBooksByShelves = newState.booksByShelves;

        if (prevShelf !== emptyShelf) {
          const booksOnShelf = newBooksByShelves
            .get(prevShelf)
            .filter(b => b.id !== book.id);
          newBooksByShelves.set(prevShelf, booksOnShelf);
        }

        if (newShelf !== emptyShelf) {
          const booksOnShelf = newBooksByShelves.get(newShelf) || [];
          newBooksByShelves.set(newShelf, booksOnShelf.concat([book]));
        }

        book.shelf = newShelf;

        return newState;
      });
    }, this.handleError.bind(this, this.updateBookshelf.bind(this, book, prevShelf, newShelf)));
  }

  handleBookshelfChange = (book, prevShelf, newShelf) =>
    this.updateBookshelf(book, prevShelf, newShelf);

  render() {
    const { booksByShelves, isLoading, isError } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <BooksList
              booksByShelves={booksByShelves}
              onBookshelfChange={this.handleBookshelfChange}
              isLoading={isLoading}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <BooksSearch onBookshelfChange={this.handleBookshelfChange} />}
        />
        {isError && <Error onClick={this.tryAgain} />}
      </div>
    );
  }
}

export default BooksApp;
