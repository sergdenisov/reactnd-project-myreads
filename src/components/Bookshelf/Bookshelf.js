import React from 'react';
import PropTypes from 'prop-types';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import BooksGrid from '../BooksGrid/BooksGrid';
import './Bookshelf.css';

/** The component for the bookshelf with the books. */
const Bookshelf = props =>
  <div className="bookshelf">
    <h2 className="bookshelf__title">
      {BookShelfTitles.get(props.shelf)}
    </h2>
    <div className="bookshelf__books">
      <BooksGrid
        books={props.books}
        onBookshelfChange={props.onBookshelfChange}
      />
    </div>
  </div>;

Bookshelf.propTypes = {
  /** The list of the books on the shelf. */
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The shelf. */
  shelf: PropTypes.string.isRequired,
  /** The bookshelf change event's handler. */
  onBookshelfChange: PropTypes.func.isRequired,
};

export default Bookshelf;
