import React from 'react';
import Book from '../Book/Book';
import './BooksGrid.css';

const BooksGrid = (props) => props.books.length > 0 ? (
  <ol className="books-grid">
    {props.books.map((book) => (
      <li className="books-grid__item" key={book.id}>
        <Book book={book}
              onBookshelfChange={props.onBookshelfChange}
              shouldUpdateAfterChanging={props.shouldUpdateBookAfterChanging}/>
      </li>
    ))}
  </ol>
) : (
  <div className="books-grid">{props.emptyDataText}</div>
);

Book.defaultProps = {
  shouldUpdateBookAfterChanging: false
};

export default BooksGrid;
