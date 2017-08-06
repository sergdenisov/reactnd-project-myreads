import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import Spinner from '../Spinner/Spinner';
import './Book.css';

const bookShelfTitles = BookShelfTitles.getAll();

class Book extends Component {
  static propTypes = {
    onBookshelfChange: PropTypes.func.isRequired,
    shouldUpdateAfterChanging: PropTypes.bool,
    book: PropTypes.shape({
      imageLinks: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.array,
      shelf: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    isUpdating: false,
  };

  handleBookshelfChange(book, prevShelf, newShelf) {
    this.setState({ isUpdating: true });

    const promise = this.props.onBookshelfChange(book, prevShelf, newShelf);

    if (this.props.shouldUpdateAfterChanging) {
      promise.then(() => {
        this.setState({ isUpdating: false });
      });
    }
  }

  render() {
    const { imageLinks, title, authors, shelf } = this.props.book;
    const { isUpdating } = this.state;

    return (
      <div className={classnames('book', { book_updating: isUpdating })}>
        <div className="book__top">
          <img src={imageLinks.thumbnail} className="book__cover" alt={title} />
          <div className="book__shelf-changer">
            { isUpdating ? (
              <Spinner small />
            ) : (
              <select
                value={shelf}
                className="book__select"
                onChange={(event) => {
                  this.handleBookshelfChange(this.props.book, shelf, event.target.value);
                }}
              >
                <option disabled>Move to...</option>
                {bookShelfTitles.map(([key, value]) => (
                  <option value={key} key={key}>{value}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="book__title">{title}</div>
        {authors && <div className="book__authors">{authors.join(', ')}</div>}
      </div>
    );
  }
}

Book.defaultProps = {
  shouldUpdateAfterChanging: false,
};

export default Book;
