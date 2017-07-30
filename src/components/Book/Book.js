import React from 'react';
import * as BookShelfTitles from '../../utils/BookShelfTitles';

const bookShelfTitles = BookShelfTitles.getAll();

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <img src={props.imageUrl} className="book-cover" alt={props.title}/>
      <div className="book-shelf-changer">
        <select>
          <option value="none" disabled>Move to...</option>
          {Object.keys(bookShelfTitles).map((key) => (
            <option value={key}>{bookShelfTitles[key]}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="book-title">{props.title}</div>
    {props.authors && (
      <div className="book-authors">{props.authors}</div>
    )}
  </div>
);

export default Book;
