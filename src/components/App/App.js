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
    shelves: BookShelfTitles.getAll(true).map(([shelf]) => shelf),
    books: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    this.setState({ isLoading: true, isError: false });

    BooksAPI.getAll().then(books => {
      this.setState({ books, isLoading: false });
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

        book.shelf = newShelf;

        if (prevShelf === emptyShelf) {
          newState.books.push(book);
        } else if (newState === emptyShelf) {
          newState.books = newState.books.filter(b => b.id !== book.id);
        } else {
          newState.books.find(b => b.id === book.id).shelf = newShelf;
        }

        return newState;
      });
    }, this.handleError.bind(this, this.updateBookshelf.bind(this, book, prevShelf, newShelf)));
  }

  handleBookshelfChange = (book, prevShelf, newShelf) =>
    this.updateBookshelf(book, prevShelf, newShelf);

  render() {
    const { shelves, books, isLoading, isError } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <BooksList
              isLoading={isLoading}
              shelves={shelves}
              books={books}
              onBookshelfChange={this.handleBookshelfChange}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <BooksSearch
              booksOnShelves={books}
              onBookshelfChange={this.handleBookshelfChange}
            />}
        />
        {isError && <Error onClick={this.tryAgain} />}
      </div>
    );
  }
}

export default BooksApp;
