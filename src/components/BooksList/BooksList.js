import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../Bookshelf/Bookshelf';

const BooksList = (props) => (
  <div className="books-list">
    <div className="books-list-title">
      <h1>MyReads</h1>
    </div>
    <div className="books-list-content">
      {Array.from(props.booksByShelves).map(([key, value]) => (
        <Bookshelf shelf={key} books={value} onBookshelfChange={props.onBookshelfChange} key={key}/>
      ))}
    </div>
    <div className="open-search">
      <Link to='/search'>Add a book</Link>
    </div>
  </div>
);

export default BooksList;
