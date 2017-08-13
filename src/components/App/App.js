import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import clone from 'clone';
import * as BooksAPI from '../../utils/BooksAPI';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import ComponentStatuses from '../../utils/ComponentStatuses';
import BooksSearch from '../BooksSearch/BooksSearch';
import BooksList from '../BooksList/BooksList';
import Error from '../Error/Error';
import './App.css';

class App extends Component {
  state = {
    shelves: BookShelfTitles.getAll(true).map(([shelf]) => shelf),
    books: [],
    status: ComponentStatuses.Loading,
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    this.setState({ status: ComponentStatuses.Loading });

    BooksAPI.getAll().then(books => {
      this.setState({
        books,
        status:
          books.length > 0 ? ComponentStatuses.Ok : ComponentStatuses.Empty,
      });
    }, this.handleError.bind(this, this.getAllBooks));
  };

  tryAgain = () => {};

  handleError(tryAgainHandler) {
    this.tryAgain = tryAgainHandler;
    this.setState({ status: ComponentStatuses.Error });
  }

  updateBookshelf(book, prevShelf, newShelf) {
    this.setState({ status: ComponentStatuses.Ok });

    return BooksAPI.update(book, newShelf).then(() => {
      this.setState(prevState => {
        const newState = clone(prevState);

        book.shelf = newShelf;

        if (prevShelf === BookShelfTitles.emptyShelf) {
          newState.books.push(book);
        } else if (newState === BookShelfTitles.emptyShelf) {
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
    const { shelves, books, status } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <BooksList
              status={status}
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
        {status === ComponentStatuses.Error &&
          <Error onClick={this.tryAgain} />}
      </div>
    );
  }
}

export default App;
