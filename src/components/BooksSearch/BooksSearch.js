import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../utils/BooksAPI';
import Spinner from '../Spinner/Spinner';
import BooksGrid from '../BooksGrid/BooksGrid';
import debounce from 'debounce';

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
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          {isLoading ? (
            <Spinner/>
          ) : (
            <BooksGrid
              books={books}
              onBookshelfChange={this.props.onBookshelfChange}
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
