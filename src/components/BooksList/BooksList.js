import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Bookshelf from '../Bookshelf/Bookshelf';
import Spinner from '../Spinner/Spinner';
import './BooksList.css';

const BooksList = props => (
  <div className="books-list">
    <h1 className="books-list__title">MyReads</h1>
    {props.isLoading ? (
      <div className={classnames('books-list__content', { 'books-list__content_loading': props.isLoading })}>
        <Spinner />
      </div>
    ) : (
      Array.from(props.booksByShelves).map(([shelf, books]) => (
        <Bookshelf
          shelf={shelf}
          books={books}
          onBookshelfChange={props.onBookshelfChange}
          key={shelf}
        />
      ))
    )}
    <div className="books-list__search">
      <Link to="/search" className="books-list__button">Add a book</Link>
    </div>
  </div>
);

BooksList.propTypes = {
  isLoading: PropTypes.bool,
  booksByShelves: PropTypes.instanceOf(Map).isRequired,
  onBookshelfChange: PropTypes.func.isRequired,
};

BooksList.defaultProps = {
  isLoading: false,
};

export default BooksList;
