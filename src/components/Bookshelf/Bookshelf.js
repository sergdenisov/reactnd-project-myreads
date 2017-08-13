import React from 'react';
import PropTypes from 'prop-types';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import BooksGrid from '../BooksGrid/BooksGrid';
import './Bookshelf.css';

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
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  shelf: PropTypes.string.isRequired,
  onBookshelfChange: PropTypes.func.isRequired,
};

export default Bookshelf;
