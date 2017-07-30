import React, { Component } from 'react';
import * as BookShelfTitles from '../../utils/BookShelfTitles';

const bookShelfTitles = BookShelfTitles.getAll();

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { shelf: props.shelf };
  }

  render() {
    const { imageUrl, title, authors } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <img src={imageUrl} className="book-cover" alt={title}/>
          <div className="book-shelf-changer">
            <select value={this.state.shelf}>
              <option disabled>Move to...</option>
              {Object.entries(bookShelfTitles).map(([key, value]) => (
                <option value={key} key={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors && <div className="book-authors">{authors}</div>}
      </div>
    )
  }
}

export default Book;
