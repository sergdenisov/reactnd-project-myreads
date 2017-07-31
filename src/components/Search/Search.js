import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../utils/BooksAPI';
import BooksGrid from '../BooksGrid/BooksGrid';

class Search extends Component {
  state = {
    query: '',
    books: []
  };

  search = (query) => {
    const trimmedQuery = query.trim();

    BooksAPI.search(query, this.props.maxSearchResults).then((books) => {
      this.setState({
        query: trimmedQuery,
        books
      });
    });
  };

  render() {
    const { query, books } = this.state;

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
          <BooksGrid books={books} onBookshelfChange={this.props.onBookshelfChange}/>
        </div>
      </div>
    )
  };
}

Search.defaultProps = {
  maxSearchResults: 20
};

export default Search;
