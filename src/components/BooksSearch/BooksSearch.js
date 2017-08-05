import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../utils/BooksAPI';
import Spinner from '../Spinner/Spinner';
import BooksGrid from '../BooksGrid/BooksGrid';
import debounce from 'debounce';
import './BooksSearch.css';

const initialState = {
  query: '',
  books: [],
  isLoading: false
};

class BooksSearch extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reset() {
    this.setState(initialState);
    this.search.clear();
  }

  search = debounce((query) => {
    BooksAPI.search(query, this.props.maxSearchResults).then((books) => {
      this.setState({
        query: query,
        books,
        isLoading: false
      });
    });
  }, this.props.searchTimeout);

  handleChange = (event) => {
    const query = event.target.value.trim();

    this.setState({query: query});

    if (query) {
      this.setState({isLoading: true});
      this.search(query);
    } else {
      this.reset();
    }
  };

  render() {
    const { query, books, isLoading } = this.state;

    return (
      <div className="search-books">
        <div className="books-search__bar">
          <Link to='/' className="books-search__button">Close</Link>
          <div className="books-search__input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
              className="books-search__input"/>
          </div>
        </div>
        <div className="books-search__results">
          {isLoading ? (
            <Spinner/>
          ) : (
            <BooksGrid
              books={books}
              onBookshelfChange={this.props.onBookshelfChange}
              shouldUpdateBookAfterChanging={true}
              emptyDataText={query && 'Sorry, no matches found for your query.'}/>
          )}
        </div>
      </div>
    )
  };
}

BooksSearch.defaultProps = {
  maxSearchResults: 20,
  searchTimeout: 1000
};

export default BooksSearch;
