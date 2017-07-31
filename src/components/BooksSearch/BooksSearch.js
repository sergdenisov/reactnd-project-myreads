import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../utils/BooksAPI';
import Spinner from '../Spinner/Spinner';
import BooksGrid from '../BooksGrid/BooksGrid';

class BooksSearch extends Component {
  state = {
    query: '',
    books: [],
    isLoading: false
  };

  search = (query) => {
    this.setState({isLoading: true});

    const trimmedQuery = query.trim();

    BooksAPI.search(query, this.props.maxSearchResults).then((books) => {
      this.setState({
        query: trimmedQuery,
        books,
        isLoading: false
      });
    });
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
              onChange={(event) => this.search(event.target.value)}/>
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
  maxSearchResults: 20
};

export default BooksSearch;
