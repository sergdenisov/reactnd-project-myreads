import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import ComponentStatuses from '../../utils/ComponentStatuses';
import Spinner from '../Spinner/Spinner';
import './Book.css';
import placeholder from './placeholder.jpg';

const bookShelfTitles = BookShelfTitles.getAll();

/** The component for the current book. */
class Book extends Component {
  static propTypes = {
    /** The bookshelf change event's handler. */
    onBookshelfChange: PropTypes.func.isRequired,
    /** The flag indicating that the component should be updated after the bookshelf change event triggering. */
    shouldUpdateAfterChanging: PropTypes.bool,
    /** The book's data. */
    book: PropTypes.shape({
      /** Links for the book's images. */
      imageLinks: PropTypes.object,
      /** The book's title. */
      title: PropTypes.string.isRequired,
      /** The book's authors. */
      authors: PropTypes.array,
      /** The shelf that contains the current book.  */
      shelf: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    status: ComponentStatuses.Ok,
  };

  handleBookshelfChange(book, prevShelf, newShelf) {
    const promise = this.props.onBookshelfChange(book, prevShelf, newShelf);

    this.setState({ status: ComponentStatuses.Loading });

    if (this.props.shouldUpdateAfterChanging) {
      promise.then(() => {
        this.setState({ status: ComponentStatuses.Ok });
      });
    }
  }

  render() {
    const {
      imageLinks = { thumbnail: placeholder },
      title,
      authors,
      shelf,
    } = this.props.book;
    const { status } = this.state;

    const getShelfChangerContent = () => {
      switch (status) {
        case ComponentStatuses.Loading:
          return <Spinner small />;
        default:
          return (
            <select
              value={shelf}
              className="book__select"
              onChange={event => {
                this.handleBookshelfChange(
                  this.props.book,
                  shelf,
                  event.target.value,
                );
              }}>
              <option disabled>Move to...</option>
              {bookShelfTitles.map(([key, value]) =>
                <option value={key} key={key}>
                  {value}
                </option>,
              )}
            </select>
          );
      }
    };

    return (
      <div
        className={classnames('book', {
          book_loading: status === ComponentStatuses.Loading,
        })}>
        <div className="book__top">
          <img src={imageLinks.thumbnail} className="book__cover" alt={title} />
          <div className="book__shelf-changer">
            {getShelfChangerContent()}
          </div>
        </div>
        <div className="book__title">
          {title}
        </div>
        {authors &&
          <div className="book__authors">
            {authors.join(', ')}
          </div>}
      </div>
    );
  }
}

Book.defaultProps = {
  shouldUpdateAfterChanging: false,
};

export default Book;
