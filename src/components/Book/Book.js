import React, { Component } from 'react';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import Spinner from '../Spinner/Spinner';

const bookShelfTitles = BookShelfTitles.getAll();

class Book extends Component {
  state = {
    isUpdating: false
  };

  handleBookshelfChange(book, prevShelf, newShelf) {
    this.setState({isUpdating: true});

    const promise = this.props.onBookshelfChange(book, prevShelf, newShelf);

    if (this.props.shouldUpdateAfterChanging) {
      promise.then(() => {
        this.setState({isUpdating: false});
      });
    }
  }

  render() {
    const { imageLinks, title, authors, shelf } = this.props.book;
    const { isUpdating } = this.state;

    return (
      <div className={`book ${isUpdating && 'book_updating'}`}>
        <div className="book-top">
          <img src={imageLinks.thumbnail} className="book-cover" alt={title}/>
          <div className="book-shelf-changer">
            { isUpdating ? (
              <Spinner small={true}/>
            ) : (
              <select value={shelf} onChange={(event) => {
                this.handleBookshelfChange(this.props.book, shelf, event.target.value)
              }}>
                <option disabled>Move to...</option>
                {bookShelfTitles.map(([shelf, title]) => (
                  <option value={shelf} key={shelf}>{title}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors && <div className="book-authors">{authors.join(', ')}</div>}
      </div>
    )
  }
}

Book.defaultProps = {
  shouldUpdateAfterChanging: false
};

export default Book;
