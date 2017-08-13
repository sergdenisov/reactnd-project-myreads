import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';
import './BooksGrid.css';

/** The component for the list of the books. */
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
  /** The list of the books. */
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The bookshelf change event's handler. */
  onBookshelfChange: PropTypes.func.isRequired,
  /** The flag indicating that the book should be updated after the bookshelf change event triggering. */
  shouldUpdateBookAfterChanging: PropTypes.bool,
};

BooksGrid.defaultProps = {
  shouldUpdateBookAfterChanging: false,
};

export default BooksGrid;
