import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import ComponentStatuses from '../../utils/ComponentStatuses';
import Bookshelf from '../Bookshelf/Bookshelf';
import Spinner from '../Spinner/Spinner';
import './BooksList.css';

const shelves = BookShelfTitles.getAll(true).map(([shelf]) => shelf);

/** The component for the list of the shelves with the books. */
const BooksList = props => {
  const { status, books, onBookshelfChange } = props;

  const getContent = () => {
    switch (status) {
      case ComponentStatuses.Loading:
        return <Spinner />;
      case ComponentStatuses.Empty:
        return null;
      default:
        return shelves.map(shelf => {
          const booksOnShelf = books.filter(book => book.shelf === shelf);

          if (booksOnShelf.length === 0) {
            return null;
          }

          return (
            <Bookshelf
              shelf={shelf}
              books={booksOnShelf}
              onBookshelfChange={onBookshelfChange}
              key={shelf}
            />
          );
        });
    }
  };

  return (
    <div className="books-list">
      <h1 className="books-list__title">MyReads</h1>
      <div
        className={classnames('books-list__content', {
          'books-list__content_loading': status === ComponentStatuses.Loading,
        })}>
        {getContent()}
      </div>
      <div className="books-list__search">
        <Link to="/search" className="books-list__button">
          Add a book
        </Link>
      </div>
    </div>
  );
};

BooksList.propTypes = {
  /** The current status of the component */
  status: PropTypes.oneOf(Object.values(ComponentStatuses)).isRequired,
  /** The list of the books. */
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The bookshelf change event's handler. */
  onBookshelfChange: PropTypes.func.isRequired,
};

export default BooksList;
