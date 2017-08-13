import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';
import './BooksGrid.css';

const BooksGrid = props => {
  const { books, onBookshelfChange, shouldUpdateBookAfterChanging } = props;

  return (
    <ol className="books-grid">
      {books.map(book =>
        <li className="books-grid__item" key={book.id}>
          <Book
            book={book}
            onBookshelfChange={onBookshelfChange}
            shouldUpdateAfterChanging={shouldUpdateBookAfterChanging}
          />
        </li>,
      )}
    </ol>
  );
};

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookshelfChange: PropTypes.func.isRequired,
  shouldUpdateBookAfterChanging: PropTypes.bool,
};

BooksGrid.defaultProps = {
  shouldUpdateBookAfterChanging: false,
};

export default BooksGrid;
