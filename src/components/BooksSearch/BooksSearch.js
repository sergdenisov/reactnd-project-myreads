import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import * as BooksAPI from '../../utils/BooksAPI';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import ComponentStatuses from '../../utils/ComponentStatuses';
import Spinner from '../Spinner/Spinner';
import BooksGrid from '../BooksGrid/BooksGrid';
import Error from '../Error/Error';
import './BooksSearch.css';

const initialState = {
  query: '',
  books: [],
  status: ComponentStatuses.Empty,
};

class BooksSearch extends Component {
  static propTypes = {
    maxSearchResults: PropTypes.number.isRequired,
    searchTimeout: PropTypes.number.isRequired,
    booksOnShelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    onBookshelfChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reset() {
    this.setState(initialState);
    this.searchWithDebounce.clear();
  }

  verifyBooks(books) {
    if (!Array.isArray(books)) {
      return [];
    }

    return books.map(book => {
      this.props.booksOnShelves.forEach(bookOnShelf => {
        if (book.id === bookOnShelf.id) {
          book.shelf = bookOnShelf.shelf;
        }
      });

      if (!book.shelf) {
        book.shelf = BookShelfTitles.emptyShelf;
      }

      return book;
    });
  }

  search(query) {
    BooksAPI.search(query, this.props.maxSearchResults).then(
      books => {
        const verifiedBooks = this.verifyBooks(books);

        this.setState({
          query,
          books: verifiedBooks,
          status:
            verifiedBooks.length > 0
              ? ComponentStatuses.Ok
              : ComponentStatuses.Empty,
        });
      },
      () => {
        this.tryAgain = this.search.bind(this, query);
        this.setState({ status: ComponentStatuses.Error });
      },
    );
  }

  searchWithDebounce = debounce(this.search, this.props.searchTimeout);

  handleChange = event => {
    const query = event.target.value.trim();

    if (query) {
      this.setState({ query, status: ComponentStatuses.Loading });
      this.searchWithDebounce(query);
    } else {
      this.reset();
    }
  };

  tryAgain = () => {};

  render() {
    const { status, books, query } = this.state;

    const getContent = () => {
      switch (status) {
        case ComponentStatuses.Loading:
          return <Spinner />;
        case ComponentStatuses.Error:
          return null;
        case ComponentStatuses.Empty:
          return (
            <div>
              {query && 'Sorry, no matches found for your query.'}
            </div>
          );
        default:
          return (
            <BooksGrid
              books={books}
              onBookshelfChange={this.props.onBookshelfChange}
              shouldUpdateBookAfterChanging
            />
          );
      }
    };

    return (
      <div className="search-books">
        <div className="books-search__bar">
          <Link to="/" className="books-search__button">
            Close
          </Link>
          <div className="books-search__input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
              className="books-search__input"
            />
          </div>
        </div>
        <div className="books-search__results">
          {getContent()}
        </div>
        {status === ComponentStatuses.Error &&
          <Error onClick={this.tryAgain} />}
      </div>
    );
  }
}

BooksSearch.defaultProps = {
  maxSearchResults: 20,
  searchTimeout: 1000,
};

export default BooksSearch;
