import React, { Component } from 'react';
import * as BookShelfTitles from '../../utils/BookShelfTitles';

const bookShelfTitles = BookShelfTitles.getAll();

class Book extends Component {
  handleBookshelfChange(book, prevShelf, newShelf) {
    this.props.onBookshelfChange(book, prevShelf, newShelf);
  }

  render() {
    const { imageLinks, title, authors, shelf } = this.props.book;

    return (
      <div className="book">
        <div className="book-top">
          <img src={imageLinks.thumbnail} className="book-cover" alt={title}/>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={(event) => this.handleBookshelfChange(this.props.book, shelf, event.target.value)}>
              <option disabled>Move to...</option>
              {Object.entries(bookShelfTitles).map(([key, value]) => (
                <option value={key} key={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors && <div className="book-authors">{authors.join(', ')}</div>}
      </div>
    )
  }
}

export default Book;
