import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import * as BooksAPI from '../../utils/BooksAPI';
import Spinner from '../Spinner/Spinner';
import BooksGrid from '../BooksGrid/BooksGrid';
import Error from '../Error/Error';
import './BooksSearch.css';

const initialState = {
  query: '',
  books: [],
  isLoading: false,
  isError: false,
};

class BooksSearch extends Component {
  static propTypes = {
    maxSearchResults: PropTypes.number.isRequired,
    searchTimeout: PropTypes.number.isRequired,
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

  search(query) {
    BooksAPI.search(query, this.props.maxSearchResults).then((books) => {
      this.setState({
        query,
        books: (Array.isArray(books) && books) || [],
        isLoading: false,
        isError: false,
      });
    }, () => {
      this.tryAgain = this.search.bind(this, query);
      this.setState({ isLoading: false, isError: true });
    });
  }

  searchWithDebounce = debounce(this.search, this.props.searchTimeout);

  handleChange = (event) => {
    const query = event.target.value.trim();

    this.setState({ query, isError: false });

    if (query) {
      this.setState({ isLoading: true });
      this.searchWithDebounce(query);
    } else {
      this.reset();
    }
  };

  tryAgain = () => {};

  render() {
    const { query, books, isLoading, isError } = this.state;

    return (
      <div className="search-books">
        <div className="books-search__bar">
          <Link to="/" className="books-search__button">Close</Link>
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
          {isLoading ? (
            <Spinner />
          ) : !isError && (
            <BooksGrid
              books={books}
              onBookshelfChange={this.props.onBookshelfChange}
              shouldUpdateBookAfterChanging
              emptyDataText={query && 'Sorry, no matches found for your query.'}
            />
          )}
        </div>
        { isError && <Error onClick={this.tryAgain} /> }
      </div>
    );
  }
}

BooksSearch.defaultProps = {
  maxSearchResults: 20,
  searchTimeout: 1000,
};

export default BooksSearch;
