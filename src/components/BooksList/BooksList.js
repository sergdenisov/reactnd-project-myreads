import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../Bookshelf/Bookshelf';
import Spinner from '../Spinner/Spinner';

const BooksList = (props) => (
  <div className="books-list">
    <div className="books-list-title">
      <h1>MyReads</h1>
    </div>
    {props.isLoading ? (
      <div className={`books-list-content ${props.isLoading && 'books-list-content_loading'}`}>
        <Spinner/>
      </div>
    ) : (
      Array.from(props.booksByShelves).map(([shelf, books]) => (
        <Bookshelf shelf={shelf} books={books} onBookshelfChange={props.onBookshelfChange} key={shelf}/>
      ))
    )}
    <div className="open-search">
      <Link to='/search'>Add a book</Link>
    </div>
  </div>
);

BooksList.defaultProps = {
  isLoading: false
};

export default BooksList;
