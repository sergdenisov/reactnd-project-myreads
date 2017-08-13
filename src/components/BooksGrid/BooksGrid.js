import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';
import './BooksGrid.css';

const BooksGrid = props =>
  props.books.length > 0
    ? <ol className="books-grid">
        {props.books.map(book =>
          <li className="books-grid__item" key={book.id}>
            <Book
              book={book}
              onBookshelfChange={props.onBookshelfChange}
              shouldUpdateAfterChanging={props.shouldUpdateBookAfterChanging}
            />
          </li>,
        )}
      </ol>
    : <div className="books-grid">
        {props.emptyDataText}
      </div>;

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  shouldUpdateBookAfterChanging: PropTypes.bool,
  emptyDataText: PropTypes.string,
};

BooksGrid.defaultProps = {
  shouldUpdateBookAfterChanging: false,
  emptyDataText: '',
};

export default BooksGrid;
