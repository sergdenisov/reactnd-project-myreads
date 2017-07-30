import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../utils/BooksAPI';
import Book from '../Book/Book';

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
          <ol className="books-grid">
            {books.length > 0 && books.map((book) => (
              <li key={book.id}>
                <Book
                  imageUrl={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors && book.authors.join(', ')}
                  shelf={book.shelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  };
}

Search.defaultProps = {
  maxSearchResults: 20
};

export default Search;
