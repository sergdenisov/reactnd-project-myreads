import React from 'react';
import { Link } from 'react-router-dom'

const Search = (props) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link to='/' className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author"/>
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid"/>
    </div>
  </div>
);

export default Search;
